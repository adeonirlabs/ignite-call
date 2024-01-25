'use client'

import dayjs from 'dayjs'
import type { ComponentProps } from 'react'
import { useEffect, useState } from 'react'

import { cn } from '~/utils/classnames'

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

interface TimePickerProps extends ComponentProps<'aside'> {
  availability: Availability
  selectedDate: Date
}

export function TimePicker({ availability, selectedDate, className, ...props }: TimePickerProps) {
  const [activeTime, setActiveTime] = useState<Date | null>(null)

  const weekDay = dayjs(selectedDate).format('dddd')
  const dateAndMonth = dayjs(selectedDate).format('D[ de ]MMMM')

  const handleSelectTime = (date: Date) => {
    setActiveTime(date)
  }

  useEffect(() => setActiveTime(null), [selectedDate])

  return (
    <aside className={cn('flex flex-col gap-6', className)} {...props}>
      <h2 className="text-lg font-semibold">
        {weekDay} <span className="text-base font-normal text-zinc-400">{dateAndMonth}</span>
      </h2>
      <div className="grid grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-1">
        {availability.possibleTimes.map(time => {
          const isActive = time === dayjs(activeTime).hour()
          return (
            <TimeButton
              className={cn(isActive && 'bg-accent text-zinc-900 enabled:hover:bg-accent/90')}
              disabled={!availability.availableTimes.includes(time)}
              key={time}
              onClick={() => handleSelectTime(dayjs(selectedDate).hour(time).toDate())}
            >
              {String(time).padStart(2, '0')}:00
            </TimeButton>
          )
        })}
      </div>
    </aside>
  )
}

const TimeButton = ({ className, ...props }: ComponentProps<'button'>) => (
  <button
    className={cn(
      'flex w-full items-center justify-center rounded p-1 text-center',
      'bg-zinc-700/50 transition focus:outline-none enabled:hover:bg-zinc-600/50',
      'disabled:cursor-default disabled:bg-zinc-500/20 disabled:opacity-40',
      'focus:outline-none focus:outline-offset-0 focus-visible:outline-4 focus-visible:outline-accent/30',
      className,
    )}
    type="button"
    {...props}
  />
)
