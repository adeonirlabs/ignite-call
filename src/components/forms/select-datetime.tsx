'use client'

import type { ComponentProps } from 'react'

import { Calendar } from '~/components/ui/calendar'
import { cn } from '~/utils/classnames'

import { TimePicker } from '../ui/timepicker'

export function SelectDateTimeForm({ className, ...props }: ComponentProps<'section'>) {
  const isDateSelected = true

  return (
    <section
      className={cn(
        'relative grid w-full rounded-lg border border-zinc-200/10 bg-zinc-600/20',
        isDateSelected ? 'grid-cols-1 md:grid-cols-[1fr_20rem]' : 'max-w-xl grid-cols-1',
        className,
      )}
      {...props}
    >
      <Calendar className="p-6" />

      {isDateSelected ? (
        <TimePicker
          className={cn(
            'border-t border-zinc-600/40 p-6 md:border-l md:border-t-0',
            'absolute inset-y-0 right-0 w-80 overflow-y-auto',
          )}
        />
      ) : null}
    </section>
  )
}
