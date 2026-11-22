import { afterEach, describe, expect, it } from 'vitest'
import i18n, { SUPPORTED_LANGUAGES } from '.'
import en from './locales/en.json'
import es from './locales/es.json'
import { contactSchema } from '../components/ContactForm/contactSchema'

type Messages = { [key: string]: string | Messages }

function flatten(messages: Messages, prefix = ''): Record<string, string> {
  return Object.entries(messages).reduce<Record<string, string>>((acc, [key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key
    return typeof value === 'string'
      ? { ...acc, [path]: value }
      : { ...acc, ...flatten(value, path) }
  }, {})
}

const placeholders = (text: string) => (text.match(/{{\s*\w+\s*}}/g) ?? []).sort()
const tags = (text: string) => (text.match(/<\/?\w+>/g) ?? []).sort()

const locales: Record<string, Messages> = { en, es }
const reference = flatten(en)

describe('locale files', () => {
  it('provides a file for every supported language', () => {
    expect(Object.keys(locales).sort()).toEqual(
      SUPPORTED_LANGUAGES.map((language) => language.code).sort(),
    )
  })

  it.each(Object.keys(locales))('%s has exactly the same keys as en', (code) => {
    expect(Object.keys(flatten(locales[code])).sort()).toEqual(Object.keys(reference).sort())
  })

  it.each(Object.keys(locales))('%s keeps the interpolations and tags of en', (code) => {
    const messages = flatten(locales[code])
    for (const [key, text] of Object.entries(reference)) {
      expect(placeholders(messages[key]), key).toEqual(placeholders(text))
      expect(tags(messages[key]), key).toEqual(tags(text))
    }
  })

  it.each(Object.keys(locales))('%s has no empty translations', (code) => {
    for (const [key, text] of Object.entries(flatten(locales[code]))) {
      expect(text.trim(), key).not.toBe('')
    }
  })
})

describe('i18n runtime', () => {
  afterEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('switches translations', async () => {
    await i18n.changeLanguage('es')
    expect(i18n.t('nav.services')).toBe('Servicios')

    await i18n.changeLanguage('en')
    expect(i18n.t('nav.services')).toBe('Services')
  })

  it('resolves regional variants to the base language', async () => {
    await i18n.changeLanguage('es-AR')
    expect(i18n.resolvedLanguage).toBe('es')
  })

  it('falls back to English for unsupported languages', async () => {
    await i18n.changeLanguage('fr')
    expect(i18n.t('nav.services')).toBe('Services')
  })

  it('builds validation messages in the language active at validation time', async () => {
    const invalidRequest = { name: '', email: 'x', projectType: 'other', message: 'hi' }

    await i18n.changeLanguage('es')
    const spanish = contactSchema.safeParse(invalidRequest)
    expect(spanish.error?.issues.map((issue) => issue.message)).toContain('Decime tu nombre')

    await i18n.changeLanguage('en')
    const english = contactSchema.safeParse(invalidRequest)
    expect(english.error?.issues.map((issue) => issue.message)).toContain('Tell me your name')
  })
})
