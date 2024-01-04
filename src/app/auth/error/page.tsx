'use client'

import { RotateCcw } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { signOut } from 'next-auth/react'

export default function AuthError() {
  const params = useSearchParams()
  const error = params.get('error')

  const handleTryAgain = async () => {
    await signOut({ callbackUrl: '/register/connect' })
  }

  const renderErrorMessage = {
    AuthorizedCallbackError: (
      <span className="label-error label !text-base">
        Erro ao conectar com o Google Agenda. <br />
        Verifique se você habilitou as permissões de acesso ao calendário.
      </span>
    ),
  }

  return (
    <main className="mx-auto mb-4 mt-20 max-w-xl px-4">
      <header className="flex flex-col gap-6 pb-6">
        <div className="flex flex-col gap-2">
          <strong className="text-2xl font-bold">Opa, algo deu errado</strong>
          {renderErrorMessage[error as keyof typeof renderErrorMessage]}
        </div>
      </header>
      <section className="flex flex-col gap-4 rounded-lg border border-zinc-200/10 bg-zinc-600/20 p-4">
        <button className="btn btn-accent" onClick={handleTryAgain} type="submit">
          Tente novamente
          <RotateCcw />
        </button>
      </section>
    </main>
  )
}
