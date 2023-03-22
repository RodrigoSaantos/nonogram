import { type Puzzle, type PuzzleProps, gamePuzzle } from '@/components/Screen/puzzle';
import { getRowNumber, getTipByColumn, getTipByLine } from '@/utils/getFilledByColumn';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type TypeSelect = 'filled' | 'unfilled'

type ControlContextData = {
  typeSelected: TypeSelect;
  colHint: number[][];
  rowHint: number[][];
  board: boolean[]
  cellSelected?: Puzzle
  completedCols: boolean[]
  completedRows: boolean[]
  onSetTypeSelected: (type: TypeSelect) => void;
  onSetBoard: (index: number, value: boolean) => void
  onSetCellSelected: (cell: Puzzle) => void
};

type ControlProviderProps = {
  children: ReactNode;
};

const ControlContext = createContext<ControlContextData>(
  {} as ControlContextData
);

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

export function ControlProvider({ children }: ControlProviderProps) {
  const size = 10
  const [typeSelected, setTypeSelected] = useState<TypeSelect>('filled')
  const [cellSelected, setCellSelected] = useState<Puzzle | undefined>(undefined)
  const [board, setBoard] = useState(Array(size * size).fill(false));
  const [completedCols, setCompletedCols] = useState<boolean[]>(Array(size).fill(false));
  const [completedRows, setCompletedRows] = useState<boolean[]>(Array(size).fill(false));

  const [fase, setFase] = useState<PuzzleProps>(gamePuzzle);
  const colHint = useMemo(() => {
    return getTipByColumn(fase)
  }, [fase])
  const rowHint = useMemo(() => {
    return getTipByLine(fase)
  }, [fase])

  const onSetTypeSelected = useCallback((type: TypeSelect) => {
    setTypeSelected(type)
  }, []);

  const onSetBoard = useCallback((index: number, value: boolean) => {
    setBoard(state => {
      const draft = [...state];
      draft.splice(index, 1, value)
      return draft;
    })
  }, [])

  const onSetCellSelected = useCallback((cell: Puzzle) => {
    setCellSelected(cell)
  }, [])

  const getTheNumberOfFilledColumns = useCallback((index: number) => {
    let columnCompleted = 0
    for (let j = index; j <= size * size; j += size) {
      if (board[j]) {
        columnCompleted++;
      }
    }
    return columnCompleted
  }, [board])

  const getTheNumberOfFilledLines = useCallback((cellIndex: number) => {
    const start = cellIndex - (cellIndex % 10);
    const end = start + 10;
    const row = board.slice(start, end);
    return row.reduce((acc, val) => acc + (val ? 1 : 0), 0);
  }, [board])

  useEffect(() => {
    if (cellSelected) {
      const index = COLUMN_INDEX[cellSelected.column]
      const tipsByColumn = colHint[index]
      const sumTipsByColumn = tipsByColumn.reduce((total, number) => total + number)
      const cellSelectedByColumn = getTheNumberOfFilledColumns(index)

      if (sumTipsByColumn === cellSelectedByColumn) {
        setCompletedCols(state => {
          const draft = [...state]
          draft[index] = true;
          return draft;
        })
      }
    }

  }, [board, cellSelected, colHint, getTheNumberOfFilledColumns, getTheNumberOfFilledLines]);

  useEffect(() => {
    if (cellSelected) {
      const cellSelectedIndex = cellSelected.id - 1
      const lineIndex = getRowNumber(cellSelected.id, size) - 1
      const tipsByLine = rowHint[lineIndex]
      const sumTipsByLine = tipsByLine.reduce((total, number) => total + number)
      const cellSelectedByLine = getTheNumberOfFilledLines(cellSelectedIndex)

      if (sumTipsByLine === cellSelectedByLine) {
        setCompletedRows(state => {
          const draft = [...state]
          draft[lineIndex] = true;
          return draft;
        })
      }
    }

  }, [cellSelected, getTheNumberOfFilledLines, rowHint]);


  return (
    <ControlContext.Provider
      value={{
        onSetTypeSelected,
        typeSelected,
        colHint,
        rowHint,
        board,
        onSetBoard,
        onSetCellSelected,
        cellSelected,
        completedCols,
        completedRows,
      }}
    >
      {children}
    </ControlContext.Provider>
  );
}

export function useControl(): ControlContextData {
  return useContext(ControlContext);
}
