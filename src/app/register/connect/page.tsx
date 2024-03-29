import type { Metadata } from 'next'

import { ConnectToGoogleForm } from '~/components/forms/connect-to-google'
import { Steps } from '~/components/ui/steps'

export const metadata: Metadata = {
  title: 'Conecte sua agenda do Google',
  robots: {
    index: false,
  },
}

export default function ConnectPage() {
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
      </section>
    </main>
  )
}
