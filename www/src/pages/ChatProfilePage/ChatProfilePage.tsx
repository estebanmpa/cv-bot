import { Container } from '@mantine/core'
import { ChatWindow } from '../../components/Chat/ChatWindow'
import { DotGrid } from '../../components/DotGrid/DotGrid'
import { ProfileCard } from '../../components/ProfileCard/ProfileCard'
import classes from './ChatProfilePage.module.css'

export function ChatProfilePage({ initialQuestion }: { initialQuestion?: string }) {
  return (
    <section className={classes.page}>
      <DotGrid />

      <Container size="lg" className={classes.layout}>
        <ProfileCard />
        <div className={classes.chat}>
          <ChatWindow initialQuestion={initialQuestion} />
        </div>
      </Container>
    </section>
  )
}
