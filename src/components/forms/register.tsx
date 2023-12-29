'use client'

import { ArrowRight } from 'lucide-react'
import { type ComponentProps } from 'react'
import { useFormContext } from 'react-hook-form'

import type { Register } from '~/schemas/register'
import { cn } from '~/utils/classnames'

interface RegisterFormProps extends ComponentProps<'form'> {}

export function RegisterForm({ className, ...props }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormContext<Register>()

  const onSubmit = (data: Register) => {
    console.info({ data, isSubmitting })
  }

  return (
    <form
      className={cn('flex flex-col gap-4 rounded-lg border border-zinc-200/10 bg-zinc-600/20 p-4', className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <label className="form-control w-full">
        <span className="label label-text">Nome de usuário</span>
        <input
          className={cn('input-bordered input w-full', errors.username ? 'input-error' : 'input-accent')}
          placeholder="Seu usuário"
          type="text"
          {...register('username')}
        />
        {errors.username ? <span className="label-error label">{errors.username?.message}</span> : null}
      </label>
      <label className="form-control w-full">
        <span className="label label-text">Nome completo</span>
        <input
          className={cn('input-bordered input w-full', errors.fullName ? 'input-error' : 'input-accent')}
          placeholder="Seu nome"
          type="text"
          {...register('fullName')}
        />
        {errors.fullName ? <span className="label-error label">{errors.fullName?.message}</span> : null}
      </label>
      <button className="btn-accent btn mt-2" disabled={isSubmitting} type="submit">
        {isSubmitting ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <>
            Reservar
            <ArrowRight />
          </>
        )}
      </button>
    </form>
  )
}
