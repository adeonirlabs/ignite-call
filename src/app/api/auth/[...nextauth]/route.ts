import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

import { env } from '~/env'

const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
