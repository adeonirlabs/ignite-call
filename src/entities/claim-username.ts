import { z } from 'zod'

const claimUsername = {
  username: z.string(),
}

export const claimUsernameSchema = z.object(claimUsername)
export type ClaimUsername = z.infer<typeof claimUsernameSchema>
