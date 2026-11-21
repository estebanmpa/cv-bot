import { useQuery } from '@tanstack/react-query'
import { fetchServiceOfferings } from '../api/serviceOfferings'

export function useServiceOfferings() {
  return useQuery({
    queryKey: ['service-offerings'],
    queryFn: fetchServiceOfferings,
    // The list only changes on a deploy.
    staleTime: Infinity,
  })
}
