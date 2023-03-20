import { Flex, IconButton } from "@chakra-ui/react";
import { RiCloseFill } from 'react-icons/ri';
import { FaStop } from 'react-icons/fa';
import { useControl } from "@/hooks/useControl";
import { useState } from "react";

export function Control() {
  const { typeSelected, onSetTypeSelected } = useControl()

  const isActiveFilled = typeSelected === 'filled'
  
  return (
    <Flex bg={'gray.100'} borderRadius={'full'} gap={5}>
      <Flex bg={!isActiveFilled ?  'white' : 'transparent'} onClick={() => onSetTypeSelected('unfilled')} cursor='pointer' borderRadius={'50%'} padding="1rem">
        <IconButton _active={{}}  aria-label="closeIcon" bg={'transparent'} icon={<RiCloseFill size={32} />} _hover={{}} />
      </Flex>
      <Flex bg={isActiveFilled ?  'white' : 'transparent'} onClick={() => onSetTypeSelected('filled')} cursor='pointer' borderRadius={'50%'} padding="1rem">
        <IconButton _active={{}}  aria-label="FilledIcon" bg={'transparent'} icon={<FaStop size={32} />} _hover={{}} />
      </Flex>
    </Flex>
  )
}