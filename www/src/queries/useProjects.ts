import { useQuery } from '@tanstack/react-query'
import { fetchProjects } from '../api/projects'
import { useCurrentLanguage } from '../i18n/useCurrentLanguage'

export function useProjects() {
  const language = useCurrentLanguage()

  return useQuery({
    queryKey: ['projects', language],
    queryFn: () => fetchProjects(language),
    // The list only changes on a deploy.
    staleTime: Infinity,
  })
}
