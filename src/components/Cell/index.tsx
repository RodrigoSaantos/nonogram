import { useControl } from '@/hooks/useControl'
import { getRowNumber } from '@/utils/getFilledByColumn'
import { useEffect, useState } from 'react'
import { RiCloseFill } from 'react-icons/ri'
import { Puzzle } from '../Screen/puzzle'

interface CellProps {
  data: Puzzle
}

const COLUMN_INDEX = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7,
  i: 8,
  j: 9,
}

export function Cell({ data }: CellProps) {
  const {
    typeSelected,
    onSetBoard,
    onSetCellSelected,
    completeHints,
    onMadeMistake,
    onReset,
    isReset,
  } = useControl()
  const [isCorrect, setIsCorrect] = useState(false)
  const [hasFailed, setHasFailed] = useState(false)

  const handleClick = () => {
    const isSelectedType = typeSelected === data.type
    onSetCellSelected(data)
    if (isSelectedType) {
      setIsCorrect(true)
      if (data.type === 'filled') onSetBoard(data.id - 1, true)
      return
    }
    onMadeMistake()
    setHasFailed(true)
    setIsCorrect(true)
    setTimeout(() => {
      setHasFailed(false)
    }, 500)
  }

  useEffect(() => {
    const colIndex = COLUMN_INDEX[data.column]
    const rowIndex = getRowNumber(data.id, 10) - 1

    if (completeHints.column[colIndex] || completeHints.row[rowIndex]) {
      setIsCorrect(true)
    }
  }, [completeHints, data.column, data.id])

  useEffect(() => {
    if (isReset) {
      onReset()
      setIsCorrect(false)
    }
  }, [isReset, onReset])

  const icon =
    data.type === 'unfilled' && isCorrect ? (
      <RiCloseFill className="animate-checked" />
    ) : undefined

  return (
    <div
      className={`flex justify-center items-center border border-accent-foreground/10 h-12 w-12 transition-colors duration-150 ${hasFailed ? 'bg-red-500' : ''}`}
    >
      <button
        type="button"
        className={`
        flex justify-center group items-center w-11 h-11 rounded-sm text-5xl 
        ${hasFailed ? 'animate-mistake' : ''} 
        ${typeSelected === 'filled' && !isCorrect ? 'hover:bg-foreground/30' : ''} 
        ${data.type === 'filled' && isCorrect ? 'bg-foreground hover:bg-foreground' : 'bg-transparent'}
        ${isCorrect && !hasFailed ? 'animate-checked' : ''}
        `}
        onClick={handleClick}
        aria-label="nada"
      >
        <RiCloseFill
          className={`opacity-30 hidden ${typeSelected === 'unfilled' && !isCorrect ? 'group-hover:block' : ''}`}
        />
        {icon}
      </button>
    </div>
  )
}
