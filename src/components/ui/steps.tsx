import type { ComponentProps, CSSProperties } from 'react'

export interface StepsProps extends ComponentProps<'div'> {
  size: number
  current: number
}

interface CssProps extends CSSProperties {
  '--steps-size': number
}

export function Steps({ size, current }: StepsProps) {
  return (
    <div className="flex flex-col gap-1" style={{ '--steps-size': size } as CssProps}>
      <label className="text-xs text-zinc-400">{`Passo ${current} de ${size}`}</label>
      <div className="grid grid-cols-[repeat(var(--steps-size),_1fr)] gap-2">
        {Array.from({ length: size })
          .map((_, index) => index + 1)
          .map(step => (
            <div className={`rounded-2 h-1 ${current >= step ? 'bg-accent' : 'bg-zinc-600'}`} key={step} />
          ))}
      </div>
    </div>
  )
}
