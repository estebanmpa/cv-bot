import { useQuery } from '@tanstack/react-query'
import { fetchServiceOfferings } from '../api/serviceOfferings'
import { useCurrentLanguage } from '../i18n/useCurrentLanguage'

export function useServiceOfferings() {
  const language = useCurrentLanguage()

  return useQuery({
    queryKey: ['service-offerings', language],
    queryFn: () => fetchServiceOfferings(language),
    // The list only changes on a deploy.
    staleTime: Infinity,
  })
}
