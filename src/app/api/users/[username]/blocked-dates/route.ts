import type { NextRequest } from 'next/server'

import { prisma } from '~/lib/prisma'

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
  const searchParams = request.nextUrl.searchParams
  const queryMonth = searchParams.get('month')
  const queryYear = searchParams.get('year')

  if (!queryMonth || !queryYear) {
    return Response.json({ message: 'Missing month or year' }, { status: 400 })
  }

  const { username } = params
  const user = await prisma.user.findUnique({ where: { username } })

  if (!user) {
    return Response.json({ message: 'User not found' }, { status: 404 })
  }

  const availableDays = await prisma.timeInterval.findMany({
    select: { weekDay: true },
    where: { userId: user.id },
  })

  const blockedWeekDays = Array.from({ length: 7 }, (_, i) => i).filter(
    weekDay => !availableDays.some(availableDay => availableDay.weekDay === weekDay),
  )

  const yearMonth = `${queryYear}-${queryMonth}`

  const rawDates: Array<{ date: number }> = await prisma.$queryRaw`
  SELECT
    EXTRACT(DAY FROM S.date) AS date,
    COUNT(S.date) AS count,
    (TI.end_time - TI.start_time) / 60 AS duration
  FROM
    schedules S
    LEFT JOIN time_intervals TI ON TI.week_day = WEEKDAY(DATE_ADD(S.date, INTERVAL 1 DAY))
  WHERE
    S.user_id = ${user.id}
    AND DATE_FORMAT(S.date, '%Y-%m') = ${yearMonth}
  GROUP BY
    EXTRACT(DAY FROM S.date),
    (TI.end_time - TI.start_time) / 60
  HAVING
    count >= duration
  `

  const blockedDates = rawDates.map(({ date }) => date)

  return Response.json({ blockedWeekDays, blockedDates })
}
