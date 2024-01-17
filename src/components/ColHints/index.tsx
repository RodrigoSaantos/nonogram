interface ColHintsProps {
  hints: number[]
  isDisabled: boolean
}

export function ColHints({ hints, isDisabled }: ColHintsProps) {
  return (
    <div className="flex flex-col border-[2px] bg-muted-foreground/30 items-center rounded-lg border-muted-foreground/50 w-[45px] h-[96px] justify-end">
      {hints?.map((hint) => (
        <span
          key={hint}
          className={`flex w-full justify-center ${isDisabled ? 'opacity-50' : 'opacity-100'}`}
        >
          {hint}
        </span>
      ))}
    </div>
  )
}
