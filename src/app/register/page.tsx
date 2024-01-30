import type { Metadata } from 'next'

import { RegisterForm } from '~/components/forms/register-username'
import { Steps } from '~/components/ui/steps'

export const metadata: Metadata = {
  title: 'Crie uma conta',
}

export default function Register() {
  return (
    <main className="mx-auto mb-4 mt-20 max-w-xl px-4">
      <header className="flex flex-col gap-6 pb-6">
        <div className="flex flex-col gap-2">
          <strong className="text-2xl font-bold text-accent">Bem vindo ao Ignite Call</strong>
          <span className="text-zinc-300">
            Precisamos de algumas informações para criar seu perfil! Ah, você pode editar essas informações depois.
          </span>
        </div>
        <Steps current={1} size={4} />
      </header>
      <section className="rounded-lg border border-zinc-200/10 bg-zinc-600/20 p-4">
        <RegisterForm />
      </section>
    </main>
  )
}
