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
    async session({ session, user }) {
      return {
        ...session,
        user,
      }
    },
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === '/schedule') return !!auth
      return true
    },
  },
  pages: {
    error: '/auth/error',
  },
  ...authConfig,
})
