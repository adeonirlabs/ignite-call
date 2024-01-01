import type { EnvSchema } from '../env/validation'

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvSchema {}
  }
}
