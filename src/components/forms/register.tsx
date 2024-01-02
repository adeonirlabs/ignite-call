'use client'

import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useFormContext } from 'react-hook-form'

import { createUser } from '~/actions/create-user'
import type { CreateUser } from '~/schemas/create-user'
import { cn } from '~/utils/classnames'
import { sleep } from '~/utils/sleep'

export function RegisterForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormContext<CreateUser>()

  const onSubmit = async (data: CreateUser) => {
    const { username, fullName } = data

    try {
      await createUser({ username, fullName })
      await sleep(500)
      router.push(`/register/connect`)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <label className="form-control w-full">
        <span className="label label-text">Nome de usuário</span>
        <div
          className={cn(
            'input input-bordered flex w-full items-center gap-2',
            errors.username ? 'input-error' : 'input-accent',
          )}
        >
          <span className="text-accent/40">call.me/</span>
          <input
            className="h-full w-full appearance-none bg-transparent placeholder:text-zinc-300/50"
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
          className={cn(
            'input input-bordered w-full placeholder:text-zinc-300/50',
            errors.fullName ? 'input-error' : 'input-accent',
          )}
          placeholder="Seu nome"
          type="text"
          {...register('fullName')}
        />
        {errors.fullName ? <span className="label-error label">{errors.fullName?.message}</span> : null}
      </label>
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
