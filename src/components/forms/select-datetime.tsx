'use client'

import { ArrowRight } from 'lucide-react'
import { useParams } from 'next/navigation'
import type { ComponentProps } from 'react'
import { useEffect, useState } from 'react'

import { Calendar } from '~/components/modules/calendar'
import { TimePicker } from '~/components/modules/timepicker'
import { dayjs } from '~/lib/dayjs'
import { useListAvailabilitiesQuery } from '~/queries/availability'
import { cn } from '~/utils/classnames'

interface SelectDateTimeFormProps extends ComponentProps<'div'> {
  onNextStep: () => void
  onSelectDateTime: (date: Date | null) => void
}

export function SelectDateTimeForm({ onSelectDateTime, onNextStep, className, ...props }: SelectDateTimeFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<Date | null>(null)

  const { username } = useParams<{ username: string }>()

  const date = selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : undefined

  const { data: availability } = useListAvailabilitiesQuery({ username, date })

  const isSubmitting = false

  const handleSelectDate = (date: Date | null) => {
    setSelectedDate(date)
    setSelectedTime(null)
  }

  const handleSelectTime = (date: Date | null) => {
    setSelectedTime(date)
  }

  useEffect(() => {
    onSelectDateTime(selectedTime)
  }, [onSelectDateTime, selectedTime])

  return (
    <section className="w-full rounded-lg border border-zinc-200/10">
      <div
        className={cn(
          'relative grid',
          selectedDate ? 'grid-cols-1 md:grid-cols-[1fr_20rem]' : 'max-w-lg grid-cols-1',
          className,
        )}
        {...props}
      >
        <Calendar className="p-6" onSelectDate={handleSelectDate} />

        {selectedDate && availability ? (
          <TimePicker
            availability={availability}
            className={cn('absolute inset-y-0 right-0 w-80 border-t border-zinc-600/40 p-4 md:border-l md:border-t-0')}
            onSelectTime={handleSelectTime}
            selectedDate={selectedDate}
          />
        ) : null}
      </div>
      <footer className="flex items-center justify-end gap-4 border-t border-zinc-600/40 p-6">
        <button
          className="btn btn-accent"
          disabled={isSubmitting || !selectedTime}
          form="confirm-schedule"
          onClick={onNextStep}
          type="submit"
        >
          {isSubmitting ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <>
              Continuar
              <ArrowRight />
            </>
          )}
        </button>
      </footer>
    </section>
  )
}
