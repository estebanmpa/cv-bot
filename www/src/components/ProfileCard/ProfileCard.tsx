import { Avatar, Badge, Box, Button, Divider, Text, Title } from '@mantine/core'
import { IconBrandTelegram, IconMapPin } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { SocialLinks } from '../SocialLinks'
import { TELEGRAM_URL, TelegramQr } from '../TelegramQr'
import classes from './ProfileCard.module.css'

export function ProfileCard() {
  const { t } = useTranslation()

  return (
    <aside className={classes.card}>
      <div className={classes.avatarRing}>
        <Avatar size={92} radius="50%" color="violet" variant="filled" className={classes.avatar}>
          EP
        </Avatar>
      </div>

      <div>
        <Title order={3} className={classes.name}>
          Esteban Mariano Piga Alessi
        </Title>
        <Text size="sm" c="dimmed" mt={4}>
          {t('profile.role')}
        </Text>
      </div>

      <Badge variant="light" radius="xl" leftSection={<IconMapPin size={12} />}>
        {t('profile.location')}
      </Badge>

      <SocialLinks />

      <Divider className={classes.divider} />

      {/* A QR is only useful when the visitor is on another device than their phone */}
      <Box visibleFrom="md">
        <TelegramQr />
      </Box>
      <Button
        hiddenFrom="md"
        component="a"
        href={TELEGRAM_URL}
        target="_blank"
        rel="noreferrer"
        variant="light"
        color="blue"
        radius="xl"
        leftSection={<IconBrandTelegram size={18} />}
      >
        {t('profile.continueOnTelegram')}
      </Button>
    </aside>
  )
}
