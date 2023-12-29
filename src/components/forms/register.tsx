'use client'

import { ArrowRight } from 'lucide-react'
import type { ComponentProps } from 'react'

import { cn } from '~/utils/classnames'

interface RegisterFormProps extends ComponentProps<'form'> {}

export function RegisterForm({ className, ...props }: RegisterFormProps) {
  return (
    <form
      className={cn('flex flex-col gap-4 rounded-lg border border-zinc-200/10 bg-zinc-600/20 p-4', className)}
      {...props}
    >
      <label className="form-control w-full">
        <span className="label label-text pt-0">Nome de usuário</span>
        <input className="input-bordered input-accent input w-full" placeholder="Seu usuário" type="text" />
      </label>
      <label className="form-control w-full">
        <span className="label label-text pt-0">Nome completo</span>
        <input className="input-bordered input-accent input w-full" placeholder="Seu nome" type="text" />
      </label>
      <button className="btn-accent btn mt-2" type="submit">
        Próximo passo
        <ArrowRight />
      </button>
    </form>
  )
}
