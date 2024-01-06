import { z } from 'zod'

export const profileSchema = z.object({
  bio: z.string(),
})

export type Profile = z.infer<typeof profileSchema>
