import { useMutation } from '@tanstack/react-query'
import { sendContactRequest } from '../api/contact'

export function useSendContactRequest() {
  return useMutation({ mutationFn: sendContactRequest })
}
