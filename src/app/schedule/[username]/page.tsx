'use client'

import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

import { ConfirmScheduleForm } from '~/components/forms/confirm-schedule'
import { SelectDateTimeForm } from '~/components/forms/select-datetime'

export default function Schedule() {
  const session = useSession()

  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null)
  const [nextStep, setNextStep] = useState<'select-datetime' | 'confirm-schedule'>('select-datetime')

  const handleSelectDateTime = (date: Date | null) => {
    setSelectedDateTime(date)
  }

  const handlePrevStep = () => {
    setNextStep('select-datetime')
  }

  const handleNextStep = () => {
    setNextStep('confirm-schedule')
  }

  return (
    <main className="mx-auto mb-4 mt-16 flex w-full max-w-4xl flex-col items-center px-4">
      <header className="mb-8 flex flex-col items-center justify-center">
        <Image
          alt="Adeonir Kohl"
          className="mb-2 h-24 w-24 rounded-full"
          height={200}
          priority
          src="https://github.com/adeonir.png"
          width={200}
        />
        <h2 className="text-xl font-medium">{session.data?.user.name}</h2>
        <span className="mt-1 text-xs text-zinc-400">{session.data?.user.bio}</span>
      </header>
      <div className="flex flex-col gap-4 rounded-lg border border-zinc-200/10 bg-zinc-600/20 p-4">
        {nextStep === 'select-datetime' ? (
          <SelectDateTimeForm onNextStep={handleNextStep} onSelectDateTime={handleSelectDateTime} />
        ) : (
          selectedDateTime && <ConfirmScheduleForm onPrevStep={handlePrevStep} scheduleDate={selectedDateTime} />
        )}
      </div>
    </main>
  )
}
