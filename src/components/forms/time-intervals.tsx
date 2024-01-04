'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'

import type { TimeIntervals } from '~/schemas/time-intervals'
import { timeIntervalsSchema } from '~/schemas/time-intervals'
import { getWeekDays } from '~/utils/datetime'

export function TimeIntervalsForm() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<TimeIntervals>({
    resolver: zodResolver(timeIntervalsSchema),
    defaultValues: {
      intervals: [
        { day: 0, enabled: false, start: '09:00', end: '17:00' },
        { day: 1, enabled: true, start: '09:00', end: '17:00' },
        { day: 2, enabled: true, start: '09:00', end: '17:00' },
        { day: 3, enabled: true, start: '09:00', end: '17:00' },
        { day: 4, enabled: true, start: '09:00', end: '17:00' },
        { day: 5, enabled: true, start: '09:00', end: '17:00' },
        { day: 6, enabled: false, start: '09:00', end: '17:00' },
      ],
    },
  })

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  const weekDays = getWeekDays()
  const intervals = watch('intervals')

  const onSubmit = (data: TimeIntervals) => {
    console.log(data)
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="flex flex-col divide-y divide-zinc-200/10 rounded-lg border border-zinc-200/10">
        {fields.map((field, index) => (
          <div className="flex justify-between px-4 py-3" key={field.id}>
            <label className="label cursor-pointer gap-2">
              <Controller
                control={control}
                name={`intervals.${index}.enabled`}
                render={({ field: { onChange, value } }) => (
                  <input checked={value} className="checkbox-accent checkbox" onChange={onChange} type="checkbox" />
                )}
              />
              <span className="text-zinc-100">{weekDays[field.day]}</span>
            </label>
            <div className="flex items-center gap-4">
              <input
                className="input input-accent input-sm"
                disabled={intervals[index].enabled === false}
                step={60}
                type="time"
                {...register(`intervals.${index}.start`)}
              />
              <input
                className="input input-accent input-sm"
                disabled={intervals[index].enabled === false}
                step={60}
                type="time"
                {...register(`intervals.${index}.end`)}
              />
            </div>
          </div>
        ))}
      </fieldset>
      <button className="btn btn-accent mt-2" disabled={isSubmitting} type="submit">
        {isSubmitting ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <>
            Próximo passo
            <ArrowRight />
          </>
        )}
      </button>
    </form>
  )
}