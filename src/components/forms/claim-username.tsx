'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { ComponentProps } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import type { ClaimUsername } from '~/schemas/claim-username'
import { claimUsernameSchema } from '~/schemas/claim-username'
import { cn } from '~/utils/classnames'

interface ClaimUsernameFormProps extends ComponentProps<'form'> {}

export function ClaimUsernameForm({ className, ...props }: ClaimUsernameFormProps) {
  const router = useRouter()

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

  const onSubmit = async (data: ClaimUsername) => {
    const { username } = data

    return new Promise(resolve => {
      setTimeout(() => resolve(null), 500)
    }).then(() => {
      router.push(`/register?username=${username}`)
    })
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
      </div>
      <button className="btn-accent btn w-32" disabled={isSubmitting} type="submit">
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
