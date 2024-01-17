interface RowHintsProps {
  hints: number[]
  isDisabled: boolean
}

export function RowHints({ hints, isDisabled }: RowHintsProps) {
  return (
    <div className="flex border-[2px] bg-muted-foreground/30 items-center justify-end rounded-lg border-muted-foreground/50 w-[96px] h-[45px] p-[5px]">
      {hints?.map((hint, index) => (
        <span
          className={`flex w-full justify-end max-w-5 ${isDisabled ? 'opacity-50' : 'opacity-100'}`}
          key={`${hint}-${index}`}
        >
          {hint}
        </span>
      ))}
    </div>
  )
}
