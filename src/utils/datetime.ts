import type { Dayjs } from 'dayjs'

interface WeekDaysParams {
  short?: boolean
}

export const getWeekDays = ({ short = false }: WeekDaysParams = {}) => {
  return Array.from(Array(7).keys())
    .map(day => new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(new Date(2021, 0, day + 3)))
    .map(day => (short ? day.charAt(0).toUpperCase() + day.slice(1, 3) : day.charAt(0).toUpperCase() + day.slice(1)))
}

interface MonthWeeksParams {
  month: Dayjs
}

interface MonthWeek {
  week: number
  days: {
    date: Dayjs
    disabled: boolean
  }[]
}

type MonthWeeks = MonthWeek[]

export const getMonthWeeks = ({ month }: MonthWeeksParams): MonthWeeks => {
  const startOfMonth = month.startOf('month')
  const endOfMonth = month.endOf('month')
  const monthArray = Array(month.daysInMonth())
    .fill(0)
    .map((_, index) => startOfMonth.add(index, 'day'))

  const createDisabledDays = (start: Dayjs, end: Dayjs) =>
    Array(end.diff(start, 'day') + 1)
      .fill(0)
      .map((_, index) => ({ date: start.add(index, 'day'), disabled: true }))

  const previewsDays = createDisabledDays(
    startOfMonth.subtract(1, 'day').startOf('week'),
    startOfMonth.subtract(1, 'day'),
  )
  const nextDays = createDisabledDays(endOfMonth.add(1, 'day'), endOfMonth.add(1, 'day').endOf('week'))

  const days = [...previewsDays, ...monthArray.map(date => ({ date, disabled: false })), ...nextDays]
  const weeks = Array(Math.ceil(days.length / 7))
    .fill(0)
    .map((_, index) => ({ week: index + 1, days: days.slice(index * 7, (index + 1) * 7) }))

  return weeks
}

export const convertTimeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}
