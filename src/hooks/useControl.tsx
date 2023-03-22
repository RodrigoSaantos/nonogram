import { level, type LevelProps, type Level } from '@/components/Screen/levels';
import { getTipByColumn, getTipByLine } from '@/utils/getFilledByColumn';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type TypeSelect = 'filled' | 'unfilled'

type ControlContextData = {
  typeSelected: TypeSelect;
  columnTip: number[][];
  lineTip: number[][];
  board: boolean[]
  cellSelected?: Level
  completedCols: Boolean[]
  onSetTypeSelected: (type: TypeSelect) => void;
  onSetBoard: (index: number, value: boolean) => void
  onSetCellSelected: (cell: Level) => void
};

type ControlProviderProps = {
  children: ReactNode;
};

const ControlContext = createContext<ControlContextData>(
  {} as ControlContextData
);

const indexByColumn = {
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
  const [cellSelected, setCellSelected] = useState<Level | undefined>(undefined)
  const [board, setBoard] = useState(Array(size * size).fill(false));
  const [completedCols, setCompletedCols] = useState<Boolean[]>(Array(size).fill(false));

  const [fase, setFase] = useState<LevelProps>(level);
  const columnTip = useMemo(() => {
    return getTipByColumn(fase)
  }, [fase])
  const lineTip = useMemo(() => {
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

  const onSetCellSelected = useCallback((cell: Level) => {
    setCellSelected(cell)
  }, [])

  const getTheNumberOfFilledColumns = useCallback((index: number) => {
    console.log(index)
    let columnCompleted = 0
    for (let j = index + 1; j <= index + 1 + size; j++) {
      if (board[j]) {
        columnCompleted ++;
      }
    }
    return columnCompleted
  }, [board])

  const getTheNumberOfFilledLines = useCallback((index: number) => {
    console.log({index})
    let lineCompleted = 0
    for (let j = index + 2; j <= size * size; j += size) {
      if (board[j]) {
        lineCompleted ++;
      }
    }
    return lineCompleted
  }, [board])

  useEffect(() => {
    if (cellSelected) {
      const index = indexByColumn[cellSelected.column]
      const tipsByColumn = columnTip[index]
      const sumTipsByColumn = tipsByColumn.reduce((total, number) => total + number)
      const cellSelectedByColumn = getTheNumberOfFilledColumns(index)

      getTheNumberOfFilledLines(index)

      if (sumTipsByColumn === cellSelectedByColumn) {
        setCompletedCols(state => {
          const draft = [...state]
          draft[index] = true;
          return draft;
        })
      }
    }

  }, [board, cellSelected, columnTip, getTheNumberOfFilledColumns, getTheNumberOfFilledLines]);


  return (
    <ControlContext.Provider
      value={{
        onSetTypeSelected,
        typeSelected,
        columnTip,
        board,
        onSetBoard,
        onSetCellSelected,
        cellSelected,
        completedCols,
        lineTip,
      }}
    >
      {children}
    </ControlContext.Provider>
  );
}

export function useControl(): ControlContextData {
  return useContext(ControlContext);
}
