import Image from 'next/image'

import { auth } from '~/auth'

export default async function Schedule() {
  const session = await auth()

  return (
    <main className="max-w-4xl- mx-auto mb-4 mt-20 px-4">
      <header className="flex flex-col items-center">
        <Image
          alt="Adeonir Kohl"
          className="mb-2 h-24 w-24 rounded-full"
          height={200}
          src="https://github.com/adeonir.png"
          width={200}
        />
        <h2 className="text-xl font-medium">{session?.user.name}</h2>
        <span className="mt-1 text-xs text-zinc-400">{session?.user.bio}</span>
      </header>
    </main>
  )
}
