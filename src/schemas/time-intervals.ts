import { z } from 'zod'

const timeIntervals = {
  day: z.number().min(0).max(6),
  enabled: z.boolean(),
  start: z.string(),
  end: z.string(),
}

const timeIntervalsArray = {
  intervals: z.array(z.object(timeIntervals)).length(7),
}

export const timeIntervalsSchema = z.object(timeIntervalsArray)
export type TimeIntervals = z.infer<typeof timeIntervalsSchema>
