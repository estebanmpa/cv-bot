import { PROJECTS, Project, formatProjectsForContext, toPublicProject } from './projects';

const project: Project = {
    slug: 'demo',
    name: 'Demo',
    tagline: { en: 'A demo project.', es: 'Un proyecto demo.' },
    status: 'in-development',
    highlights: { en: ['First highlight'], es: ['Primer punto'] },
    stack: ['NestJS', 'Redis'],
    details: '\n  Longer detail for the bot.  ',
    suggestedQuestion: { en: 'What is Demo?', es: '¿Qué es Demo?' },
};

describe('formatProjectsForContext', () => {
    it('includes the name, status, trimmed details and stack', () => {
        expect(formatProjectsForContext([project])).toBe(
            '**Demo** (In active development) — A demo project.\n' +
                'Longer detail for the bot.\n' +
                'Stack: NestJS, Redis.',
        );
    });

    it('adds the website when the project has one', () => {
        const text = formatProjectsForContext([{ ...project, url: 'https://demo.com' }]);
        expect(text).toMatch(/Website: https:\/\/demo\.com$/);
    });

    it('labels live projects as in production', () => {
        const text = formatProjectsForContext([{ ...project, status: 'live' }]);
        expect(text).toContain('(In production)');
    });
});

describe('toPublicProject', () => {
    it('picks the texts of the language and drops the details', () => {
        expect(toPublicProject(project, 'es')).toEqual({
            slug: 'demo',
            name: 'Demo',
            tagline: 'Un proyecto demo.',
            status: 'in-development',
            url: undefined,
            highlights: ['Primer punto'],
            stack: ['NestJS', 'Redis'],
            suggestedQuestion: '¿Qué es Demo?',
        });
    });
});

describe('PROJECTS', () => {
    it('has unique slugs', () => {
        const slugs = PROJECTS.map((item) => item.slug);
        expect(new Set(slugs).size).toBe(slugs.length);
    });
});
