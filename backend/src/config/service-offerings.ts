import { Language, Localized } from './language';

export interface ServiceOffering {
    slug: string;
    name: Localized;
    tagline: Localized;
    deliverables: Localized<string[]>;
    // A shipped piece of work that backs the offer up.
    proof: Localized;
    suggestedQuestion: Localized;
}

export interface PublicServiceOffering {
    slug: string;
    name: string;
    tagline: string;
    deliverables: string[];
    proof: string;
    suggestedQuestion: string;
}

// Single source for the services page and the bot's knowledge of them.
export const SERVICE_OFFERINGS: ServiceOffering[] = [
    {
        slug: 'mvp',
        name: { en: 'MVP & SaaS, end to end', es: 'MVP y SaaS, de punta a punta' },
        tagline: {
            en: 'From an idea to a product running in production with real users.',
            es: 'De una idea a un producto en producción con usuarios reales.',
        },
        deliverables: {
            en: [
                'Scope, architecture and data model',
                'Backend, frontend and admin dashboard',
                'Payments, auth and emails wired in',
                'Deploy, monitoring and handover docs',
            ],
            es: [
                'Alcance, arquitectura y modelo de datos',
                'Backend, frontend y panel de administración',
                'Pagos, autenticación y emails integrados',
                'Deploy, monitoreo y documentación de traspaso',
            ],
        },
        proof: {
            en: 'Presupuestia: a quoting and payments SaaS, live with Mercado Pago and AI.',
            es: 'Presupuestia: un SaaS de presupuestos y cobros, en producción con Mercado Pago e IA.',
        },
        suggestedQuestion: {
            en: 'Can you build an MVP for my idea?',
            es: '¿Podés construir un MVP para mi idea?',
        },
    },
    {
        slug: 'backend',
        name: { en: 'Backend, APIs & integrations', es: 'Backend, APIs e integraciones' },
        tagline: {
            en: 'Solid services that connect your product with the outside world.',
            es: 'Servicios sólidos que conectan tu producto con el mundo exterior.',
        },
        deliverables: {
            en: [
                'REST APIs with NestJS or Node.js',
                'Payment gateways, OAuth and third-party APIs',
                'Queues, caching and background jobs',
                'PostgreSQL design and migrations',
            ],
            es: [
                'APIs REST con NestJS o Node.js',
                'Pasarelas de pago, OAuth y APIs de terceros',
                'Colas, caché y procesos en segundo plano',
                'Diseño de PostgreSQL y migraciones',
            ],
        },
        proof: {
            en: 'IAM: an OAuth 2.0 identity provider that signs in all my apps.',
            es: 'IAM: un proveedor de identidad OAuth 2.0 que autentica todas mis apps.',
        },
        suggestedQuestion: {
            en: 'What kind of integrations have you built?',
            es: '¿Qué tipo de integraciones hiciste?',
        },
    },
    {
        slug: 'ai',
        name: { en: 'AI integration', es: 'Integración de IA' },
        tagline: {
            en: 'Assistants and automations that use LLMs where they add value.',
            es: 'Asistentes y automatizaciones que usan LLMs donde suman valor.',
        },
        deliverables: {
            en: [
                'Chatbots for web, WhatsApp and Telegram',
                'AI features inside existing products',
                'Model Context Protocol (MCP) servers',
                'Prompting, guardrails and cost control',
            ],
            es: [
                'Chatbots para web, WhatsApp y Telegram',
                'Funciones de IA dentro de productos existentes',
                'Servidores Model Context Protocol (MCP)',
                'Prompts, límites de seguridad y control de costos',
            ],
        },
        proof: {
            en: 'This site: the chat answers from my profile on web, WhatsApp and Telegram.',
            es: 'Este sitio: el chat responde sobre mi perfil en la web, WhatsApp y Telegram.',
        },
        suggestedQuestion: {
            en: 'Can you add an AI assistant to my product?',
            es: '¿Podés sumar un asistente de IA a mi producto?',
        },
    },
    {
        slug: 'legacy',
        name: { en: 'Legacy systems & databases', es: 'Sistemas legacy y bases de datos' },
        tagline: {
            en: 'Keep critical systems healthy, faster and easier to change.',
            es: 'Sistemas críticos sanos, más rápidos y más fáciles de cambiar.',
        },
        deliverables: {
            en: [
                'Oracle and SQL performance tuning',
                'PL/SQL maintenance and refactoring',
                'Gradual migration to modern stacks',
                'Data cleanup and reporting processes',
            ],
            es: [
                'Optimización de rendimiento en Oracle y SQL',
                'Mantenimiento y refactor de PL/SQL',
                'Migración gradual a tecnologías modernas',
                'Limpieza de datos y procesos de reportes',
            ],
        },
        proof: {
            en: '15+ years on Oracle and PL/SQL at telcos, banks and automotive companies.',
            es: 'Más de 15 años con Oracle y PL/SQL en telcos, bancos y automotrices.',
        },
        suggestedQuestion: {
            en: 'Can you help with an Oracle database?',
            es: '¿Podés ayudar con una base de datos Oracle?',
        },
    },
    {
        slug: 'maintenance',
        name: { en: 'Maintenance & testing', es: 'Mantenimiento y testing' },
        tagline: {
            en: 'An extra pair of hands to keep an existing product moving.',
            es: 'Un par de manos extra para que un producto existente siga avanzando.',
        },
        deliverables: {
            en: [
                'Bug fixing and new features on your codebase',
                'Automated tests with Jest and Cypress',
                'Code reviews and documentation',
                'Part-time or ongoing collaboration',
            ],
            es: [
                'Corrección de bugs y nuevas funciones en tu código',
                'Tests automatizados con Jest y Cypress',
                'Code reviews y documentación',
                'Colaboración part-time o continua',
            ],
        },
        proof: {
            en: 'Raised test coverage with mutation testing for a client at GlobalLogic.',
            es: 'Aumenté la cobertura de tests con mutation testing para un cliente en GlobalLogic.',
        },
        suggestedQuestion: {
            en: 'Are you available part-time?',
            es: '¿Estás disponible part-time?',
        },
    },
];

export function toPublicServiceOffering(
    offering: ServiceOffering,
    language: Language,
): PublicServiceOffering {
    return {
        slug: offering.slug,
        name: offering.name[language],
        tagline: offering.tagline[language],
        deliverables: offering.deliverables[language],
        proof: offering.proof[language],
        suggestedQuestion: offering.suggestedQuestion[language],
    };
}

// The bot reads English and answers in the visitor's language.
export function formatServiceOfferingsForContext(offerings: ServiceOffering[]): string {
    return offerings.map(formatServiceOffering).join('\n\n');
}

function formatServiceOffering(offering: ServiceOffering): string {
    return [
        `**${offering.name.en}** — ${offering.tagline.en}`,
        `Includes: ${offering.deliverables.en.join('; ')}.`,
        `Track record: ${offering.proof.en}`,
    ].join('\n');
}
