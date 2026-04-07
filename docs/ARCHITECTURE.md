# Decisiones de Arquitectura — Web CIBAI Studio

## ADR-001: Framework — Astro 6

**Contexto:** Necesitamos un framework para la web corporativa. Opciones: Next.js, Astro, Gatsby.

**Decision:** Astro 6 con static site generation.

**Motivos:**
- Web de contenido, no una aplicacion interactiva compleja.
- Zero JS por defecto = maxima velocidad.
- Islands Architecture permite interactividad selectiva.
- i18n routing nativo.
- Build output mas pequeno y rapido que Next.js.

---

## ADR-002: CSS — Tailwind CSS 4

**Contexto:** Framework CSS para estilos.

**Decision:** Tailwind CSS 4 con configuracion via `@theme`.

**Motivos:**
- Utility-first acelera el desarrollo.
- v4 usa CSS nativo (layers, custom properties) = mejor rendimiento.
- Design tokens centralizados facilitan el cambio cuando llegue la identidad de marca.

---

## ADR-003: i18n — Nativo de Astro + traducciones manuales

**Contexto:** La web debe ser bilingue (castellano + catalan).

**Decision:** Usar el routing i18n nativo de Astro con traducciones manuales en TypeScript.

**Motivos:**
- Solo 2 idiomas, no se necesita una libreria pesada.
- Las traducciones en `src/i18n/ui.ts` son type-safe.
- Routing nativo: ES sin prefijo, CA con `/ca/`.
- Rutas traducidas para SEO (servicios/serveis).

---

## ADR-004: CI/CD — GitHub Actions

**Contexto:** Pipeline de build y deploy.

**Decision:** GitHub Actions con workflow en `.github/workflows/ci.yml`.

**Motivos:**
- Integrado con el repo.
- Build + artifact upload en cada push/PR.
- Se extendera con deploy preview en Fase 2.
