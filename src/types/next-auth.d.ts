import NextAuth from 'next-auth'

declare module '@auth/core/types' {
  interface User {
    username: string
  }
}

declare module 'next-auth' {
  interface Session {
    user: User
  }
}
