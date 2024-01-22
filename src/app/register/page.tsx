'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { RegisterForm } from '~/components/forms/register'
import { Steps } from '~/components/ui/steps'
import type { CreateUser } from '~/schemas/create-user'
import { createUserSchema } from '~/schemas/create-user'

export default function Register() {
  const params = useSearchParams()

  const username = params.has('username') ? params.get('username') : undefined

  const form = useForm<CreateUser>({
    resolver: zodResolver(createUserSchema),
  })

  useEffect(() => {
    if (username) {
      form.setValue('username', username)
    }
  }, [form, params, username])

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
        <FormProvider {...form}>
          <RegisterForm />
        </FormProvider>
      </section>
    </main>
  )
}
