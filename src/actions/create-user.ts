'use server'

import { revalidatePath } from 'next/cache'

import { prisma } from '~/libs/prisma'
import { type CreateUser, createUserSchema } from '~/schemas/create-user'

export async function createUser(data: CreateUser) {
  const parsed = createUserSchema.safeParse(data)

  if (!parsed.success) {
    throw new Error(parsed.error.message)
  }

  const userExists = await prisma.user.findUnique({ where: { username: parsed.data.username } })

  if (userExists) {
    throw new Error('This user already exists.')
  }

  const user = await prisma.user.create({ data })
  revalidatePath('/users')

  return { user }
}
