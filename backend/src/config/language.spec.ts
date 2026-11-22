import { pickLanguage } from './language';

describe('pickLanguage', () => {
    it.each([
        ['es', 'es'],
        ['es-AR', 'es'],
        ['EN_us', 'en'],
        ['fr', 'en'],
        ['', 'en'],
        [undefined, 'en'],
    ])('%s -> %s', (tag, expected) => {
        expect(pickLanguage(tag)).toBe(expected);
    });
});
