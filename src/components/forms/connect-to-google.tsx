'use client'

import { ArrowRight, Check } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { useState } from 'react'

import { sleepTime } from '~/utils/sleep'

export function ConnectToGoogleForm() {
  const session = useSession()
  const params = useSearchParams()
  const router = useRouter()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const hasAuthError = !!params.get('error')
  const isAuthenticated = session.status === 'authenticated'

  const handleConnect = async () => {
    await signIn('google')
  }

  const handleNextStep = () => {
    setIsSubmitting(true)
    sleepTime(500)
    router.push(`/register/agenda`)
  }

  return (
    <>
      <form className="flex items-center justify-between rounded border border-zinc-200/10 p-4">
        <strong>Google Agenda</strong>
        <button
          className="btn btn-outline btn-accent btn-sm"
          disabled={isAuthenticated}
          onClick={isAuthenticated ? undefined : handleConnect}
          type="button"
        >
          {isAuthenticated ? 'Conectado' : 'Conectar'}
          {isAuthenticated ? <Check size={16} /> : <ArrowRight size={16} />}
        </button>
      </form>
      <button
        className="btn btn-accent"
        disabled={!isAuthenticated || hasAuthError || isSubmitting}
        onClick={handleNextStep}
        type="submit"
      >
        {isSubmitting ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <>
            Próximo passo
            <ArrowRight />
          </>
        )}
      </button>
    </>
  )
}
