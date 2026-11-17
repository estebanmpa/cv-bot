import { createFileRoute } from '@tanstack/react-router'
import { ChatProfilePage } from '../../pages/ChatProfilePage/ChatProfilePage'

export const Route = createFileRoute('/_public/chat')({
  component: ChatProfilePage,
})
