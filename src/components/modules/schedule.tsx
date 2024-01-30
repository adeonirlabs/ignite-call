'use client'

import { useState } from 'react'

import { ConfirmScheduleForm } from '~/components/forms/confirm-schedule'
import { SelectDateTimeForm } from '~/components/forms/select-datetime'

export function Schedule() {
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

  return nextStep === 'select-datetime' ? (
    <SelectDateTimeForm onNextStep={handleNextStep} onSelectDateTime={handleSelectDateTime} />
  ) : (
    selectedDateTime && <ConfirmScheduleForm onPrevStep={handlePrevStep} scheduleDate={selectedDateTime} />
  )
}
