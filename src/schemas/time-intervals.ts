import { z } from 'zod'

import { convertTimeToMinutes } from '~/utils/datetime'

export const timeIntervalsSchema = z.object({
  intervals: z
    .array(
      z.object({
        day: z.number().min(0).max(6),
        enabled: z.boolean(),
        start: z.string(),
        end: z.string(),
      }),
    )
    .length(7)
    .transform(val => val.filter(interval => interval.enabled))
    .refine(val => val.length > 0, {
      message: 'Pelo menos um dia deve estar habilitado',
    })
    .transform(val =>
      val.map(interval => ({
        weekDay: interval.day,
        startTime: convertTimeToMinutes(interval.start),
        endTime: convertTimeToMinutes(interval.end),
      })),
    )
    .refine(val => val.every(interval => interval.endTime - 60 >= interval.startTime), {
      message: 'O intervalo de tempo deve ser de pelo menos 1 hora',
    }),
})

export type TimeIntervals = z.input<typeof timeIntervalsSchema>
export type TimeIntervalsData = z.output<typeof timeIntervalsSchema>
