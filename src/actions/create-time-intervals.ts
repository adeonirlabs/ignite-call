'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { auth } from '~/auth'
import { prisma } from '~/lib/prisma'
import type { TimeIntervalsData } from '~/schemas/time-intervals'

export const timeIntervalsSchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTime: z.number(),
      endTime: z.number(),
    }),
  ),
})

export async function createTimeIntervals(data: TimeIntervalsData) {
  const session = await auth()

  if (!session || !session.user) {
    throw new Error('You must be logged in to create time intervals.')
  }

  const parsed = timeIntervalsSchema.safeParse(data)

  if (!parsed.success) {
    throw new Error(parsed.error.message)
  }

  await Promise.all(
    parsed.data.intervals.map(async interval =>
      prisma.timeInterval.create({
        data: {
          ...interval,
          userId: session.user.id,
        },
      }),
    ),
  )
  revalidatePath('/register/agenda')
}
