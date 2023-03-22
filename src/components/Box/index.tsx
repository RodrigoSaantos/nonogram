import { Flex, IconButton } from "@chakra-ui/react";
import { Level } from "../Screen/levels";
import { RiCloseFill } from 'react-icons/ri';
import { useControl } from "@/hooks/useControl";
import { useEffect, useState } from "react";

interface BoxProps {
  data: Level
}

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

export function Box(props: BoxProps) {
  const { data } = props
  const { typeSelected, columnTip, onSetBoard, onSetCellSelected, completedCols } = useControl()
  const [isRight, setIsRight] = useState(false);
  const isChecked = data.type === 'unfilled' && isRight

  function onClick() {
    onSetCellSelected(data)

    if (typeSelected === data.type) {
        setIsRight(true);
      if (data.type === 'filled') onSetBoard(data.id, true)
    }
  }

  useEffect(() => {
    if (completedCols[indexByColumn[data.column]]) {
      setIsRight(true)
    }
  }, [completedCols, data.column])

  const icon = data.type === 'unfilled' && isRight ? <RiCloseFill /> : undefined

  return (
    <Flex justify={'center'} align="center" border='1px solid' borderColor={'gray.100'} height={12} width={12}>
      <IconButton bg={data.type === 'filled' && isRight ? 'gray.500' : 'transparent'} fontSize={32} icon={icon} onClick={onClick} aria-label="nada" />
    </Flex>
  )
}