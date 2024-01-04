'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import type { ClaimUsername } from '~/schemas/claim-username'
import { claimUsernameSchema } from '~/schemas/claim-username'
import { cn } from '~/utils/classnames'
import { sleep } from '~/utils/sleep'

export function ClaimUsernameForm() {
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
    await sleep(500)
    router.push(`/register?username=${username}`)
  }

  useEffect(() => {
    if (username) {
      setValue('username', username.toLowerCase())
    }
  }, [username, setValue])

  return (
    <form className="flex max-w-lg flex-col gap-2 p-4 md:flex-row" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control w-full">
        <div
          className={cn(
            'input input-bordered flex w-full items-center gap-2',
            errors.username ? 'input-error' : 'input-accent',
          )}
        >
          <span className="text-accent/40">call.me/</span>
          <input
            className="h-full w-full bg-transparent placeholder:text-zinc-300/50"
            placeholder="Nome de usuário"
            type="text"
            {...register('username')}
          />
        </div>
        {errors.username ? (
          <span className="label label-text-alt pb-0 text-red-400">{errors.username?.message}</span>
        ) : null}
      </div>
      <button className="btn btn-accent w-32" disabled={isSubmitting} type="submit">
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
