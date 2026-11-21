export interface ServiceOffering {
    slug: string;
    name: string;
    tagline: string;
    deliverables: string[];
    // A shipped piece of work that backs the offer up.
    proof: string;
    suggestedQuestion: string;
}

// Single source for the services page and the bot's knowledge of them.
export const SERVICE_OFFERINGS: ServiceOffering[] = [
    {
        slug: 'mvp',
        name: 'MVP & SaaS, end to end',
        tagline: 'From an idea to a product running in production with real users.',
        deliverables: [
            'Scope, architecture and data model',
            'Backend, frontend and admin dashboard',
            'Payments, auth and emails wired in',
            'Deploy, monitoring and handover docs',
        ],
        proof: 'Presupuestia: a quoting and payments SaaS, live with Mercado Pago and AI.',
        suggestedQuestion: 'Can you build an MVP for my idea?',
    },
    {
        slug: 'backend',
        name: 'Backend, APIs & integrations',
        tagline: 'Solid services that connect your product with the outside world.',
        deliverables: [
            'REST APIs with NestJS or Node.js',
            'Payment gateways, OAuth and third-party APIs',
            'Queues, caching and background jobs',
            'PostgreSQL design and migrations',
        ],
        proof: 'IAM: an OAuth 2.0 identity provider that signs in all my apps.',
        suggestedQuestion: 'What kind of integrations have you built?',
    },
    {
        slug: 'ai',
        name: 'AI integration',
        tagline: 'Assistants and automations that use LLMs where they add value.',
        deliverables: [
            'Chatbots for web, WhatsApp and Telegram',
            'AI features inside existing products',
            'Model Context Protocol (MCP) servers',
            'Prompting, guardrails and cost control',
        ],
        proof: 'This site: the chat answers from my profile on web, WhatsApp and Telegram.',
        suggestedQuestion: 'Can you add an AI assistant to my product?',
    },
    {
        slug: 'legacy',
        name: 'Legacy systems & databases',
        tagline: 'Keep critical systems healthy, faster and easier to change.',
        deliverables: [
            'Oracle and SQL performance tuning',
            'PL/SQL maintenance and refactoring',
            'Gradual migration to modern stacks',
            'Data cleanup and reporting processes',
        ],
        proof: '15+ years on Oracle and PL/SQL at telcos, banks and automotive companies.',
        suggestedQuestion: 'Can you help with an Oracle database?',
    },
    {
        slug: 'maintenance',
        name: 'Maintenance & testing',
        tagline: 'An extra pair of hands to keep an existing product moving.',
        deliverables: [
            'Bug fixing and new features on your codebase',
            'Automated tests with Jest and Cypress',
            'Code reviews and documentation',
            'Part-time or ongoing collaboration',
        ],
        proof: 'Raised test coverage with mutation testing for a client at GlobalLogic.',
        suggestedQuestion: 'Are you available part-time?',
    },
];

export function formatServiceOfferingsForContext(offerings: ServiceOffering[]): string {
    return offerings.map(formatServiceOffering).join('\n\n');
}

function formatServiceOffering(offering: ServiceOffering): string {
    return [
        `**${offering.name}** — ${offering.tagline}`,
        `Includes: ${offering.deliverables.join('; ')}.`,
        `Track record: ${offering.proof}`,
    ].join('\n');
}
