import { ActionIcon, Menu } from '@mantine/core'
import { IconCheck, IconLanguage } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGUAGES } from '../i18n'
import { useCurrentLanguage } from '../i18n/useCurrentLanguage'

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const currentLanguage = useCurrentLanguage()

  return (
    <Menu position="bottom-end" transitionProps={{ transition: 'pop-top-right' }} withinPortal>
      <Menu.Target>
        <ActionIcon
          variant="light"
          size="lg"
          aria-label={t('common.language')}
          title={t('common.language')}
        >
          <IconLanguage size={18} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{t('common.language')}</Menu.Label>
        {SUPPORTED_LANGUAGES.map((language) => (
          <Menu.Item
            key={language.code}
            onClick={() => i18n.changeLanguage(language.code)}
            rightSection={language.code === currentLanguage ? <IconCheck size={14} /> : null}
          >
            {language.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  )
}
