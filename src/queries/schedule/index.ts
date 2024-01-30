import { useMutation } from '@tanstack/react-query'

import { api } from '~/lib/axios'

import type { CreateScheduleRequest } from './types'

const endpoints = {
  schedules: (username: string) => `/users/${username}/schedule`,
}

const scheduleKeys = {
  all: ['schedule'] as const,
  lists: () => [...scheduleKeys.all, 'list'] as const,
  list: (filters: string) => [...scheduleKeys.lists(), { filters }] as const,
  details: () => [...scheduleKeys.all, 'detail'] as const,
  detail: (id: number) => [...scheduleKeys.details(), id] as const,
}

const scheduleQueries = {
  useCreateScheduleMutation: () =>
    useMutation({
      mutationFn: async ({ username, ...body }: CreateScheduleRequest) =>
        await api.post(endpoints.schedules(username), body),
    }),
}

export const { useCreateScheduleMutation } = scheduleQueries
