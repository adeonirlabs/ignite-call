import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { ComponentProps } from 'react'

import { cn } from '~/utils/classnames'
import { getWeekDays } from '~/utils/datetime'

export function Calendar({ className, ...props }: ComponentProps<'article'>) {
  const weekDays = getWeekDays({ short: true })

  const arrowStyles = cn(
    'rounded text-zinc-400 transition hover:text-accent focus:outline-none',
    'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-800',
  )

  return (
    <article className={cn('flex flex-col gap-6', className)} {...props}>
      <header className="flex items-center justify-between">
        <strong className="text-lg font-semibold">
          Janeiro <span className="text-base font-normal text-zinc-400">2024</span>
        </strong>
        <div className="flex items-center gap-2">
          <button className={arrowStyles} type="button">
            <ArrowLeft size={20} />
          </button>
          <button className={arrowStyles} type="button">
            <ArrowRight size={20} />
          </button>
        </div>
      </header>
      <table className="w-full table-fixed border-spacing-1">
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
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <DayButton disabled>1</DayButton>
            </td>
            <td>
              <DayButton>2</DayButton>
            </td>
            <td>
              <DayButton>3</DayButton>
            </td>
          </tr>
        </tbody>
      </table>
    </article>
  )
}

const DayButton = ({ className, ...props }: ComponentProps<'button'>) => (
  <button
    className={cn(
      'flex aspect-square w-full items-center justify-center rounded p-2 text-center',
      'bg-zinc-700 transition enabled:hover:bg-zinc-600',
      'disabled:cursor-default disabled:bg-zinc-500/20 disabled:opacity-40',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
      className,
    )}
    type="button"
    {...props}
  />
)
