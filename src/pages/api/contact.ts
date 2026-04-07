import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

// In-memory rate limiter: máx 3 envíos/IP/hora
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

function sanitize(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.replace(/<[^>]*>/g, '').trim().slice(0, 2000);
}

export const POST: APIRoute = async ({ request }) => {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (!checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({ error: 'Demasiadas solicitudes. Inténtalo en una hora.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // Parsear cuerpo (JSON o multipart form)
  let raw: Record<string, unknown> = {};
  try {
    const ct = request.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      raw = await request.json();
    } else {
      const fd = await request.formData();
      fd.forEach((val, key) => { raw[key] = val; });
    }
  } catch {
    return new Response(
      JSON.stringify({ error: 'Solicitud inválida.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // Honeypot: campo oculto que solo rellenan bots
  if (sanitize(raw.website)) {
    // Responde 200 para no dar pistas al bot
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Campos obligatorios (ES: nombre/email, CA: nom/email)
  const nombre = sanitize(raw.nombre ?? raw.nom);
  const email = sanitize(raw.email);

  if (!nombre || !email) {
    return new Response(
      JSON.stringify({ error: 'Nombre y email son obligatorios.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // Validación de formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(
      JSON.stringify({ error: 'El formato del email no es válido.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // Campos opcionales
  const telefono = sanitize(raw.telefono ?? raw.telefon);
  const mensaje = sanitize(raw.mensaje ?? raw.missatge);
  const origen = sanitize(raw.origen);

  // Servicios: puede ser string (único) o array (checkboxes múltiples)
  const rawServei = raw.servicio ?? raw.servei;
  const servicios = Array.isArray(rawServei)
    ? (rawServei as unknown[]).filter((s) => typeof s === 'string').map((s) => sanitize(s as string)).filter(Boolean).join(', ')
    : sanitize(rawServei);

  // Envío via Resend
  const resendApiKey = import.meta.env.RESEND_API_KEY;
  const toEmail = import.meta.env.CONTACT_EMAIL || 'hola@cibai.studio';

  if (!resendApiKey) {
    console.error('[contact] RESEND_API_KEY no configurado');
    return new Response(
      JSON.stringify({ error: 'Servicio de correo no configurado.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const resend = new Resend(resendApiKey);

  const rows = [
    ['Nombre', nombre],
    ['Email', email],
    telefono ? ['Teléfono', telefono] : null,
    servicios ? ['Servicios', servicios] : null,
    origen ? ['Cómo nos conoció', origen] : null,
    mensaje ? ['Mensaje', mensaje.replace(/\n/g, '<br>')] : null,
  ]
    .filter(Boolean)
    .map(([label, value]) => `<tr><th align="left" style="padding:6px 12px;white-space:nowrap">${label}</th><td style="padding:6px 12px">${value}</td></tr>`)
    .join('');

  const html = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"></head>
<body style="font-family:sans-serif;color:#111;max-width:600px;margin:0 auto;padding:24px">
  <h2 style="margin:0 0 16px">Nueva consulta — CIBAI Studio</h2>
  <table style="border-collapse:collapse;width:100%;border:1px solid #ddd;border-radius:8px;overflow:hidden">
    ${rows}
  </table>
  <p style="margin-top:24px;font-size:12px;color:#666">
    Mensaje recibido el ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })} (hora Madrid)
  </p>
</body>
</html>`.trim();

  try {
    await resend.emails.send({
      from: 'CIBAI Studio <noreply@cibai.studio>',
      to: toEmail,
      replyTo: email,
      subject: `[CIBAI Studio] Nueva consulta de ${nombre}`,
      html,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[contact] Error al enviar email:', err);
    return new Response(
      JSON.stringify({ error: 'No se pudo enviar el mensaje. Inténtalo de nuevo.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
};
