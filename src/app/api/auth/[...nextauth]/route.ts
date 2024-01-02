import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

import { env } from '~/env'

const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar',
        },
      },
    }),
  ],
  callbacks: {
    signIn: async ({ account }) => {
      if (!account?.scope?.includes('https://www.googleapis.com/auth/calendar')) {
        return '/register/connect?error=permissions'
      }
      return true
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
