import NextAuth from 'next-auth'

declare module '@auth/core/types' {
  interface User {
    username: string
  }
}
