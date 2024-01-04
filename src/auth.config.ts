import type { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'

import { env } from '~/env'

export const authConfig = {
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
} satisfies NextAuthConfig
