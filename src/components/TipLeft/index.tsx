import { Flex, Text } from "@chakra-ui/react";
import { Tip } from "../Tip";

export function TipLeft() {
  return (
      <Flex border='2px solid' bg='gray.100' alignItems={'center'} borderRadius='lg' borderColor={'gray.200'} w='109px' h={'45px'}>
        <Tip>1</Tip>
        <Tip>2</Tip>
        <Tip>3</Tip>
        <Tip>4</Tip>
    </Flex>
  )
}