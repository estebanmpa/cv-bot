import { z } from 'zod'

export const PROJECT_TYPE_OPTIONS = [
  { value: 'new-product', label: 'A new product or MVP' },
  { value: 'existing-product', label: 'Work on an existing product' },
  { value: 'ai-integration', label: 'AI integration' },
  { value: 'legacy-system', label: 'Legacy system or database' },
  { value: 'part-time-role', label: 'Part-time or contract role' },
  { value: 'other', label: 'Something else' },
] as const

type ProjectType = (typeof PROJECT_TYPE_OPTIONS)[number]['value']

const PROJECT_TYPES = PROJECT_TYPE_OPTIONS.map((option) => option.value) as [
  ProjectType,
  ...ProjectType[],
]

export const MESSAGE_MAX_LENGTH = 2000

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Tell me your name').max(100, 'Keep it under 100 characters'),
  email: z.email('Enter a valid email so I can reply').max(200),
  projectType: z.enum(PROJECT_TYPES, 'Pick the option that fits best'),
  message: z
    .string()
    .trim()
    .min(20, 'Add a few more details (at least 20 characters)')
    .max(MESSAGE_MAX_LENGTH, `Keep it under ${MESSAGE_MAX_LENGTH} characters`),
  // Honeypot, hidden from people: see ContactForm.
  website: z.string().optional(),
})

export type ContactRequest = z.infer<typeof contactSchema>
