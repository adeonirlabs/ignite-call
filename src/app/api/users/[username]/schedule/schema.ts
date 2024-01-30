import { z } from 'zod'

export const scheduleSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  comments: z.string().optional(),
  date: z.string(),
})
