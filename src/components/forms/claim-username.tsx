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
    formState: { errors },
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
        'relative flex max-w-lg flex-col gap-2 p-4 md:flex-row',
        'rounded-lg border border-zinc-200/10 bg-zinc-600/20',
        className,
      )}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <div className="flex w-full flex-col gap-2">
        <input
          className="input-bordered input-accent input w-full"
          placeholder="Nome de usuário"
          type="text"
          {...register('username')}
        />
      </div>
      <button className="btn-accent btn" type="submit">
        Reservar
        <ArrowRight />
      </button>
      {errors.username ? (
        <span className="absolute -bottom-6 -left-0 text-xs text-red-400">{errors.username?.message}</span>
      ) : null}
    </form>
  )
}
