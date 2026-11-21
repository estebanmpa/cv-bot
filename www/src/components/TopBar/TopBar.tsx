import { Group, Text } from '@mantine/core'
import { Link } from '@tanstack/react-router'
import {
  IconBriefcase,
  IconCode,
  IconHome,
  IconMessageChatbot,
  IconSend,
} from '@tabler/icons-react'
import { ColorSchemeToggle } from '../ColorSchemeToggle'
import classes from './TopBar.module.css'

// On phones the brand already links home, so Home makes room for the rest.
const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: IconHome, hideOnMobile: true },
  { to: '/services', label: 'Services', icon: IconBriefcase, hideOnMobile: false },
  { to: '/projects', label: 'Projects', icon: IconCode, hideOnMobile: false },
  { to: '/chat', label: 'Chat profile', icon: IconMessageChatbot, hideOnMobile: false },
  { to: '/contact', label: 'Contact', icon: IconSend, hideOnMobile: false },
] as const

export function TopBar() {
  return (
    <header className={classes.bar}>
      <Group justify="space-between" h="100%" px="md" wrap="nowrap" className={classes.inner}>
        <Link to="/" className={classes.brand}>
          <Text component="span" fw={800} size="lg" className={classes.brandText}>
            estebanmpa<span className={classes.brandAccent}>.dev</span>
          </Text>
        </Link>

        <Group gap={4} wrap="nowrap">
          {NAV_ITEMS.map(({ to, label, icon: Icon, hideOnMobile }) => (
            <Link
              key={to}
              to={to}
              className={classes.link}
              data-hide-on-mobile={hideOnMobile}
              activeOptions={{ exact: true }}
              activeProps={{ 'data-active': true }}
            >
              <Icon size={18} stroke={1.8} />
              <span className={classes.linkLabel}>{label}</span>
            </Link>
          ))}
          <ColorSchemeToggle />
        </Group>
      </Group>
    </header>
  )
}
