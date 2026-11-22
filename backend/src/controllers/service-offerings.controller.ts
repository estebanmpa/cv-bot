import { Controller, Get, Query } from '@nestjs/common';
import { pickLanguage } from '../config/language';
import {
    PublicServiceOffering,
    SERVICE_OFFERINGS,
    toPublicServiceOffering,
} from '../config/service-offerings';

@Controller('services')
export class ServiceOfferingsController {
    @Get()
    findAll(@Query('lang') lang?: string): PublicServiceOffering[] {
        const language = pickLanguage(lang);
        return SERVICE_OFFERINGS.map((offering) => toPublicServiceOffering(offering, language));
    }
}
