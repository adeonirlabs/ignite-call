'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useParams } from 'next/navigation'
import type { ComponentProps } from 'react'
import { useMemo, useState } from 'react'

import { useListBlockedDatesQuery } from '~/app/queries/blocked-dates'
import { dayjs } from '~/lib/dayjs'
import { cn } from '~/utils/classnames'
import { getMonthWeeks, getWeekDays } from '~/utils/datetime'

interface CalendarProps extends ComponentProps<'article'> {
  selectedDate: Date | null
  onSelectDate: (date: Date | null) => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Calendar({ selectedDate, onSelectDate, className, ...props }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => dayjs().set('date', 1))
  const [activeDate, setActiveDate] = useState<Date | null>(null)

  const { username } = useParams<{ username: string }>()

  const weekDays = getWeekDays({ short: true })
  const monthName = currentDate.format('MMMM')
  const year = currentDate.format('YYYY')
  const month = currentDate.format('MM')

  const { data } = useListBlockedDatesQuery({ username, year, month })

  const monthWeeks = useMemo(
    () => getMonthWeeks({ currentDate, blockedWeekDays: data?.blockedWeekDays, blockedDates: data?.blockedDates }),
    [currentDate, data],
  )

  const handlePrevMonth = () => {
    setCurrentDate(state => state.subtract(1, 'month'))
  }

  const handleNextMonth = () => {
    setCurrentDate(state => state.add(1, 'month'))
  }

  const handleCurrentMonth = () => {
    setCurrentDate(dayjs().set('date', 1))
    onSelectDate(null)
    setActiveDate(null)
  }

  const handleSelectDate = (date: Date) => {
    onSelectDate(date)
    setActiveDate(date)
  }

  return (
    <article className={cn('flex flex-col gap-6', className)} {...props}>
      <header className="flex items-center justify-between">
        <strong className="text-lg font-semibold capitalize">
          {monthName} <span className="text-base font-normal text-zinc-400">{year}</span>
        </strong>
        <div className="flex items-center gap-2">
          <button
            className={cn(
              'rounded text-zinc-400 transition hover:text-accent focus:outline-none',
              'focus-visible:outline-4 focus-visible:outline-accent/30',
              'focus-visible:ring-offset-zinc-800',
            )}
            onClick={handlePrevMonth}
            title="Mês anterior"
            type="button"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            className={cn(
              'rounded text-zinc-400 transition hover:text-accent focus:outline-none',
              'focus-visible:outline-4 focus-visible:outline-accent/30',
              'focus-visible:ring-offset-zinc-800',
            )}
            onClick={handleCurrentMonth}
            type="button"
          >
            Mês atual
          </button>
          <button
            className={cn(
              'rounded text-zinc-400 transition hover:text-accent focus:outline-none',
              'focus-visible:outline-4 focus-visible:outline-accent/30',
              'focus-visible:ring-offset-zinc-800',
            )}
            onClick={handleNextMonth}
            title="Próximo mês"
            type="button"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </header>
      <table className="w-full table-fixed border-separate border-spacing-1">
        <thead>
          <tr>
            {weekDays.map(weekDay => (
              <th className="text-center font-medium uppercase text-zinc-400" key={weekDay}>
                {weekDay}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="before:block before:h-3">
          {monthWeeks.map(({ week, days }) => (
            <tr key={week}>
              {days.map(({ date, disabled, current }) => {
                const isActive = dayjs(activeDate).isSame(date, 'day')
                return (
                  <td key={date.toString()}>
                    <button
                      className={cn(
                        'flex aspect-square w-full items-center justify-center rounded p-2 text-center',
                        'bg-zinc-700 transition focus:outline-none enabled:hover:bg-zinc-600',
                        'disabled:cursor-default disabled:bg-zinc-500/25',
                        'focus:outline-offset-0 focus-visible:outline-4 focus-visible:outline-accent/30',
                        current ? 'disabled:opacity-40' : 'disabled:opacity-15',
                        isActive && 'bg-accent text-zinc-900 enabled:hover:bg-accent/90',
                      )}
                      disabled={disabled}
                      onClick={() => handleSelectDate(date.toDate())}
                      type="button"
                    >
                      {date.format('D')}
                    </button>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  )
}
