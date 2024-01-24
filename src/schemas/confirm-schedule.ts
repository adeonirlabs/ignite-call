import { z } from 'zod'

export const confirmScheduleSchema = z.object({
  name: z
    .string()
    .regex(
      /^[a-zA-Z]{2,}\s[a-zA-Z]{2,}$/,
      'O nome completo deve conter pelo menos duas palavras com no mínimo 3 caracteres cada.',
    ),
  email: z.string().email('O email deve ser válido.'),
  comments: z.string().optional(),
})

export type ConfirmSchedule = z.infer<typeof confirmScheduleSchema>
