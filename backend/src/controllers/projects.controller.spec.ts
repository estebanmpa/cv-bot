import { PROJECTS } from '../config/projects';
import { ProjectsController } from './projects.controller';

describe('ProjectsController', () => {
    it('returns every project without the bot-only details', () => {
        const projects = new ProjectsController().findAll();

        expect(projects).toHaveLength(PROJECTS.length);
        projects.forEach((project) => expect(project).not.toHaveProperty('details'));
    });
});
