'use client'

import type { ComponentProps } from 'react'

import { Calendar } from '~/components/ui/calendar'
import { cn } from '~/utils/classnames'

export function ScheduleForm({ className, ...props }: ComponentProps<'section'>) {
  return (
    <section
      className={cn('grid grid-cols-1 rounded-lg border border-zinc-200/10 bg-zinc-600/20', className)}
      {...props}
    >
      <Calendar className="p-6" />
    </section>
  )
}
