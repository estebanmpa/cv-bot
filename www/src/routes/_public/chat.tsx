import { useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { parseChatSearch } from '../../components/Chat/chatSearch'
import { ChatProfilePage } from '../../pages/ChatProfilePage/ChatProfilePage'

export const Route = createFileRoute('/_public/chat')({
  validateSearch: parseChatSearch,
  component: ChatRoute,
})

function ChatRoute() {
  const { ask } = Route.useSearch()
  const navigate = Route.useNavigate()

  // Drop the question from the URL once sent, so a reload doesn't ask it again.
  useEffect(() => {
    if (ask) navigate({ search: {}, replace: true })
  }, [ask, navigate])

  return <ChatProfilePage initialQuestion={ask} />
}
