import Image from 'next/image'

import { auth } from '~/auth'
import { ScheduleForm } from '~/components/forms/schedule'

export default async function Schedule() {
  const session = await auth()

  return (
    <main className="mx-auto mb-4 mt-20 flex w-full max-w-4xl flex-col items-center px-4">
      <header className="flex flex-col items-center justify-center">
        <Image
          alt="Adeonir Kohl"
          className="mb-2 h-24 w-24 rounded-full"
          height={200}
          priority
          src="https://github.com/adeonir.png"
          width={200}
        />
        <h2 className="text-xl font-medium">{session?.user.name}</h2>
        <span className="mt-1 text-xs text-zinc-400">{session?.user.bio}</span>
      </header>
      <ScheduleForm className="mt-12" />
    </main>
  )
}
