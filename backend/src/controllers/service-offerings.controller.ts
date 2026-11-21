import { Controller, Get } from '@nestjs/common';
import { SERVICE_OFFERINGS, ServiceOffering } from '../config/service-offerings';

@Controller('services')
export class ServiceOfferingsController {
    @Get()
    findAll(): ServiceOffering[] {
        return SERVICE_OFFERINGS;
    }
}
