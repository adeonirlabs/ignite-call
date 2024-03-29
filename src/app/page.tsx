import Image from 'next/image'

import preview from '~/assets/images/preview.png'
import { ClaimUsernameForm } from '~/components/forms/claim-username'

export default function HomePage() {
  return (
    <main className="ml-auto flex h-screen max-w-[calc(100vw_-_(100vw_-_72rem)_/_2)] items-center gap-20">
      <section className="flex flex-col gap-4 p-10">
        <h1 className="text-4xl font-bold md:text-6xl">Agendamento descomplicado</h1>
        <p className="mb-4 text-base md:text-xl">
          Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre.
        </p>
        <ClaimUsernameForm />
      </section>
      <section className="hidden overflow-hidden md:flex">
        <Image
          alt="Calendário mostrando o funcionamento da aplicação"
          className="max-w-none shrink-0"
          height={400}
          priority
          quality={100}
          src={preview}
        />
      </section>
    </main>
  )
}
