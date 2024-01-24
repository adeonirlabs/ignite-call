import type { ComponentProps } from 'react'

import { cn } from '~/utils/classnames'

export function TimePicker({ className, ...props }: ComponentProps<'aside'>) {
  return (
    <aside className={cn('flex flex-col gap-6', className)} {...props}>
      <h2 className="text-lg font-semibold">
        quarta-feira <span className="text-base font-normal text-zinc-400">20 de janeiro</span>
      </h2>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-1">
        <li>
          <TimeButton disabled>9:00</TimeButton>
        </li>
        <li>
          <TimeButton>10:00</TimeButton>
        </li>
        <li>
          <TimeButton>11:00</TimeButton>
        </li>
        <li>
          <TimeButton>12:00</TimeButton>
        </li>
        <li>
          <TimeButton>13:00</TimeButton>
        </li>
      </ul>
    </aside>
  )
}

const TimeButton = ({ className, ...props }: ComponentProps<'button'>) => (
  <button
    className={cn(
      'flex w-full items-center justify-center rounded p-1 text-center',
      'bg-zinc-900/30 transition enabled:hover:bg-zinc-600/30',
      'disabled:cursor-default disabled:bg-zinc-500/10 disabled:opacity-40',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
      className,
    )}
    type="button"
    {...props}
  />
)
