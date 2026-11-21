import { Controller, Get, Query } from '@nestjs/common';
import { pickLanguage } from '../config/language';
import { PROJECTS, PublicProject, toPublicProject } from '../config/projects';

@Controller('projects')
export class ProjectsController {
    @Get()
    findAll(@Query('lang') lang?: string): PublicProject[] {
        const language = pickLanguage(lang);
        return PROJECTS.map((project) => toPublicProject(project, language));
    }
}
