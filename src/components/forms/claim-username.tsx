'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import type { ComponentProps } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import type { ClaimUsername } from '~/entities/claim-username'
import { claimUsernameSchema } from '~/entities/claim-username'
import { cn } from '~/utils/classnames'

interface ClaimUsernameFormProps extends ComponentProps<'form'> {}

export function ClaimUsernameForm({ className, ...props }: ClaimUsernameFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsername>({
    resolver: zodResolver(claimUsernameSchema),
  })

  const username = watch('username')

  const onSubmit = (data: ClaimUsername) => {
    console.info(data)
  }

  useEffect(() => {
    if (username) {
      setValue('username', username.toLowerCase())
    }
  }, [username, setValue])

  return (
    <form
      className={cn(
        'flex max-w-lg flex-col gap-2 p-4 md:flex-row',
        'rounded-lg border border-zinc-200/10 bg-zinc-600/20',
        className,
      )}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <div className="form-control w-full">
        <input
          className={cn('input-bordered input-accent input w-full', errors.username ? 'input-error' : 'input-accent')}
          placeholder="Nome de usuário"
          type="text"
          {...register('username')}
        />
        {errors.username ? (
          <span className="label label-text-alt pb-0 text-red-400">{errors.username?.message}</span>
        ) : null}
      </div>
      <button className="btn-accent btn no-animation" disabled={isSubmitting} type="submit">
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
