import { useControl } from '@/hooks/useControl'
import { Cell } from '../Cell'
import { ColHints } from '../ColHints'
import { RowHints } from '../RowHints'
import { Puzzle, gamePuzzle } from '../Screen/puzzle'

export function Canvas() {
  const { colHint, rowHint, completeHints } = useControl()
  return (
    <div className="flex items-end">
      <div className="flex gap-1 justify-center my-1 h-[480px] flex-col me-1">
        {rowHint.map((hint, index) => (
          <RowHints
            isDisabled={completeHints.row[index]}
            key={`${hint[0]}-${index}`}
            hints={hint}
          />
        ))}
      </div>
      <div className="flex flex-col">
        <div className="flex gap-1 justify-center my-1">
          {colHint.map((hint, index) => (
            <ColHints
              isDisabled={completeHints.column[index]}
              key={`${hint[0]}-${index}`}
              hints={hint}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 border-[2px] border-foreground">
          {Object.values(gamePuzzle).map((puzzles: Puzzle[]) => (
            <div
              className="border-[2px] border-foreground grid grid-cols-5"
              key={puzzles[0].id}
            >
              {puzzles.map((puzzle: Puzzle) => (
                <Cell key={puzzle.id} data={puzzle} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
