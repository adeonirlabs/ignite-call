'use server'

import { revalidatePath } from 'next/cache'

import { auth } from '~/auth'
import { prisma } from '~/lib/prisma'
import type { Profile } from '~/schemas/profile'
import { profileSchema } from '~/schemas/profile'

export async function updateProfile(data: Profile) {
  const session = await auth()

  if (!session || !session.user) {
    throw new Error('You must be logged in to create time intervals.')
  }

  const parsed = profileSchema.safeParse(data)

  if (!parsed.success) {
    throw new Error(parsed.error.message)
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      bio: parsed.data.bio,
    },
  })
  revalidatePath('/register/profile')
}
