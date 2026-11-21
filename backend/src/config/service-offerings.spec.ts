import { LANGUAGES } from './language';
import {
    SERVICE_OFFERINGS,
    ServiceOffering,
    formatServiceOfferingsForContext,
    toPublicServiceOffering,
} from './service-offerings';

const offering: ServiceOffering = {
    slug: 'demo',
    name: { en: 'Demo', es: 'Demo ES' },
    tagline: { en: 'A demo service.', es: 'Un servicio demo.' },
    deliverables: { en: ['First', 'Second'], es: ['Primero', 'Segundo'] },
    proof: { en: 'Shipped a demo.', es: 'Entregué una demo.' },
    suggestedQuestion: { en: 'What is Demo?', es: '¿Qué es Demo?' },
};

describe('formatServiceOfferingsForContext', () => {
    it('includes the English name, deliverables and track record', () => {
        expect(formatServiceOfferingsForContext([offering])).toBe(
            '**Demo** — A demo service.\n' +
                'Includes: First; Second.\n' +
                'Track record: Shipped a demo.',
        );
    });

    it('separates offerings with a blank line', () => {
        const text = formatServiceOfferingsForContext([offering, offering]);
        expect(text.split('\n\n')).toHaveLength(2);
    });
});

describe('toPublicServiceOffering', () => {
    it('picks the texts of the requested language', () => {
        expect(toPublicServiceOffering(offering, 'es')).toEqual({
            slug: 'demo',
            name: 'Demo ES',
            tagline: 'Un servicio demo.',
            deliverables: ['Primero', 'Segundo'],
            proof: 'Entregué una demo.',
            suggestedQuestion: '¿Qué es Demo?',
        });
    });
});

describe('SERVICE_OFFERINGS', () => {
    it('has unique slugs', () => {
        const slugs = SERVICE_OFFERINGS.map((item) => item.slug);
        expect(new Set(slugs).size).toBe(slugs.length);
    });

    it.each(LANGUAGES)('lists the same number of deliverables in %s', (language) => {
        SERVICE_OFFERINGS.forEach((item) =>
            expect(item.deliverables[language]).toHaveLength(item.deliverables.en.length),
        );
    });
});
