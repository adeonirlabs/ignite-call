import NextAuth from 'next-auth'

import { authConfig } from '~/auth.config'
import { PrismaAdapter } from '~/lib/auth/prisma-adapter'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  adapter: PrismaAdapter(),
  callbacks: {
    async signIn({ account }) {
      if (!account?.scope?.includes('https://www.googleapis.com/auth/calendar')) {
        return false
      }
      return true
    },
  },
  pages: {
    error: '/auth/error',
  },
  ...authConfig,
})
