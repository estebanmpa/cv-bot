import { Group, Text } from '@mantine/core'
import { Link } from '@tanstack/react-router'
import { IconHome, IconMessageChatbot } from '@tabler/icons-react'
import { ColorSchemeToggle } from '../ColorSchemeToggle'
import classes from './TopBar.module.css'

const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: IconHome, collapseOnMobile: true },
  { to: '/chat', label: 'Chat profile', icon: IconMessageChatbot, collapseOnMobile: false },
] as const

export function TopBar() {
  return (
    <header className={classes.bar}>
      <Group justify="space-between" h="100%" px="md" className={classes.inner}>
        <Link to="/" className={classes.brand}>
          <Text component="span" fw={800} size="lg" className={classes.brandText}>
            estebanmpa<span className={classes.brandAccent}>.dev</span>
          </Text>
        </Link>

        <Group gap={4} wrap="nowrap">
          {NAV_ITEMS.map(({ to, label, icon: Icon, collapseOnMobile }) => (
            <Link
              key={to}
              to={to}
              className={classes.link}
              activeOptions={{ exact: true }}
              activeProps={{ 'data-active': true }}
            >
              <Icon size={18} stroke={1.8} />
              <span className={classes.linkLabel} data-collapsible={collapseOnMobile}>
                {label}
              </span>
            </Link>
          ))}
          <ColorSchemeToggle />
        </Group>
      </Group>
    </header>
  )
}
