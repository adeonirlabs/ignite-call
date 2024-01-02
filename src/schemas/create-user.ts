import { z } from 'zod'

const createUser = {
  username: z
    .string()
    .min(3, 'O nome de usuário deve ter pelo menos 3 caracteres.')
    .regex(/^[a-z\\-]*[a-z]$/i, 'O nome de usuário deve conter apenas letras e hifens e terminar com uma letra.')
    .transform(value => value.toLowerCase()),
  name: z
    .string()
    .min(3, 'O nome completo deve ter pelo menos 3 caracteres.')
    .regex(
      /^[a-zA-Z]{2,}\s[a-zA-Z]{2,}$/,
      'O nome completo deve conter pelo menos duas palavras com no mínimo 3 caracteres cada.',
    ),
}

export const createUserSchema = z.object(createUser)
export type CreateUser = z.infer<typeof createUserSchema>
