import { google } from 'googleapis'

import { env } from '~/env'

import { dayjs } from './dayjs'
import { prisma } from './prisma'

export const getGoogleToken = async (userId: string) => {
  const account = await prisma.account.findFirstOrThrow({ where: { userId, provider: 'google' } })

  const auth = new google.auth.OAuth2({
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
  })

  auth.setCredentials({
    access_token: account.accessToken,
    refresh_token: account.refreshToken,
    expiry_date: account.expiresAt ? account.expiresAt * 1000 : null,
  })

  if (!account.expiresAt) return auth

  const isTokenExpired = dayjs(account.expiresAt * 1000).isBefore(dayjs())

  if (isTokenExpired) {
    const { credentials } = await auth.refreshAccessToken()

    await prisma.account.update({
      where: { id: account.id },
      data: {
        refreshToken: credentials.refresh_token,
        accessToken: credentials.access_token,
        expiresAt: credentials.expiry_date ? Math.floor(credentials.expiry_date / 1000) : null,
        tokenType: credentials.token_type,
        scope: credentials.scope,
        idToken: credentials.id_token,
      },
    })

    auth.setCredentials({
      access_token: credentials.access_token,
      refresh_token: credentials.refresh_token,
      expiry_date: credentials.expiry_date,
    })
  }

  return auth
}
