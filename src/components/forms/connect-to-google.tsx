'use client'

import { ArrowRight, Check } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { signIn, signOut, useSession } from 'next-auth/react'

export function ConnectToGoogleForm() {
  const params = useSearchParams()
  const session = useSession()

  const hasAuthError = !!params.get('error')
  const isSignedIn = session.status === 'authenticated'

  const handleConnect = async () => {
    if (hasAuthError) {
      await signOut({ callbackUrl: '/register/connect' })
    }

    await signIn('google')
  }

  return (
    <div>
      <div className="flex items-center justify-between rounded-lg border border-zinc-200/10 p-4">
        <strong>Google Agenda</strong>
        {hasAuthError ? (
          <button className="btn btn-outline btn-accent btn-sm" onClick={handleConnect} type="submit">
            Tentar novamente
          </button>
        ) : (
          <button
            className="btn btn-outline btn-accent btn-sm"
            disabled={isSignedIn}
            onClick={isSignedIn ? undefined : handleConnect}
            type="submit"
          >
            {isSignedIn ? 'Conectado' : 'Conectar'}
            {isSignedIn ? <Check size={16} /> : <ArrowRight size={16} />}
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
