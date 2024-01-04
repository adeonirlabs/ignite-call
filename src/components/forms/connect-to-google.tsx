'use client'

import { ArrowRight, Check } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'

export function ConnectToGoogleForm() {
  const session = useSession()

  const isSignedIn = session.status === 'authenticated'

  const handleConnect = async () => {
    await signIn('google')
  }

  return (
    <form className="flex items-center justify-between rounded border border-zinc-200/10 p-4">
      <strong>Google Agenda</strong>
      <button
        className="btn btn-outline btn-accent btn-sm"
        disabled={isSignedIn}
        onClick={isSignedIn ? undefined : handleConnect}
        type="button"
      >
        {isSignedIn ? 'Conectado' : 'Conectar'}
        {isSignedIn ? <Check size={16} /> : <ArrowRight size={16} />}
      </button>
    </form>
  )
}
