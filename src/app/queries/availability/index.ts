import { useQuery } from '@tanstack/react-query'

import { api } from '~/lib/axios'

import type { ListAvailabilitiesRequest, ListAvailabilitiesResponse } from './types'

const endpoints = {
  availabilities: (username: string, date?: string) => `/users/${username}/availability?date=${date}`,
}

const availabilityKeys = {
  all: ['availability'] as const,
  lists: () => [...availabilityKeys.all, 'list'] as const,
  list: (filters: string) => [...availabilityKeys.lists(), { filters }] as const,
  details: () => [...availabilityKeys.all, 'detail'] as const,
  detail: (id: number) => [...availabilityKeys.details(), id] as const,
}

const availabilityQueries = {
  useListAvailabilitiesQuery: ({ username, date }: ListAvailabilitiesRequest) =>
    useQuery({
      queryKey: availabilityKeys.list(date || 'date'),
      queryFn: async () =>
        await api
          .get<ListAvailabilitiesResponse>(endpoints.availabilities(username, date))
          .then(response => response.data),
      enabled: !!date,
    }),
}

export const { useListAvailabilitiesQuery } = availabilityQueries
