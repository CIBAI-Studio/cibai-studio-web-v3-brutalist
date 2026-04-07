export const languages = {
  es: 'Castellano',
  ca: 'Català',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'es';

export const ui = {
  es: {
    /* Navigation */
    'nav.home':      'Inicio',
    'nav.services':  'Servicios',
    'nav.portfolio': 'Portfolio',
    'nav.about':     'Sobre nosotros',
    'nav.blog':      'Blog',
    'nav.contact':   'Hablemos',

    /* Hero */
    'hero.eyebrow':    'Agencia digital · Barcelona',
    'hero.title':      'Tu negocio merece una web que convierta — no solo una que impresione.',
    'hero.subtitle':   'Combinamos diseño de alto impacto, desarrollo a medida e inteligencia artificial para crear experiencias digitales que convierten visitas en clientes.',
    'hero.cta':        'Cuéntanos tu proyecto',
    'hero.cta.sec':    'Ver nuestro trabajo',
    'hero.tagline':    'Diseño. Tecnología. Resultados.',

    /* Stats */
    'stats.projects': '+50',
    'stats.projects.label': 'Proyectos entregados',
    'stats.satisfaction': '98%',
    'stats.satisfaction.label': 'Clientes satisfechos',
    'stats.years': '5+',
    'stats.years.label': 'Años de experiencia',

    /* Services section */
    'services.eyebrow':   'Servicios',
    'services.title':     'Lo que hacemos — y por qué importa para tu negocio',
    'services.subtitle':  'Cada servicio está diseñado con un único objetivo: que tu presencia digital trabaje para ti, incluso cuando tú no estás trabajando.',

    /* Portfolio section */
    'portfolio.eyebrow':  'Portfolio',
    'portfolio.title':    'Proyectos que hablan por nosotros.',
    'portfolio.subtitle': 'No te contamos lo buenos que somos. Te lo demostramos.',
    'portfolio.cta':      'Cuéntanos tu proyecto',
    'portfolio.closing':  '¿El tuyo podría ser el siguiente caso de éxito?',

    /* About section */
    'about.eyebrow':      'Sobre nosotros',
    'about.title':        'No somos una agencia más. Somos tu equipo digital.',
    'about.cta':          '¿Trabajamos juntos? Cuéntanos tu proyecto',

    /* Process section */
    'process.eyebrow':    'Cómo trabajamos',
    'process.title':      'Del briefing a la entrega — sin sorpresas.',
    'process.subtitle':   'Nuestro proceso es completamente transparente, con hitos claros y orientado a resultados desde el día uno.',
    'process.cta':        'Cuéntanos tu proyecto',

    /* Contact */
    'contact.eyebrow':    'Contacto',
    'contact.title':      'Cuéntanos tu proyecto.',
    'contact.subtitle':   'Sin compromisos. Sin presión. Solo una conversación sobre cómo podemos ayudarte.',
    'contact.response':   'Respondemos en menos de 24 horas en días laborables.',
    'contact.email':      'hola@cibai.studio',
    'contact.location':   'Barcelona, España',
    'contact.hours':      'Lunes a viernes · 9:00 – 18:00 h',
    'contact.send':       'Enviar mi consulta',

    /* Form */
    'form.name':          'Nombre completo',
    'form.email':         'Correo electrónico',
    'form.phone':         'Teléfono (opcional)',
    'form.service':       '¿En qué podemos ayudarte?',
    'form.message':       'Cuéntanos tu proyecto',
    'form.source':        '¿Cómo nos has conocido?',
    'form.placeholder':   'Cuéntanos brevemente qué necesitas, dónde estás ahora y a dónde quieres llegar.',
    'form.required':      'Campo obligatorio',

    /* Footer */
    'footer.rights':      'Todos los derechos reservados.',
    'footer.privacy':     'Política de privacidad',
    'footer.legal':       'Aviso legal',
    'footer.cookies':     'Política de cookies',
    'footer.available':   'Disponibles para nuevos proyectos',
    'footer.tagline':     'Agencia especializada en desarrollo web, automatización e inteligencia artificial.',
    'footer.madein':      'Hecho con',
  },
  ca: {
    /* Navigation */
    'nav.home':      'Inici',
    'nav.services':  'Serveis',
    'nav.portfolio': 'Portfolio',
    'nav.about':     'Sobre nosaltres',
    'nav.blog':      'Blog',
    'nav.contact':   'Parlem',

    /* Hero */
    'hero.eyebrow':    'Agència digital · Barcelona',
    'hero.title':      'El teu negoci mereix una web que converteixi — no només que impressioni.',
    'hero.subtitle':   'Combinem disseny d\'alt impacte, desenvolupament a mida i intel·ligència artificial per crear experiències digitals que converteixen visites en clients.',
    'hero.cta':        'Explica\'ns el teu projecte',
    'hero.cta.sec':    'Veure la nostra feina',
    'hero.tagline':    'Disseny. Tecnologia. Resultats.',

    /* Stats */
    'stats.projects': '+50',
    'stats.projects.label': 'Projectes lliurats',
    'stats.satisfaction': '98%',
    'stats.satisfaction.label': 'Clients satisfets',
    'stats.years': '5+',
    'stats.years.label': 'Anys d\'experiència',

    /* Services section */
    'services.eyebrow':   'Serveis',
    'services.title':     'El que fem — i per què importa per al teu negoci',
    'services.subtitle':  'Cada servei està dissenyat amb un únic objectiu: que la teva presència digital treballi per tu, fins i tot quan tu no hi ets.',

    /* Portfolio section */
    'portfolio.eyebrow':  'Portfolio',
    'portfolio.title':    'Projectes que parlen per nosaltres.',
    'portfolio.subtitle': 'No et diem el bons que som. T\'ho demostrem.',
    'portfolio.cta':      'Explica\'ns el teu projecte',
    'portfolio.closing':  'El teu podria ser el següent cas d\'èxit?',

    /* About section */
    'about.eyebrow':      'Sobre nosaltres',
    'about.title':        'No som una agència més. Som el teu equip digital.',
    'about.cta':          'Treballem junts? Explica\'ns el teu projecte',

    /* Process section */
    'process.eyebrow':    'Com treballem',
    'process.title':      'Del briefing al lliurament — sense sorpreses.',
    'process.subtitle':   'El nostre procés és completament transparent, amb fites clares i orientat a resultats des del primer dia.',
    'process.cta':        'Explica\'ns el teu projecte',

    /* Contact */
    'contact.eyebrow':    'Contacte',
    'contact.title':      'Explica\'ns el teu projecte.',
    'contact.subtitle':   'Sense compromisos. Sense pressió. Només una conversa sobre com podem ajudar-te.',
    'contact.response':   'Responem en menys de 24 hores en dies laborables.',
    'contact.email':      'hola@cibai.studio',
    'contact.location':   'Barcelona, Catalunya',
    'contact.hours':      'Dilluns a divendres · 9:00 – 18:00 h',
    'contact.send':       'Enviar la meva consulta',

    /* Form */
    'form.name':          'Nom complet',
    'form.email':         'Correu electrònic',
    'form.phone':         'Telèfon (opcional)',
    'form.service':       'En què podem ajudar-te?',
    'form.message':       'Explica\'ns el teu projecte',
    'form.source':        'Com ens has conegut?',
    'form.placeholder':   'Explica\'ns breument el que necessites, on ets ara i on vols arribar.',
    'form.required':      'Camp obligatori',

    /* Footer */
    'footer.rights':      'Tots els drets reservats.',
    'footer.privacy':     'Política de privacitat',
    'footer.legal':       'Avís legal',
    'footer.cookies':     'Política de cookies',
    'footer.available':   'Disponibles per a nous projectes',
    'footer.tagline':     'Agència especialitzada en desenvolupament web, automatització i intel·ligència artificial.',
    'footer.madein':      'Fet amb',
  },
} as const;
