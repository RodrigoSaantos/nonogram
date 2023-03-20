import { Flex, IconButton } from "@chakra-ui/react";
import { Level } from "../Screen/levels";
import { RiCloseFill } from 'react-icons/ri';
import { useControl } from "@/hooks/useControl";
import { useState } from "react";

interface BoxProps {
  data: Level
}

export function Box(props: BoxProps) {
  const { data } = props
  const { typeSelected } = useControl()
  const [isRight, setIsRight] = useState(false);
  const isChecked = data.type === 'unfilled' && isRight

  function onClick() {
    if (typeSelected === data.type) {
        setIsRight(true);
    }
  }

  const icon = data.type === 'unfilled' && isRight ? <RiCloseFill /> : undefined

  return (
    <Flex justify={'center'} align="center" border='1px solid' borderColor={'gray.100'} height={12} width={12}>
      <IconButton bg={data.type === 'filled' && isRight ? 'gray.500' : 'transparent'} fontSize={32} icon={icon} onClick={onClick} aria-label="nada" />
    </Flex>
  )
}