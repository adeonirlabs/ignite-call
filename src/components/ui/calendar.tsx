'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { type ComponentProps, useMemo, useState } from 'react'

import { dayjs } from '~/lib/dayjs'
import { cn } from '~/utils/classnames'
import { getMonthWeeks, getWeekDays } from '~/utils/datetime'

interface CalendarProps extends ComponentProps<'article'> {
  selectedDate: Date | null
  onSelectDate: (date: Date) => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Calendar({ selectedDate, onSelectDate, className, ...props }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => dayjs().set('date', 1))
  const [activeDate, setActiveDate] = useState<Date | null>(null)

  const weekDays = getWeekDays({ short: true })
  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const monthWeeks = useMemo(() => getMonthWeeks({ month: currentDate }), [currentDate])

  const handlePrevMonth = () => {
    setCurrentDate(state => state.subtract(1, 'month'))
  }

  const handleNextMonth = () => {
    setCurrentDate(state => state.add(1, 'month'))
  }

  const handleSelectDate = (date: Date) => {
    onSelectDate(date)
    setActiveDate(date)
  }

  const arrowButtonStyles = cn(
    'rounded text-zinc-400 transition hover:text-accent focus:outline-none',
    'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
    'focus-visible:ring-offset-zinc-800',
  )

  const dayButtonStyles = cn(
    'flex aspect-square w-full items-center justify-center rounded p-2 text-center',
    'bg-zinc-700 transition enabled:hover:bg-zinc-600',
    'disabled:cursor-default disabled:bg-zinc-500/20 disabled:opacity-40',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
  )

  return (
    <article className={cn('flex flex-col gap-6', className)} {...props}>
      <header className="flex items-center justify-between">
        <strong className="text-lg font-semibold capitalize">
          {currentMonth} <span className="text-base font-normal text-zinc-400">{currentYear}</span>
        </strong>
        <div className="flex items-center gap-2">
          <button className={arrowButtonStyles} onClick={handlePrevMonth} title="Mês anterior" type="button">
            <ArrowLeft size={20} />
          </button>
          <button className={arrowButtonStyles} onClick={handleNextMonth} title="Próximo mês" type="button">
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
              {days.map(({ date, disabled }) => {
                const isActive = dayjs(activeDate).isSame(date, 'day')
                return (
                  <td key={date.toString()}>
                    <button
                      className={cn(dayButtonStyles, isActive && 'bg-accent text-zinc-900 enabled:hover:bg-accent/90')}
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
