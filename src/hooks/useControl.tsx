import { type Puzzle, type PuzzleProps, gamePuzzle } from '@/components/Screen/puzzle';
import { getRowNumber, getHintByColumn, getHintByRow } from '@/utils/getFilledByColumn';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type TypeSelect = 'filled' | 'unfilled'

interface CompleteHints {
  row: boolean[];
  column: boolean[];
}

type ControlContextData = {
  typeSelected: TypeSelect;
  colHint: number[][];
  rowHint: number[][];
  board: boolean[]
  cellSelected?: Puzzle
  completeHints: CompleteHints
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
  const [completeHints, setCompletedHints] = useState<CompleteHints>({ row: Array(10).fill(false), column: Array(10).fill(false) });
  const [fase, setFase] = useState<PuzzleProps>(gamePuzzle);

  const colHint = useMemo(() => {
    return getHintByColumn(fase)
  }, [fase])

  const rowHint = useMemo(() => {
    return getHintByRow(fase)
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

  const getTheNumberOfFilledRows = useCallback((cellIndex: number) => {
    const start = cellIndex - (cellIndex % 10);
    const end = start + 10;
    const row = board.slice(start, end);
    return row.reduce((acc, val) => acc + (val ? 1 : 0), 0);
  }, [board])

  const checkHints = useCallback((cellSelected?: Puzzle): void  =>{

    if (cellSelected) {
      const cellIndex = cellSelected.id - 1;
      const rowIndex = getRowNumber(cellSelected.id, size) - 1;

       // Verifica a linha
       const rowHint = getHintByRow(fase)[rowIndex];
       const sumRowHint = rowHint.reduce((total, number) => total + number)
       const filledCellsInRow = getTheNumberOfFilledRows(cellIndex);

      // Verifica a coluna
      const columnIndex = COLUMN_INDEX[cellSelected.column];
      const colHint = getHintByColumn(fase)[columnIndex];
      const sumColHint = colHint.reduce((total, number) => total + number)
      const filledCellsInColumn = getTheNumberOfFilledColumns(columnIndex);

      setCompletedHints(state => {
        const { column, row } = state
        row.splice(rowIndex, 1, sumRowHint === filledCellsInRow)
        column.splice(columnIndex, 1, sumColHint === filledCellsInColumn)
        return {
          ...state,
          column,
          row,
        }
      })
    }
  }, [fase, getTheNumberOfFilledColumns, getTheNumberOfFilledRows])

  useEffect(() => {
    checkHints(cellSelected)
  }, [cellSelected, checkHints]);

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
        completeHints
      }}
    >
      {children}
    </ControlContext.Provider>
  );
}

export function useControl(): ControlContextData {
  return useContext(ControlContext);
}
