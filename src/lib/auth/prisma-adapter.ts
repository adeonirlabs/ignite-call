import type { Adapter } from '@auth/core/adapters'
import { PrismaAdapter as AuthPrismaAdapter } from '@auth/prisma-adapter'
import { cookies } from 'next/headers'

import { prisma } from '~/lib/prisma'

export const PrismaAdapter = (): Adapter => {
  return {
    ...AuthPrismaAdapter(prisma),
    createUser: async ({ name, email, image, bio }) => {
      const cookieId = cookies().get('ignite-call.user-id')?.value

      if (cookieId === undefined) {
        throw new Error('User ID not found.')
      }

      const user = await prisma.user.update({
        where: { id: cookieId },
        data: {
          name: name!,
          email,
          image,
          bio,
        },
      })

      cookies().delete('ignite-call.user-id')

      return {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email!,
        image: user.image,
        bio: user.bio || '',
        emailVerified: null,
      }
    },
    getUser: async id => {
      const user = await prisma.user.findUnique({ where: { id } })

      if (!user) {
        return null
      }

      return {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email!,
        image: user.image,
        bio: user.bio || '',
        emailVerified: null,
      }
    },
    getUserByEmail: async email => {
      const user = await prisma.user.findUnique({ where: { email } })

      if (!user) {
        return null
      }

      return {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email!,
        image: user.image,
        bio: user.bio || '',
        emailVerified: null,
      }
    },
    getUserByAccount: async providerAccountId => {
      const account = await prisma.account.findUnique({
        where: { provider_providerAccountId: providerAccountId },
        include: { user: true },
      })

      if (!account) {
        return null
      }

      const { user } = account
      return {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email!,
        image: user.image,
        bio: user.bio || '',
        emailVerified: null,
      }
    },
    updateUser: async ({ id, name, email, image }) => {
      const user = await prisma.user.update({
        where: { id: id },
        data: { name: name!, email, image },
      })
      return {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email!,
        image: user.image,
        bio: user.bio || '',
        emailVerified: null,
      }
    },
    linkAccount: async account => {
      await prisma.account.create({
        data: {
          userId: account.userId,
          type: account.type,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          refreshToken: account.refresh_token,
          accessToken: account.access_token,
          expiresAt: account.expires_at,
          tokenType: account.token_type,
          scope: account.scope,
          idToken: account.id_token,
          sessionState: account.session_state?.toString(),
        },
      })
    },
    getSessionAndUser: async sessionToken => {
      const session = await prisma.session.findUnique({
        where: { sessionToken },
        include: { user: true },
      })

      if (!session) {
        return null
      }

      const { user, userId, expires } = session
      return {
        session: { userId, expires, sessionToken },
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          email: user.email!,
          image: user.image,
          bio: user.bio || '',
          emailVerified: null,
        },
      }
    },
  }
}
