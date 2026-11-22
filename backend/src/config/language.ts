export const LANGUAGES = ['en', 'es'] as const;

export type Language = (typeof LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = 'en';

// A value written once per supported language, e.g. { en: 'Live', es: 'En producción' }.
export type Localized<T = string> = Record<Language, T>;

// Accepts tags like "es-AR" and falls back to English for anything unsupported.
export function pickLanguage(tag?: string): Language {
    const base = tag?.trim().toLowerCase().split(/[-_]/)[0];
    return LANGUAGES.find((language) => language === base) ?? DEFAULT_LANGUAGE;
}
