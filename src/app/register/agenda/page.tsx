import type { Metadata } from 'next'

import { TimeIntervalsForm } from '~/components/forms/time-intervals'
import { Steps } from '~/components/ui/steps'

export const metadata: Metadata = {
  title: 'Selecione sua disponibilidade',
  robots: {
    index: false,
  },
}

export default function AgendaPage() {
  return (
    <main className="mx-auto mb-4 mt-20 max-w-xl px-4">
      <header className="flex flex-col gap-6 pb-6">
        <div className="flex flex-col gap-2">
          <strong className="text-2xl font-bold text-accent">Defina sua disponibilidade</strong>
          <span className="text-zinc-300">
            Defina o intervalo de horários que você está disponível em cada dia da semana.
          </span>
        </div>
        <Steps current={3} size={4} />
      </header>
      <section className="flex flex-col gap-4 rounded-lg border border-zinc-200/10 bg-zinc-600/20 p-4">
        <TimeIntervalsForm />
      </section>
    </main>
  )
}
