export type ProjectStatus = 'live' | 'in-development';

export interface Project {
    slug: string;
    name: string;
    tagline: string;
    status: ProjectStatus;
    url?: string;
    highlights: string[];
    stack: string[];
    // Extra detail only the bot uses, to answer follow-up questions.
    details: string;
    suggestedQuestion: string;
}

// Single source for the projects page and the bot's knowledge of them.
export const PROJECTS: Project[] = [
    {
        slug: 'iam',
        name: 'IAM',
        tagline: 'OAuth 2.0 identity provider that handles sign-in for all my apps.',
        status: 'live',
        highlights: [
            'Authorization Code flow with discovery, token exchange and user info',
            'Multi-tenant apps with contextual role-based access control',
            'Google sign-in, service accounts and machine-to-machine tokens',
        ],
        stack: ['NestJS', 'React', 'PostgreSQL', 'Redis', 'Docker', 'Nginx'],
        details: `
Started in 2023 and in production (v1.x). A centralized authentication service
built on a simplified OAuth 2.0 Authorization Code flow. Client apps never talk to
it from the browser: their backend holds the client secret, exchanges the code for
tokens and keeps its own session cookie. Tokens only carry the IAM session id, and
sessions plus token blacklisting live in Redis. Supports applications, roles,
policies, application membership, password reset by email, Google login and
service accounts that can impersonate users for server-to-server calls. Includes
an admin dashboard (React + Mantine). Hexagonal architecture, Argon2 password
hashing, JWT in secure cookies, Nginx as reverse proxy with SSL termination and
rate limiting, deployed with Docker Compose and GitHub Actions.`,
        suggestedQuestion: 'How does the IAM handle sign-in for your other apps?',
    },
    {
        slug: 'presupuestia',
        name: 'Presupuestia',
        tagline: 'Quoting and payments app for tradespeople and service providers.',
        status: 'live',
        url: 'https://presupuestia.com',
        highlights: [
            'Budgets priced item by item from a catalog of materials and labor',
            'AI-drafted budgets from a free-text job description',
            'Clients approve on a public page and pay deposits via Mercado Pago',
        ],
        stack: ['NestJS', 'React', 'PostgreSQL', 'Redis', 'BullMQ', 'Claude API', 'Mercado Pago'],
        details: `
Started in 2026 and in production. Spanish-language SaaS aimed at the Argentine
market (construction, installations, maintenance and technical services). Providers keep
a catalog of products and services, build budgets with margin, taxes and waste per
item, track them by status and share them by WhatsApp or email. Clients open a
mobile-first public page to approve the budget and pay a deposit straight into the
provider's own Mercado Pago account, linked through OAuth with the tokens encrypted
at rest; payments are confirmed through webhooks and verified against Mercado Pago.
An AI feature built on Claude drafts a budget from a job description: the model
only picks items and quantities, while prices always come from the provider's
catalog. Free and Pro plans billed as Mercado Pago subscriptions. Background jobs
(budget expiration, payment notifications, subscription reconciliation, token
refresh) run on BullMQ queues over Redis. Sign-in goes through his own IAM.
Hexagonal architecture with use cases, TypeORM migrations, PDF export.`,
        suggestedQuestion: 'What is Presupuestia and how does its AI budget drafting work?',
    },
];

export function formatProjectsForContext(projects: Project[]): string {
    return projects.map(formatProject).join('\n\n');
}

function formatProject(project: Project): string {
    const status = project.status === 'live' ? 'In production' : 'In active development';

    return [
        `**${project.name}** (${status}) — ${project.tagline}`,
        project.details.trim(),
        `Stack: ${project.stack.join(', ')}.`,
        project.url && `Website: ${project.url}`,
    ]
        .filter(Boolean)
        .join('\n');
}
