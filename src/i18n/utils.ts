import { ui, defaultLang, type Lang } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getRouteFromUrl(url: URL): string {
  const pathname = url.pathname;
  const parts = pathname.split('/').filter(Boolean);
  if (parts[0] in ui) {
    return '/' + parts.slice(1).join('/');
  }
  return pathname;
}

const routeMap: Record<string, Record<Lang, string>> = {
  servicios: { es: 'servicios', ca: 'serveis' },
  serveis: { es: 'servicios', ca: 'serveis' },
  contacto: { es: 'contacto', ca: 'contacte' },
  contacte: { es: 'contacto', ca: 'contacte' },
  'sobre-nosotros': { es: 'sobre-nosotros', ca: 'sobre-nosaltres' },
  'sobre-nosaltres': { es: 'sobre-nosotros', ca: 'sobre-nosaltres' },
  portfolio: { es: 'portfolio', ca: 'portfolio' },
  blog: { es: 'blog', ca: 'blog' },
};

export function getLocalizedPath(path: string, lang: Lang): string {
  const cleanPath = path.replace(/^\//, '').split('/');
  const translatedParts = cleanPath.map(
    (part) => routeMap[part]?.[lang] ?? part
  );
  const translatedPath = translatedParts.join('/');
  if (lang === defaultLang) {
    return `/${translatedPath}`;
  }
  return `/${lang}/${translatedPath}`;
}
