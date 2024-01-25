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

  const blockedDays = Array.from({ length: 7 }, (_, i) => i).filter(
    weekDay => !availableDays.some(availableDay => availableDay.weekDay === weekDay),
  )

  return Response.json(blockedDays)
}
