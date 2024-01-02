'use client'

import { ArrowRight, Check } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'

export function ConnectToGoogleForm() {
  const params = useSearchParams()
  const session = useSession()

  const hasAuthError = !!params.get('error')
  const isSignedIn = session.status === 'authenticated'

  const handleConnect = async () => {
    await signIn('google', { callbackUrl: '/register/connect' })
  }

  return (
    <div>
      <div className="flex items-center justify-between rounded-lg border border-zinc-200/10 p-4">
        <strong>Google Agenda</strong>
        {isSignedIn ? (
          <button className="btn-accent btn-outline btn btn-sm" disabled={isSignedIn} type="submit">
            Conectado
            <Check size={16} />
          </button>
        ) : (
          <button className="btn-accent btn-outline btn btn-sm" onClick={handleConnect} type="submit">
            Conectar
            <ArrowRight size={16} />
          </button>
        )}
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
