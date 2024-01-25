import type { NextRequest } from 'next/server'

import { dayjs } from '~/lib/dayjs'
import { prisma } from '~/lib/prisma'

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
  const searchParams = request.nextUrl.searchParams
  const queryDate = searchParams.get('date')

  if (!queryDate) {
    return Response.json({ message: 'Missing date' }, { status: 400 })
  }

  const { username } = params
  const user = await prisma.user.findUnique({ where: { username } })

  if (!user) {
    return Response.json({ message: 'User not found' }, { status: 404 })
  }

  const date = dayjs(String(queryDate))
  const isPastDate = date.isBefore(dayjs(), 'day')

  if (isPastDate) {
    return Response.json({ possibleTimes: [], availableTimes: [] })
  }

  const timeIntervals = await prisma.timeInterval.findFirst({ where: { userId: user.id, weekDay: date.get('day') } })

  if (!timeIntervals) {
    return Response.json({ possibleTimes: [], availableTimes: [] })
  }

  const { startTime, endTime } = timeIntervals
  const startHour = startTime / 60
  const endHour = endTime / 60

  const possibleTimes = Array(endHour - startHour)
    .fill(0)
    .map((_, index) => startHour + index)

  const blocketTimes = await prisma.schedule.findMany({
    select: { date: true },
    where: {
      userId: user.id,
      date: {
        gte: date.set('hour', startHour).toDate(),
        lte: date.set('hour', endHour).toDate(),
      },
    },
  })

  const availableTimes = possibleTimes.filter(
    time => !blocketTimes.some(blocketTime => dayjs(blocketTime.date).get('hour') === time),
  )

  return Response.json({ possibleTimes, availableTimes })
}
