import { KeyboardEvent } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ActionIcon, Text, Textarea } from '@mantine/core'
import { IconArrowUp } from '@tabler/icons-react'
import classes from './Chat.module.css'

const MAX_MESSAGE_LENGTH = 100

const chatSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, 'Write a message before sending')
    .max(MAX_MESSAGE_LENGTH, `Message can't exceed ${MAX_MESSAGE_LENGTH} characters`),
})

type ChatFormValues = z.infer<typeof chatSchema>

interface ChatComposerProps {
  onSend: (message: string) => void
  isBusy: boolean
}

export function ChatComposer({ onSend, isBusy }: ChatComposerProps) {
  const { register, handleSubmit, reset, watch, formState } = useForm<ChatFormValues>({
    resolver: zodResolver(chatSchema),
    defaultValues: { message: '' },
  })
  const messageLength = watch('message')?.length ?? 0
  const error = formState.errors.message?.message

  const submit = handleSubmit(({ message }) => {
    if (isBusy) return
    onSend(message)
    reset()
  })

  function submitOnEnter(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== 'Enter' || event.shiftKey) return
    event.preventDefault()
    void submit()
  }

  return (
    <form onSubmit={submit}>
      <div className={classes.composer} data-invalid={error ? true : undefined}>
        <Textarea
          {...register('message')}
          variant="unstyled"
          placeholder="Ask me anything…"
          aria-label="Message"
          autosize
          minRows={1}
          maxRows={4}
          maxLength={MAX_MESSAGE_LENGTH}
          className={classes.composerInput}
          onKeyDown={submitOnEnter}
        />
        <Text size="xs" c="dimmed" className={classes.counter}>
          {messageLength}/{MAX_MESSAGE_LENGTH}
        </Text>
        <ActionIcon
          type="submit"
          size={40}
          radius="xl"
          variant="gradient"
          gradient={{ from: 'violet', to: 'cyan', deg: 135 }}
          loading={isBusy}
          disabled={messageLength === 0}
          aria-label="Send message"
          className={classes.sendButton}
        >
          <IconArrowUp size={20} stroke={2.2} />
        </ActionIcon>
      </div>
      {error && (
        <Text size="xs" c="red" mt={6} ml="md">
          {error}
        </Text>
      )}
    </form>
  )
}
