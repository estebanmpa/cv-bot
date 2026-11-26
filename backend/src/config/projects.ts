import { Language, Localized } from './language';

export type ProjectStatus = 'live' | 'in-development';

export interface Project {
    slug: string;
    name: string;
    tagline: Localized;
    status: ProjectStatus;
    url?: string;
    highlights: Localized<string[]>;
    stack: string[];
    // Extra detail only the bot uses, to answer follow-up questions. The bot reads
    // English and answers in the visitor's language, so it isn't translated.
    details: string;
    suggestedQuestion: Localized;
}

export interface PublicProject {
    slug: string;
    name: string;
    tagline: string;
    status: ProjectStatus;
    url?: string;
    highlights: string[];
    stack: string[];
    suggestedQuestion: string;
}

// Single source for the projects page and the bot's knowledge of them.
export const PROJECTS: Project[] = [
    {
        slug: 'iam',
        name: 'IAM',
        tagline: {
            en: 'OAuth 2.0 identity provider that handles sign-in for all my apps.',
            es: 'Proveedor de identidad OAuth 2.0 que maneja el inicio de sesión de todas mis apps.',
        },
        status: 'live',
        url: 'https://myiamhub.xyz',
        highlights: {
            en: [
                'Authorization Code flow with discovery, token exchange and user info',
                'Multi-tenant apps with contextual role-based access control',
                'Google sign-in, service accounts and machine-to-machine tokens',
            ],
            es: [
                'Flujo Authorization Code con discovery, intercambio de tokens y user info',
                'Apps multi-tenant con control de acceso por roles según el contexto',
                'Login con Google, cuentas de servicio y tokens entre servidores',
            ],
        },
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
        suggestedQuestion: {
            en: 'How does the IAM handle sign-in for your other apps?',
            es: '¿Cómo maneja el IAM el inicio de sesión de tus otras apps?',
        },
    },
    {
        slug: 'presupuestia',
        name: 'Presupuestia',
        tagline: {
            en: 'Quoting and payments app for tradespeople and service providers.',
            es: 'App de presupuestos y cobros para oficios y prestadores de servicios.',
        },
        status: 'live',
        url: 'https://presupuestia.com',
        highlights: {
            en: [
                'Budgets priced item by item from a catalog of materials and labor',
                'AI-drafted budgets from a free-text job description',
                'Clients approve on a public page and pay deposits via Mercado Pago',
            ],
            es: [
                'Presupuestos cotizados ítem por ítem desde un catálogo de materiales y mano de obra',
                'Presupuestos redactados con IA a partir de la descripción del trabajo',
                'El cliente aprueba en una página pública y paga la seña con Mercado Pago',
            ],
        },
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
        suggestedQuestion: {
            en: 'What is Presupuestia and how does its AI budget drafting work?',
            es: '¿Qué es Presupuestia y cómo arma presupuestos con IA?',
        },
    },
    {
        slug: 'upwind-board',
        name: 'Upwind Board',
        tagline: {
            en: 'Lesson log and IKO progression tracking for kitesurf instructors.',
            es: 'Registro de clases y seguimiento de progresión IKO para instructores de kitesurf.',
        },
        status: 'live',
        url: 'https://upwindboard.com',
        highlights: {
            en: [
                'Lessons logged per student with kite, board, conditions and notes',
                'Progression through the IKO skill tree, derived from every lesson',
                'School management: students, instructors and equipment inventory',
            ],
            es: [
                'Clases registradas por alumno con kite, tabla, condiciones y notas',
                'Progresión por el árbol de habilidades IKO, calculada a partir de cada clase',
                'Gestión de la escuela: alumnos, instructores e inventario de equipos',
            ],
        },
        stack: ['NestJS', 'React', 'PostgreSQL', 'Redis', 'Docker', 'Nginx'],
        details: `
Started in 2026 and in production. A tool for IKO kitesurf instructors and schools.
Instructors log each lesson with its students, and for every student mark the
skills worked on (levels → skills → sub-skills of the IKO tree) as Introduced,
Practiced or Mastered; the editor shows the last status recorded for each skill.
A student's progression is never stored: it is derived from the latest status per
skill across all their lessons. Includes a dashboard (lessons and hours this
month, students, active instructors), student profiles with progression per level
and lesson history, instructor management, an equipment inventory that can be
assigned to lessons, and an editable skill tree. Sign-in goes through his own IAM,
with sessions in Redis. Hexagonal architecture with use cases, TypeORM migrations,
OpenAPI docs, React + Mantine frontend, deployed with Docker Compose and GitHub
Actions behind an Nginx reverse proxy.`,
        suggestedQuestion: {
            en: 'What is Upwind Board and how does it track student progression?',
            es: '¿Qué es Upwind Board y cómo sigue la progresión de los alumnos?',
        },
    },
];

export function formatProjectsForContext(projects: Project[]): string {
    return projects.map(formatProject).join('\n\n');
}

function formatProject(project: Project): string {
    const status = project.status === 'live' ? 'In production' : 'In active development';

    return [
        `**${project.name}** (${status}) — ${project.tagline.en}`,
        project.details.trim(),
        `Stack: ${project.stack.join(', ')}.`,
        project.url && `Website: ${project.url}`,
    ]
        .filter(Boolean)
        .join('\n');
}

export function toPublicProject(project: Project, language: Language): PublicProject {
    return {
        slug: project.slug,
        name: project.name,
        tagline: project.tagline[language],
        status: project.status,
        url: project.url,
        highlights: project.highlights[language],
        stack: project.stack,
        suggestedQuestion: project.suggestedQuestion[language],
    };
}
