import { PROJECTS, Project, formatProjectsForContext } from './projects';

const project: Project = {
    slug: 'demo',
    name: 'Demo',
    tagline: 'A demo project.',
    status: 'in-development',
    highlights: ['First highlight'],
    stack: ['NestJS', 'Redis'],
    details: '\n  Longer detail for the bot.  ',
    suggestedQuestion: 'What is Demo?',
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

describe('PROJECTS', () => {
    it('has unique slugs', () => {
        const slugs = PROJECTS.map((item) => item.slug);
        expect(new Set(slugs).size).toBe(slugs.length);
    });
});
