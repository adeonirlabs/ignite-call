'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import type { ComponentProps } from 'react'
import { useForm } from 'react-hook-form'

import type { Register } from '~/schemas/register'
import { registerSchema } from '~/schemas/register'
import { cn } from '~/utils/classnames'

interface RegisterFormProps extends ComponentProps<'form'> {}

export function RegisterForm({ className, ...props }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Register>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = (data: Register) => {
    console.info(data)
  }

  return (
    <form
      className={cn('flex flex-col gap-4 rounded-lg border border-zinc-200/10 bg-zinc-600/20 p-4', className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <label className="form-control w-full">
        <span className="label label-text pt-0">Nome de usuário</span>
        <input
          className={cn('input-bordered input w-full', errors.username ? 'input-error' : 'input-accent')}
          placeholder="Seu usuário"
          type="text"
          {...register('username')}
        />
        {errors.username ? (
          <span className="label label-text-alt pb-0 text-red-400">{errors.username?.message}</span>
        ) : null}
      </label>
      <label className="form-control w-full">
        <span className="label label-text pt-0">Nome completo</span>
        <input
          className={cn('input-bordered input w-full', errors.fullName ? 'input-error' : 'input-accent')}
          placeholder="Seu nome"
          type="text"
          {...register('fullName')}
        />
        {errors.username ? (
          <span className="label label-text-alt pb-0 text-red-400">{errors.fullName?.message}</span>
        ) : null}
      </label>
      <button className="btn-accent btn no-animation mt-2" disabled={isSubmitting} type="submit">
        {isSubmitting ? (
          <span className="loading loading-spinner text-accent"></span>
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
