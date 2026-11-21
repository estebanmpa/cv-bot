import { ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ContactRequestDto } from '../models/dto/contact-request.dto';
import { ContactService, formatContactNotification } from './contact.service';
import { TelegramService } from './telegram.service';

const request: ContactRequestDto = {
    name: 'Ada',
    email: 'ada@example.com',
    projectType: 'new-product',
    message: 'I need an MVP.',
};

function buildService(ownerChatId: string | undefined, delivered = true) {
    const sendMessage = jest.fn().mockResolvedValue(delivered);
    const configService = { get: () => ownerChatId } as unknown as ConfigService;
    const telegramService = { sendMessage } as unknown as TelegramService;

    return { service: new ContactService(configService, telegramService), sendMessage };
}

describe('ContactService', () => {
    it('sends the request to the owner chat', async () => {
        const { service, sendMessage } = buildService('42');

        await service.submit(request);

        expect(sendMessage).toHaveBeenCalledWith('42', formatContactNotification(request));
    });

    it('drops requests that filled the honeypot', async () => {
        const { service, sendMessage } = buildService('42');

        await service.submit({ ...request, website: 'spam.example' });

        expect(sendMessage).not.toHaveBeenCalled();
    });

    it('fails when Telegram does not deliver the message', async () => {
        const { service } = buildService('42', false);

        await expect(service.submit(request)).rejects.toThrow(ServiceUnavailableException);
    });

    it('fails when no owner chat is configured', async () => {
        const { service, sendMessage } = buildService(undefined);

        await expect(service.submit(request)).rejects.toThrow(ServiceUnavailableException);
        expect(sendMessage).not.toHaveBeenCalled();
    });
});

describe('formatContactNotification', () => {
    it('lists the sender details before the message', () => {
        expect(formatContactNotification(request)).toBe(
            '📩 New contact request\n' +
                'Name: Ada\n' +
                'Email: ada@example.com\n' +
                'Project type: new-product\n' +
                '\n' +
                'I need an MVP.',
        );
    });
});
