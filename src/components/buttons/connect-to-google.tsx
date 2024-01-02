'use client'

import { ArrowRight } from 'lucide-react'
import { signIn } from 'next-auth/react'

export function ConnectToGoogle() {
  return (
    <button className="btn-accent btn-outline btn btn-sm" onClick={() => signIn('google')} type="submit">
      Conectar
      <ArrowRight />
    </button>
  )
}
