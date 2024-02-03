'use server'

import { cookies } from 'next/headers'

import { prisma } from '~/lib/prisma'
import type { CreateUser } from '~/schemas/create-user'
import { createUserSchema } from '~/schemas/create-user'

export async function createUser(data: CreateUser) {
  const parsed = createUserSchema.safeParse(data)

  if (!parsed.success) {
    throw new Error(parsed.error.message)
  }

  const userExists = await prisma.user.findUnique({ where: { username: parsed.data.username } })

  if (userExists) {
    throw new Error('This user already exists.')
  }

  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      username: parsed.data.username,
    },
  })
  cookies().set('ignite-call.user-id', user.id, { path: '/', maxAge: 60 * 60 * 24 * 30 }) // 30 days
}
