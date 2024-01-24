import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react'
import type { ComponentProps } from 'react'

import { cn } from '~/utils/classnames'

export function ConfirmScheduleForm({ className, ...props }: ComponentProps<'section'>) {
  const isSubmitting = false

  return (
    <section
      className={cn('w-full max-w-2xl rounded-lg border border-zinc-200/10 bg-zinc-600/20', className)}
      {...props}
    >
      <header className="flex items-center gap-8 border-b border-zinc-600/40 p-6">
        <div className="flex items-center gap-2">
          <Calendar className="text-zinc-500" size={20} />
          <span>24 de janeiro de 2024</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="text-zinc-500" size={20} />
          <span>9:00</span>
        </div>
      </header>

      <form className="flex flex-col gap-4 p-6">
        <label className="form-control w-full">
          <span className="label label-text">Nome completo</span>
          <input
            className={cn('input input-bordered input-accent w-full placeholder:text-zinc-300/50')}
            placeholder="Seu nome"
            type="text"
          />
        </label>
        <label className="form-control w-full">
          <span className="label label-text">Endereço de e-mail</span>
          <input
            className={cn('input input-bordered input-accent w-full placeholder:text-zinc-300/50')}
            placeholder="seu@email.com"
            type="email"
          />
        </label>
        <label className="form-control w-full">
          <span className="label label-text">Observações</span>
          <textarea
            className="textarea textarea-bordered textarea-accent placeholder:text-zinc-300/50"
            placeholder="Anote alguma observação sobre a reunião"
            rows={5}
          />
        </label>
        <div className="flex items-center justify-end gap-4">
          <button className="btn btn-outline mt-2" disabled={isSubmitting} type="button">
            <ArrowLeft />
            Cancelar
          </button>
          <button className="btn btn-accent mt-2" disabled={isSubmitting} type="submit">
            {isSubmitting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <>
                Confirmar
                <ArrowRight />
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  )
}
