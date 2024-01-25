import dayjs from 'dayjs'
import { type ComponentProps } from 'react'

import { cn } from '~/utils/classnames'

interface TimePickerProps extends ComponentProps<'aside'> {
  selectedDate: Date
}

export function TimePicker({ selectedDate, className, ...props }: TimePickerProps) {
  // const [activeTime, setActiveTime] = useState<Date | null>(null)

  const weekDay = dayjs(selectedDate).format('dddd')
  const dateAndMonth = dayjs(selectedDate).format('D[ de ]MMMM')

  return (
    <aside className={cn('flex flex-col gap-6', className)} {...props}>
      <h2 className="text-lg font-semibold">
        {weekDay} <span className="text-base font-normal text-zinc-400">{dateAndMonth}</span>
      </h2>
      <div className="grid grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-1">
        <TimeButton disabled>8:00</TimeButton>
        <TimeButton disabled>9:00</TimeButton>
        <TimeButton>10:00</TimeButton>
        <TimeButton>11:00</TimeButton>
        <TimeButton>12:00</TimeButton>
        <TimeButton>13:00</TimeButton>
        <TimeButton>14:00</TimeButton>
        <TimeButton>15:00</TimeButton>
        <TimeButton>16:00</TimeButton>
        <TimeButton>17:00</TimeButton>
        <TimeButton>18:00</TimeButton>
        <TimeButton>19:00</TimeButton>
        <TimeButton>20:00</TimeButton>
      </div>
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
