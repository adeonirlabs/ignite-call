'use client'

import { UpdateProfileForm } from '~/components/forms/update-profile'
import { Steps } from '~/components/ui/steps'

export default function Profile() {
  return (
    <main className="mx-auto mb-4 mt-20 max-w-xl px-4">
      <header className="flex flex-col gap-6 pb-6">
        <div className="flex flex-col gap-2">
          <strong className="text-2xl font-bold text-accent">Quase lá</strong>
          <span className="text-zinc-300">Por último, uma breve descrição.</span>
        </div>
        <Steps current={4} size={4} />
      </header>
      <section className="flex flex-col gap-4 rounded-lg border border-zinc-200/10 bg-zinc-600/20 p-4">
        <UpdateProfileForm />
      </section>
    </main>
  )
}
