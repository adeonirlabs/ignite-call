'use client'

import { ArrowRight } from 'lucide-react'
import { signIn } from 'next-auth/react'

export function ConnectToGoogleForm() {
  return (
    <div className="flex items-center justify-between rounded-lg border border-zinc-200/10 p-4">
      <strong>Google Agenda</strong>
      <button className="btn-accent btn-outline btn btn-sm" onClick={() => signIn('google')} type="submit">
        Conectar
        <ArrowRight />
      </button>
    </div>
  )
}
