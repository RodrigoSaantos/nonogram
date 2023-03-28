import { Flex, IconButton } from "@chakra-ui/react";
import { RiCloseFill } from 'react-icons/ri';
import { useControl } from "@/hooks/useControl";
import { useEffect, useState } from "react";
import { getRowNumber } from "@/utils/getFilledByColumn";
import { Puzzle } from "../Screen/puzzle";

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
};

export function Cell({ data }: CellProps) {
  const { typeSelected, onSetBoard, onSetCellSelected, completeHints, onMadeMistake, lives, onReset, isReset } = useControl()
  const [isCorrect, setIsCorrect] = useState(false);

  const handleClick = () => {
    const isSelectedType = typeSelected === data.type
    onSetCellSelected(data)
    if (isSelectedType) {
        setIsCorrect(true);
      if (data.type === 'filled') onSetBoard(data.id - 1, true)
      return;
    }
    onMadeMistake()
    setIsCorrect(true);
  }

  useEffect(() => {
    const colIndex = COLUMN_INDEX[data.column];
    const rowIndex = getRowNumber(data.id, 10) - 1;

    if (completeHints.column[colIndex] || completeHints.row[rowIndex]) {
      setIsCorrect(true)
    }

  }, [completeHints, data.column, data.id])

  useEffect(() => {
    if (isReset) {
      onReset()
      setIsCorrect(false)
    }
  }, [isReset, onReset]);

  const icon = data.type === 'unfilled' && isCorrect ? <RiCloseFill /> : undefined

  return (
    <Flex justify={'center'} align="center" border='1px solid' borderColor={'gray.100'} height={12} width={12}>
      <IconButton bg={data.type === 'filled' && isCorrect ? 'gray.500' : 'transparent'} fontSize={32} icon={icon} onClick={handleClick} aria-label="nada" />
    </Flex>
  )
}