import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ContactRequestDto } from '../models/dto/contact-request.dto';
import { ContactService } from '../services/contact.service';

@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) { }

    @Post()
    @HttpCode(HttpStatus.NO_CONTENT)
    async create(@Body() body: ContactRequestDto): Promise<void> {
        await this.contactService.submit(body);
    }
}
