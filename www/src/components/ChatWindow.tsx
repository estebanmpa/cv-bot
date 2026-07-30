import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import {
  Button,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Textarea,
  Title,
} from '@mantine/core'
import { IconMessageCircle, IconSend } from '@tabler/icons-react'
import { useSendChatMessage } from '../mutations/useSendChatMessage'

const MAX_MESSAGE_LENGTH = 100

const chatSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, 'Write a message before sending')
    .max(MAX_MESSAGE_LENGTH, `Message can't exceed ${MAX_MESSAGE_LENGTH} characters`),
})

type ChatFormValues = z.infer<typeof chatSchema>

interface ChatEntry {
  id: string
  role: 'user' | 'bot'
  text: string
}

const welcomeMessage: ChatEntry = {
  id: 'welcome',
  role: 'bot',
  text: "Hi 👋 I'm Esteban's virtual assistant. Ask me about his experience, stack, or availability.",
}

function createBotErrorEntry(): ChatEntry {
  return {
    id: crypto.randomUUID(),
    role: 'bot',
    text: "I couldn't reach the bot. Please try again in a moment.",
  }
}

export function ChatWindow() {
  const [history, setHistory] = useState<ChatEntry[]>([welcomeMessage])
  const [chatId] = useState(() => crypto.randomUUID())
  const sendMessage = useSendChatMessage()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ChatFormValues>({
    resolver: zodResolver(chatSchema),
    defaultValues: { message: '' },
  })

  const messageLength = watch('message')?.length ?? 0

  function onSubmit(values: ChatFormValues) {
    setHistory((current) => [
      ...current,
      { id: crypto.randomUUID(), role: 'user', text: values.message },
    ])
    reset()

    sendMessage.mutate({ message: values.message, chatId }, {
      onSuccess: (data) => {
        setHistory((current) => [
          ...current,
          { id: crypto.randomUUID(), role: 'bot', text: data.reply },
        ])
      },
      onError: () => {
        setHistory((current) => [...current, createBotErrorEntry()])
      },
    })
  }

  return (
    <Paper
      withBorder
      radius="lg"
      p="md"
      shadow="sm"
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <Group gap="xs" mb="sm">
        <IconMessageCircle size={20} />
        <Title order={4}>Chat with the bot</Title>
      </Group>

      <ScrollArea flex={1} mah={360} mb="sm" offsetScrollbars>
        <Stack gap="sm">
          {history.map((entry) => (
            <Paper
              key={entry.id}
              radius="md"
              p="sm"
              withBorder
              bg={
                entry.role === 'bot'
                  ? 'var(--mantine-color-violet-light)'
                  : 'var(--mantine-color-gray-light)'
              }
              maw="85%"
              ml={entry.role === 'bot' ? 0 : 'auto'}
            >
              <Text size="xs" fw={700} c={entry.role === 'bot' ? 'violet' : 'dimmed'}>
                {entry.role === 'bot' ? 'Bot' : 'You'}
              </Text>
              <Text size="sm">{entry.text}</Text>
            </Paper>
          ))}
          {sendMessage.isPending && (
            <Text size="xs" c="dimmed">
              The bot is typing…
            </Text>
          )}
        </Stack>
      </ScrollArea>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={4}>
          <Group gap="xs" align="flex-end" wrap="nowrap">
            <Textarea
              {...register('message')}
              placeholder="Type your message..."
              autosize
              minRows={1}
              maxRows={4}
              maxLength={MAX_MESSAGE_LENGTH}
              style={{ flex: 1 }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault()
                  void handleSubmit(onSubmit)()
                }
              }}
            />
            <Button
              type="submit"
              loading={sendMessage.isPending}
              leftSection={<IconSend size={16} />}
            >
              Send
            </Button>
          </Group>
          <Group justify="space-between" gap="xs">
            {errors.message ? (
              <Text size="xs" c="red">
                {errors.message.message}
              </Text>
            ) : (
              <span />
            )}
            <Text size="xs" c={messageLength > MAX_MESSAGE_LENGTH ? 'red' : 'dimmed'}>
              {messageLength}/{MAX_MESSAGE_LENGTH}
            </Text>
          </Group>
        </Stack>
      </form>
    </Paper>
  )
}
