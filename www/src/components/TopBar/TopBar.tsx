import { Group, Text } from '@mantine/core'
import { Link } from '@tanstack/react-router'
import {
  IconBriefcase,
  IconCode,
  IconHome,
  IconMessageChatbot,
  IconSend,
} from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { ColorSchemeToggle } from '../ColorSchemeToggle'
import { LanguageSwitcher } from '../LanguageSwitcher'
import classes from './TopBar.module.css'

// On phones the brand already links home, so Home makes room for the rest.
const NAV_ITEMS = [
  { to: '/', labelKey: 'nav.home', icon: IconHome, hideOnMobile: true },
  { to: '/services', labelKey: 'nav.services', icon: IconBriefcase, hideOnMobile: false },
  { to: '/projects', labelKey: 'nav.projects', icon: IconCode, hideOnMobile: false },
  { to: '/chat', labelKey: 'nav.chat', icon: IconMessageChatbot, hideOnMobile: false },
  { to: '/contact', labelKey: 'nav.contact', icon: IconSend, hideOnMobile: false },
] as const

export function TopBar() {
  const { t } = useTranslation()

  return (
    <header className={classes.bar}>
      <Group justify="space-between" h="100%" px="md" wrap="nowrap" className={classes.inner}>
        <Link to="/" className={classes.brand}>
          <Text component="span" fw={800} size="lg" className={classes.brandText}>
            estebanmpa<span className={classes.brandAccent}>.dev</span>
          </Text>
        </Link>

        <Group gap={2} wrap="nowrap">
          {NAV_ITEMS.map(({ to, labelKey, icon: Icon, hideOnMobile }) => (
            <Link
              key={to}
              to={to}
              className={classes.link}
              aria-label={t(labelKey)}
              data-hide-on-mobile={hideOnMobile}
              activeOptions={{ exact: true }}
              activeProps={{ 'data-active': true }}
            >
              <Icon size={18} stroke={1.8} />
              <span className={classes.linkLabel}>{t(labelKey)}</span>
            </Link>
          ))}
          <LanguageSwitcher />
          <ColorSchemeToggle />
        </Group>
      </Group>
    </header>
  )
}
