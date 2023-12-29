import { z } from 'zod'

const register = {
  username: z
    .string()
    .min(3, 'O nome de usuário deve ter pelo menos 3 caracteres.')
    .regex(/^[a-z\\-]*[a-z]$/i, 'O nome de usuário deve conter apenas letras e hifens e terminar com uma letra.')
    .transform(value => value.toLowerCase()),
  fullName: z
    .string()
    .min(3, 'O nome completo deve ter pelo menos 3 caracteres.')
    .regex(/\s/, 'O nome completo deve conter pelo menos um espaço em branco.'),
}

export const registerSchema = z.object(register)
export type Register = z.infer<typeof registerSchema>
