import { envSchema } from './validation'

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('Invalid environment variables.', parsed.error.format())
  throw new Error(`Invalid environment variables.`)
}

export const env = parsed.data
