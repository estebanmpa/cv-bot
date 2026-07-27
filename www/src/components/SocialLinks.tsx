import { Button, Group } from '@mantine/core'
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react'

const LINKEDIN_URL =
  import.meta.env.VITE_LINKEDIN_URL ?? 'https://www.linkedin.com/in/your-username'
const GITHUB_URL =
  import.meta.env.VITE_GITHUB_URL ?? 'https://github.com/your-username'

export function SocialLinks() {
  return (
    <Group gap="sm">
      <Button
        component="a"
        href={LINKEDIN_URL}
        target="_blank"
        rel="noreferrer"
        variant="light"
        leftSection={<IconBrandLinkedin size={18} />}
      >
        LinkedIn
      </Button>
      <Button
        component="a"
        href={GITHUB_URL}
        target="_blank"
        rel="noreferrer"
        variant="light"
        color="dark"
        leftSection={<IconBrandGithub size={18} />}
      >
        GitHub
      </Button>
    </Group>
  )
}
