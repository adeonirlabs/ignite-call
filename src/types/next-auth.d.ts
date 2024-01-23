import NextAuth from 'next-auth'

declare module '@auth/core/types' {
  interface User {
    username: string
    bio: string
  }
}
declare module 'next-auth' {
  interface User {
    username: string
    bio: string
  }
  interface Session {
    user: User
  }
}
