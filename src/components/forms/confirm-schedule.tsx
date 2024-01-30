'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react'
import { useParams } from 'next/navigation'
import type { ComponentProps } from 'react'
import { useForm } from 'react-hook-form'

import { dayjs } from '~/lib/dayjs'
import { useCreateScheduleMutation } from '~/queries/schedule'
import type { ConfirmSchedule } from '~/schemas/confirm-schedule'
import { confirmScheduleSchema } from '~/schemas/confirm-schedule'
import { cn } from '~/utils/classnames'

interface ConfirmScheduleFormProps extends ComponentProps<'section'> {
  scheduleDate: Date
  onPrevStep: () => void
}

export function ConfirmScheduleForm({ scheduleDate, onPrevStep, className, ...props }: ConfirmScheduleFormProps) {
  const date = dayjs(scheduleDate).format('D [de] MMMM [de] YYYY')
  const hour = dayjs(scheduleDate).format('HH:mm')

  const { username } = useParams<{ username: string }>()

  const { mutateAsync: createSchedule, isPending } = useCreateScheduleMutation()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmSchedule>({
    resolver: zodResolver(confirmScheduleSchema),
  })

  const onSubmit = async (data: ConfirmSchedule) => {
    const { name, email, comments } = data
    createSchedule({ username, name, email, comments, date: scheduleDate.toString() }).then(() => onPrevStep())
  }

  return (
    <section className={cn('w-128 rounded-lg border border-zinc-200/10', className)} {...props}>
      <header className="flex items-center gap-8 border-b border-zinc-600/40 p-6">
        <div className="flex items-center gap-2">
          <Calendar className="text-zinc-500" size={20} />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="text-zinc-500" size={20} />
          <span>{hour}</span>
        </div>
      </header>

      <form className="flex flex-col gap-4 p-6" id="confirm-schedule" onSubmit={handleSubmit(onSubmit)}>
        <label className="form-control w-full">
          <span className="label label-text">Nome completo</span>
          <input
            className={cn('input input-bordered input-accent w-full placeholder:text-zinc-300/50')}
            placeholder="Seu nome"
            type="text"
            {...register('name')}
          />
          {errors.name ? <span className="label-error label">{errors.name.message}</span> : null}
        </label>
        <label className="form-control w-full">
          <span className="label label-text">Endereço de e-mail</span>
          <input
            className={cn('input input-bordered input-accent w-full placeholder:text-zinc-300/50')}
            placeholder="seu@email.com"
            type="email"
            {...register('email')}
          />
          {errors.email ? <span className="label-error label">{errors.email.message}</span> : null}
        </label>
        <label className="form-control w-full">
          <span className="label label-text">Observações</span>
          <textarea
            className="textarea textarea-bordered textarea-accent placeholder:text-zinc-300/50"
            placeholder="Anote alguma observação sobre a reunião"
            rows={5}
            {...register('comments')}
          />
          {errors.comments ? <span className="label-error label">{errors.comments.message}</span> : null}
        </label>
      </form>
      <footer className="flex items-center justify-end gap-4 border-t border-zinc-600/40 p-6">
        <button className="btn btn-outline" disabled={isSubmitting || isPending} onClick={onPrevStep} type="button">
          <ArrowLeft />
          Voltar
        </button>
        <button className="btn btn-accent" disabled={isSubmitting || isPending} form="confirm-schedule" type="submit">
          {isSubmitting || isPending ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <>
              Confirmar
              <ArrowRight />
            </>
          )}
        </button>
      </footer>
    </section>
  )
}
