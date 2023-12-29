'use client'

import { ArrowRight } from 'lucide-react'
import { type ComponentProps } from 'react'
import { useFormContext } from 'react-hook-form'

import { createUser } from '~/actions/create-user'
import type { CreateUser } from '~/schemas/create-user'
import { cn } from '~/utils/classnames'

interface RegisterFormProps extends ComponentProps<'form'> {}

export function RegisterForm({ className, ...props }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormContext<CreateUser>()

  const onSubmit = async (data: CreateUser) => {
    const { username, fullName } = data

    try {
      await createUser({ username, fullName })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  return (
    <form
      className={cn('flex flex-col gap-4 rounded-lg border border-zinc-200/10 bg-zinc-600/20 p-4', className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <label className="form-control w-full">
        <div
          className={cn(
            'input-bordered input flex w-full items-center gap-2',
            errors.username ? 'input-error' : 'input-accent',
          )}
        >
          <span className="text-zinc-500">call.me/</span>
          <input
            className="h-full w-full appearance-none bg-transparent"
            placeholder="Nome de usuário"
            type="text"
            {...register('username')}
          />
        </div>
        {errors.username ? (
          <span className="label label-text-alt pb-0 text-red-400">{errors.username?.message}</span>
        ) : null}
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
            Próximo passo
            <ArrowRight />
          </>
        )}
      </button>
    </form>
  )
}
