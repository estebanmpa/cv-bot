import {
    SERVICE_OFFERINGS,
    ServiceOffering,
    formatServiceOfferingsForContext,
} from './service-offerings';

const offering: ServiceOffering = {
    slug: 'demo',
    name: 'Demo',
    tagline: 'A demo service.',
    deliverables: ['First', 'Second'],
    proof: 'Shipped a demo.',
    suggestedQuestion: 'What is Demo?',
};

describe('formatServiceOfferingsForContext', () => {
    it('includes the name, deliverables and track record', () => {
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

describe('SERVICE_OFFERINGS', () => {
    it('has unique slugs', () => {
        const slugs = SERVICE_OFFERINGS.map((item) => item.slug);
        expect(new Set(slugs).size).toBe(slugs.length);
    });
});
