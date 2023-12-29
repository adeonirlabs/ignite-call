'use server'

import { revalidatePath } from 'next/cache'

import { prisma } from '~/libs/prisma'
import type { CreateUser } from '~/schemas/create-user'

export async function createUser(data: CreateUser) {
  const userExists = await prisma.user.findUnique({ where: { username: data.username } })

  if (userExists) {
    throw new Error('This user already exists.')
  }

  const user = await prisma.user.create({ data })
  revalidatePath('/users')

  return { user }
}
