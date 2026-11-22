import { z } from 'zod'
import i18n from '../../i18n'

// Keep in sync with backend/src/models/dto/contact-request.dto.ts
export const PROJECT_TYPES = [
  'new-product',
  'existing-product',
  'ai-integration',
  'legacy-system',
  'part-time-role',
  'other',
] as const

export const NAME_MAX_LENGTH = 100
export const MESSAGE_MIN_LENGTH = 20
export const MESSAGE_MAX_LENGTH = 2000

// Messages are functions so they use the language active at validation time.
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: () => i18n.t('contact.validation.nameRequired') })
    .max(NAME_MAX_LENGTH, {
      error: () => i18n.t('contact.validation.nameMax', { max: NAME_MAX_LENGTH }),
    }),
  email: z.email({ error: () => i18n.t('contact.validation.emailInvalid') }).max(200),
  projectType: z.enum(PROJECT_TYPES, {
    error: () => i18n.t('contact.validation.projectTypeRequired'),
  }),
  message: z
    .string()
    .trim()
    .min(MESSAGE_MIN_LENGTH, {
      error: () => i18n.t('contact.validation.messageMin', { min: MESSAGE_MIN_LENGTH }),
    })
    .max(MESSAGE_MAX_LENGTH, {
      error: () => i18n.t('contact.validation.messageMax', { max: MESSAGE_MAX_LENGTH }),
    }),
  // Honeypot, hidden from people: see ContactForm.
  website: z.string().optional(),
})

export type ContactRequest = z.infer<typeof contactSchema>
