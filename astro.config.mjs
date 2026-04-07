// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  adapter: node({ mode: 'standalone' }),
  site: 'https://cibai.studio',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'ca'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      // Excluir páginas que no deben indexarse
      filter: (page) =>
        !page.includes('/404') &&
        !page.includes('/aviso-legal') &&
        !page.includes('/privacidad') &&
        !page.includes('/cookies'),
      // Prioridades personalizadas por tipo de página
      serialize(item) {
        if (item.url === 'https://cibai.studio/' || item.url === 'https://cibai.studio/ca/') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/servicios/') || item.url.includes('/serveis/')) {
          item.priority = 0.9;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/blog/')) {
          item.priority = 0.8;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/sobre-nosotros') || item.url.includes('/sobre-nosaltres')) {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/contacto') || item.url.includes('/contacte')) {
          item.priority = 0.6;
          item.changefreq = 'monthly';
        } else {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        }
        return item;
      },
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-ES',
          ca: 'ca-ES',
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
