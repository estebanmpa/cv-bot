import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Select, Stack, Text, TextInput, Textarea } from '@mantine/core'
import { IconAlertTriangle, IconCircleCheck, IconSend } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { ContactRequestError } from '../../api/contact'
import { useSendContactRequest } from '../../mutations/useSendContactRequest'
import {
  ContactRequest,
  MESSAGE_MAX_LENGTH,
  PROJECT_TYPES,
  contactSchema,
} from './contactSchema'
import classes from './ContactForm.module.css'

const EMPTY_REQUEST: ContactRequest = {
  name: '',
  email: '',
  projectType: undefined as unknown as ContactRequest['projectType'],
  message: '',
  website: '',
}

export function ContactForm() {
  const { t } = useTranslation()
  const sendContactRequest = useSendContactRequest()
  const { register, control, handleSubmit, reset, watch, formState } = useForm<ContactRequest>({
    resolver: zodResolver(contactSchema),
    defaultValues: EMPTY_REQUEST,
  })
  const { errors } = formState
  const projectTypeOptions = PROJECT_TYPES.map((value) => ({
    value,
    label: t(`contact.projectTypes.${value}`),
  }))

  const onSubmit = handleSubmit((request) =>
    sendContactRequest.mutate(request, { onSuccess: () => reset(EMPTY_REQUEST) }),
  )

  return (
    <form className={classes.form} onSubmit={onSubmit} noValidate>
      <Stack gap="md">
        {sendContactRequest.isSuccess && (
          <Alert color="teal" radius="lg" icon={<IconCircleCheck size={18} />}>
            {t('contact.form.success')}
          </Alert>
        )}
        {sendContactRequest.isError && (
          <Alert color="red" radius="lg" icon={<IconAlertTriangle size={18} />}>
            {isDeliveryFailure(sendContactRequest.error)
              ? t('contact.form.unavailable')
              : t('contact.form.failed')}
          </Alert>
        )}

        <TextInput
          label={t('contact.form.name')}
          placeholder={t('contact.form.namePlaceholder')}
          autoComplete="name"
          error={errors.name?.message}
          {...register('name')}
        />
        <TextInput
          label={t('contact.form.email')}
          placeholder={t('contact.form.emailPlaceholder')}
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />
        <Controller
          name="projectType"
          control={control}
          render={({ field }) => (
            <Select
              label={t('contact.form.projectType')}
              placeholder={t('contact.form.projectTypePlaceholder')}
              data={projectTypeOptions}
              value={field.value ?? null}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errors.projectType?.message}
              allowDeselect={false}
            />
          )}
        />
        <Textarea
          label={t('contact.form.message')}
          placeholder={t('contact.form.messagePlaceholder')}
          autosize
          minRows={5}
          maxRows={10}
          error={errors.message?.message}
          description={`${watch('message')?.length ?? 0}/${MESSAGE_MAX_LENGTH}`}
          inputWrapperOrder={['label', 'input', 'description', 'error']}
          {...register('message')}
        />

        {/* Honeypot: invisible to people, bots fill it and the backend drops the request */}
        <input
          className={classes.honeypot}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          {...register('website')}
        />

        <Button
          type="submit"
          size="md"
          radius="xl"
          variant="gradient"
          gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
          leftSection={<IconSend size={18} />}
          loading={sendContactRequest.isPending}
          className={classes.submit}
        >
          {t('contact.form.send')}
        </Button>
        <Text size="xs" c="dimmed" ta="center">
          {t('contact.form.quoteNote')}
        </Text>
      </Stack>
    </form>
  )
}

function isDeliveryFailure(error: Error): boolean {
  return error instanceof ContactRequestError && error.isDeliveryFailure
}
