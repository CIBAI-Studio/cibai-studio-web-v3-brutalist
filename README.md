# CIBAI Studio — Web Corporativa

Web corporativa premium de CIBAI Studio. Multiidioma (castellano + catalan), stack moderno, rendimiento optimizado.

## Stack

- **Framework:** Astro 6 (static site generation)
- **Estilos:** Tailwind CSS 4
- **Idiomas:** Castellano (default) + Catala
- **CI/CD:** GitHub Actions
- **TypeScript:** Strict mode

## Decisiones de arquitectura

### Astro sobre Next.js

Se ha elegido **Astro** por:

1. **Rendimiento**: Zero JS by default. Las paginas estaticas se sirven como HTML puro sin runtime de JavaScript.
2. **Simplicidad**: Para una web corporativa de contenido, Astro es mas ligero y directo que Next.js.
3. **Core Web Vitals**: Astro genera HTML estatico con CSS inline, garantizando puntuaciones excelentes en Lighthouse.
4. **Islands Architecture**: Cuando se necesite interactividad (formulario de contacto, animaciones), se puede integrar React/Svelte solo donde haga falta.
5. **i18n nativo**: Astro tiene soporte built-in para internacionalizacion con routing automatico.

### Estructura i18n

- Castellano como idioma por defecto (sin prefijo: `/servicios`)
- Catalan con prefijo `/ca/` (ejemplo: `/ca/serveis`)
- Traducciones centralizadas en `src/i18n/ui.ts`
- Rutas traducidas (servicios/serveis, contacto/contacte, etc.)

### Tailwind CSS 4

- Configuracion via `@theme` en CSS (nueva sintaxis de Tailwind v4)
- Design tokens centralizados: colores, tipografia
- Preparado para recibir la identidad de marca del cliente

## Estructura del proyecto

```
src/
  components/     # Componentes reutilizables (Header, Footer, LanguageSwitcher)
  i18n/           # Sistema de traducciones y utilidades i18n
    ui.ts         # Traducciones key-value por idioma
    utils.ts      # Helpers: getLangFromUrl, useTranslations, getLocalizedPath
  layouts/        # Layout principal con head, header, footer
  pages/          # Paginas ES (raiz) y CA (/ca/...)
    ca/           # Paginas en catalan
  styles/         # CSS global con design tokens
public/           # Assets estaticos (imagenes, fuentes, favicon)
docs/             # Documentacion del proyecto
.github/workflows # CI/CD pipeline
```

## Setup local

```sh
npm install
npm run dev       # Dev server en localhost:4321
```

## Comandos

| Comando           | Accion                                    |
| :---------------- | :---------------------------------------- |
| `npm install`     | Instala dependencias                      |
| `npm run dev`     | Inicia servidor de desarrollo (port 4321) |
| `npm run build`   | Build de produccion en `./dist/`          |
| `npm run preview` | Preview del build en local                |

## Ramas

- `main` — Produccion. Requiere PR aprobado.
- `develop` — Integracion. PRs de feature branches.
- `feature/*` — Desarrollo de funcionalidades.

## Estado

Fase 1A completada. Preparado para Fase 2 (diseno UI/UX + desarrollo de secciones).
