'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'

import { createTimeIntervalsAction } from '~/actions/create-time-intervals'
import type { TimeIntervals, TimeIntervalsData } from '~/schemas/time-intervals'
import { timeIntervalsSchema } from '~/schemas/time-intervals'
import { getWeekDays } from '~/utils/datetime'
import { sleepTime } from '~/utils/sleep'

export function TimeIntervalsForm() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    getValues,
    formState: { isSubmitting, errors },
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
  const isValid = getValues('intervals').some(interval => interval.enabled)

  const onSubmit = async (data: unknown) => {
    const formData = data as TimeIntervalsData

    try {
      await createTimeIntervalsAction(formData)
      await sleepTime(500)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="flex flex-col divide-y divide-zinc-200/10 rounded border border-zinc-200/10">
        {fields.map((field, index) => (
          <div className="flex justify-between px-4 py-3" key={field.id}>
            <label className="label cursor-pointer gap-4">
              <input className="checkbox-accent checkbox" type="checkbox" {...register(`intervals.${index}.enabled`)} />
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
      {errors.intervals ? <span className="label-error label">{errors.intervals.root?.message}</span> : null}
      <button className="btn btn-accent mt-2" disabled={isSubmitting || !isValid} type="submit">
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
