import { Controller, Get } from '@nestjs/common';
import { PROJECTS, Project } from '../config/projects';

export type PublicProject = Omit<Project, 'details'>;

@Controller('projects')
export class ProjectsController {
    @Get()
    findAll(): PublicProject[] {
        return PROJECTS.map(({ details, ...publicFields }) => publicFields);
    }
}
