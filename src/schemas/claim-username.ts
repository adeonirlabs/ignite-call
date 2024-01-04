import { z } from 'zod'

export const claimUsernameSchema = z.object({
  username: z
    .string()
    .min(3, 'O nome de usuário deve ter pelo menos 3 caracteres.')
    .regex(/^[a-z\\-]*[a-z]$/i, 'O nome de usuário deve conter apenas letras e hifens e terminar com uma letra.')
    .transform(value => value.toLowerCase()),
})

export type ClaimUsername = z.infer<typeof claimUsernameSchema>
