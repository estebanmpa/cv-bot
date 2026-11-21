import { PROJECTS } from '../config/projects';
import { ProjectsController } from './projects.controller';

describe('ProjectsController', () => {
    const controller = new ProjectsController();

    it('returns every project without the bot-only details', () => {
        const projects = controller.findAll();

        expect(projects).toHaveLength(PROJECTS.length);
        projects.forEach((project) => expect(project).not.toHaveProperty('details'));
    });

    it('returns the texts in the requested language', () => {
        const [project] = controller.findAll('es-AR');

        expect(project.tagline).toBe(PROJECTS[0].tagline.es);
        expect(project.highlights).toEqual(PROJECTS[0].highlights.es);
    });

    it('falls back to English for unsupported languages', () => {
        const [project] = controller.findAll('fr');

        expect(project.tagline).toBe(PROJECTS[0].tagline.en);
    });
});
