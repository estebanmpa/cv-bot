import { UnstyledButton } from '@mantine/core'
import { SUGGESTED_PROMPTS } from './chatEntry'
import classes from './Chat.module.css'

export function SuggestedPrompts({ onPick }: { onPick: (prompt: string) => void }) {
  return (
    <div className={classes.suggestions}>
      {SUGGESTED_PROMPTS.map((prompt) => (
        <UnstyledButton key={prompt} className={classes.suggestion} onClick={() => onPick(prompt)}>
          {prompt}
        </UnstyledButton>
      ))}
    </div>
  )
}
