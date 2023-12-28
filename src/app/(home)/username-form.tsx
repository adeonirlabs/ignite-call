'use client'
import { ArrowRight } from 'lucide-react'
import type { ComponentProps } from 'react'

import { cn } from '~/utils/classnames'

interface UsernameFormProps extends ComponentProps<'form'> {}

export function UsernameForm({ className, ...props }: UsernameFormProps) {
  return (
    <form
      className={cn(
        'flex max-w-lg flex-col gap-2 p-4 md:flex-row',
        'rounded-lg border border-zinc-200/10 bg-zinc-600/20',
        className,
      )}
      {...props}
    >
      <input className="input-bordered input-accent input w-full" placeholder="Nome de usuário" type="text" />
      <button className="btn-accent btn" type="submit">
        Reservar
        <ArrowRight />
      </button>
    </form>
  )
}
