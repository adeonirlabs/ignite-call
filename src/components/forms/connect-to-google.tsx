'use client'

import { ArrowRight } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'

export function ConnectToGoogleForm() {
  const params = useSearchParams()
  const hasAuthError = !!params.get('error')

  return (
    <div>
      <div className="flex items-center justify-between rounded-lg border border-zinc-200/10 p-4">
        <strong>Google Agenda</strong>
        <button className="btn-accent btn-outline btn btn-sm" onClick={() => signIn('google')} type="submit">
          Conectar
          <ArrowRight />
        </button>
      </div>
      {hasAuthError && (
        <span className="label-error label">
          Erro ao conectar com o Google Agenda. <br />
          Verifique se você habilitou as permissões de acesso ao calendário.
        </span>
      )}
    </div>
  )
}
