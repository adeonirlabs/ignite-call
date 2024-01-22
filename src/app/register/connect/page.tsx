'use client'

import { ArrowRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

import { ConnectToGoogleForm } from '~/components/forms/connect-to-google'
import { Steps } from '~/components/ui/steps'
import { sleepTime } from '~/utils/sleep'

export default function Connect() {
  const params = useSearchParams()
  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!params.get('error')
  const isAuthenticated = session.status === 'authenticated'

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNextStep = () => {
    setIsSubmitting(true)
    sleepTime(500)
    router.push(`/register/agenda`)
  }

  return (
    <main className="mx-auto mb-4 mt-20 max-w-xl px-4">
      <header className="flex flex-col gap-6 pb-6">
        <div className="flex flex-col gap-2">
          <strong className="text-2xl font-bold text-accent">Conecte sua agenda</strong>
          <span className="text-zinc-300">
            Conecte o seu calendário para verificar automaticamente as horas ocupadas e os novos eventos à medida em que
            são agendados.
          </span>
        </div>
        <Steps current={2} size={4} />
      </header>
      <section className="flex flex-col gap-4 rounded-lg border border-zinc-200/10 bg-zinc-600/20 p-4">
        <ConnectToGoogleForm />
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
      </section>
    </main>
  )
}
