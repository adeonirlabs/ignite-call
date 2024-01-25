'use client'

import { useParams } from 'next/navigation'
import type { ComponentProps } from 'react'
import { useState } from 'react'

import { useListAvailabilitiesQuery } from '~/app/queries/availability'
import { Calendar } from '~/components/ui/calendar'
import { TimePicker } from '~/components/ui/timepicker'
import { dayjs } from '~/lib/dayjs'
import { cn } from '~/utils/classnames'

export function SelectDateTimeForm({ className, ...props }: ComponentProps<'section'>) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const { username } = useParams<{ username: string }>()
  const date = selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : undefined

  const { data: availability } = useListAvailabilitiesQuery({ username, date })

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date)
  }

  return (
    <section
      className={cn(
        'relative grid w-full rounded-lg border border-zinc-200/10 bg-zinc-600/20',
        selectedDate ? 'grid-cols-1 md:grid-cols-[1fr_20rem]' : 'max-w-xl grid-cols-1',
        className,
      )}
      {...props}
    >
      <Calendar className="p-6" onSelectDate={handleSelectDate} selectedDate={selectedDate} />

      {selectedDate && availability ? (
        <TimePicker
          availability={availability}
          className={cn('absolute inset-y-0 right-0 w-80 border-t border-zinc-600/40 p-6 md:border-l md:border-t-0')}
          selectedDate={selectedDate}
        />
      ) : null}
    </section>
  )
}
