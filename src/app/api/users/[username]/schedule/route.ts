import type { NextRequest } from 'next/server'

import { dayjs } from '~/lib/dayjs'
import { prisma } from '~/lib/prisma'

import { scheduleSchema } from './schema'

export async function POST(request: NextRequest, { params }: { params: { username: string } }) {
  const { username } = params
  const user = await prisma.user.findUnique({ where: { username } })

  if (!user) {
    return Response.json({ message: 'User not found' }, { status: 404 })
  }

  const body = await request.json()
  const parsed = scheduleSchema.safeParse(body)

  if (!parsed.success) {
    return Response.json({ message: 'Invalid body' }, { status: 400 })
  }

  const { name, email, comments, date } = parsed.data

  const scheduleDate = dayjs(date).startOf('hour')

  if (scheduleDate.isBefore(dayjs())) {
    return Response.json({ message: 'Invalid date' }, { status: 400 })
  }

  const conflictDate = await prisma.schedule.findFirst({
    where: {
      userId: user.id,
      date: scheduleDate.toDate(),
    },
  })

  if (conflictDate) {
    return Response.json({ message: 'Date already scheduled' }, { status: 400 })
  }

  await prisma.schedule.create({
    data: {
      name,
      email,
      comments,
      date: scheduleDate.toDate(),
      userId: user.id,
    },
  })

  return Response.json(null, { status: 201 })
}
