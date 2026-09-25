import { createFileRoute, Outlet } from '@tanstack/react-router'
import { TopBar } from '../components/TopBar/TopBar'

export const Route = createFileRoute('/_public')({
  component: PublicLayout,
})

function PublicLayout() {
  return (
    <>
      <TopBar />
      <Outlet />
    </>
  )
}
