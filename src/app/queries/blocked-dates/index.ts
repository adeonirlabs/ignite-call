import { useQuery } from '@tanstack/react-query'

import { api } from '~/lib/axios'

import type { ListBlockedDatesRequest, ListBlockedDatesResponse } from './types'

const endpoints = {
  blockedDates: (username: string, year: string, month: string) =>
    `/users/${username}/blocked-dates?year=${year}&month=${month}`,
}

const blockedDatesKeys = {
  all: ['blockedDates'] as const,
  lists: () => [...blockedDatesKeys.all, 'list'] as const,
  list: (filters: string[]) => [...blockedDatesKeys.lists(), { filters }] as const,
  details: () => [...blockedDatesKeys.all, 'detail'] as const,
  detail: (id: number) => [...blockedDatesKeys.details(), id] as const,
}

const blockedDatesQueries = {
  useListBlockedDatesQuery: ({ username, year, month }: ListBlockedDatesRequest) =>
    useQuery({
      queryKey: blockedDatesKeys.list([year, month]),
      queryFn: async () =>
        await api
          .get<ListBlockedDatesResponse>(endpoints.blockedDates(username, year, month))
          .then(response => response.data),
      enabled: !!year && !!month,
    }),
}

export const { useListBlockedDatesQuery } = blockedDatesQueries
