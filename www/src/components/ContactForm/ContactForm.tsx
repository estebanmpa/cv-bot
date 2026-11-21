import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Select, Stack, Text, TextInput, Textarea } from '@mantine/core'
import { IconAlertTriangle, IconCircleCheck, IconSend } from '@tabler/icons-react'
import { useSendContactRequest } from '../../mutations/useSendContactRequest'
import {
  ContactRequest,
  MESSAGE_MAX_LENGTH,
  PROJECT_TYPE_OPTIONS,
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
  const sendContactRequest = useSendContactRequest()
  const { register, control, handleSubmit, reset, watch, formState } = useForm<ContactRequest>({
    resolver: zodResolver(contactSchema),
    defaultValues: EMPTY_REQUEST,
  })
  const { errors } = formState

  const onSubmit = handleSubmit((request) =>
    sendContactRequest.mutate(request, { onSuccess: () => reset(EMPTY_REQUEST) }),
  )

  return (
    <form className={classes.form} onSubmit={onSubmit} noValidate>
      <Stack gap="md">
        {sendContactRequest.isSuccess && (
          <Alert color="teal" radius="lg" icon={<IconCircleCheck size={18} />}>
            Thanks! Your message reached me. I usually reply within one business day.
          </Alert>
        )}
        {sendContactRequest.isError && (
          <Alert color="red" radius="lg" icon={<IconAlertTriangle size={18} />}>
            {sendContactRequest.error.message}
          </Alert>
        )}

        <TextInput
          label="Name"
          placeholder="Your name"
          autoComplete="name"
          error={errors.name?.message}
          {...register('name')}
        />
        <TextInput
          label="Email"
          placeholder="you@company.com"
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
              label="What do you need?"
              placeholder="Pick one"
              data={PROJECT_TYPE_OPTIONS}
              value={field.value ?? null}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errors.projectType?.message}
              allowDeselect={false}
            />
          )}
        />
        <Textarea
          label="Tell me about it"
          placeholder="What you want to build or fix, where it stands today and any deadline."
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
          Send message
        </Button>
        <Text size="xs" c="dimmed" ta="center">
          Every project is quoted after a short call about its scope.
        </Text>
      </Stack>
    </form>
  )
}
