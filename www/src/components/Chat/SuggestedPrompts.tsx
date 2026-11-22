import { UnstyledButton } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import classes from './Chat.module.css'

const SUGGESTIONS = ['services', 'mvp', 'experience'] as const

export function SuggestedPrompts({ onPick }: { onPick: (prompt: string) => void }) {
  const { t } = useTranslation()

  return (
    <div className={classes.suggestions}>
      {SUGGESTIONS.map((suggestion) => {
        const prompt = t(`chat.suggestions.${suggestion}`)
        return (
          <UnstyledButton key={suggestion} className={classes.suggestion} onClick={() => onPick(prompt)}>
            {prompt}
          </UnstyledButton>
        )
      })}
    </div>
  )
}
