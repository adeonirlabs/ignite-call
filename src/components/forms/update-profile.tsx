'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'

import type { Profile } from '~/schemas/profile'
import { profileSchema } from '~/schemas/profile'

export function UpdateProfileForm() {
  const session = useSession()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Profile>({
    resolver: zodResolver(profileSchema),
  })

  const onSubmit = async (data: Profile) => {
    console.info(data)
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control w-full">
        <span className="label label-text">Foto de perfil</span>
        <Image
          alt={session.data?.user.name}
          className="rounded-full"
          height={64}
          src={session.data?.user.image}
          width={64}
        />
      </div>
      <div className="form-control w-full">
        <span className="label label-text">Sobre você</span>
        <textarea
          className="textarea textarea-bordered textarea-accent placeholder:text-zinc-300/50"
          placeholder="Bio"
          rows={5}
          {...register('bio')}
        />
        <span className="label label-text-alt">Fale um pouco sobre você. Isto será exibido em sua página pessoal.</span>
      </div>
      <button className="btn btn-accent mt-2" disabled={isSubmitting} type="submit">
        {isSubmitting ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <>
            Finalizar
            <ArrowRight />
          </>
        )}
      </button>
    </form>
  )
}