import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core'
import { IconMoon, IconSun } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

export function ColorSchemeToggle() {
  const { t } = useTranslation()
  const { setColorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme('light')

  function handleToggle() {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <ActionIcon variant="light" size="lg" onClick={handleToggle} aria-label={t('common.toggleColorScheme')}>
      {computedColorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
    </ActionIcon>
  )
}
