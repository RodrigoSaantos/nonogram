import { Flex } from "@chakra-ui/react";
import { Canva } from "../Canva";
import { Control } from "../Control";

export function Screen() {
  return (
    <Flex flexDirection={'column'} gap="8" width={'100%'} height="100vh" justify={'center'} align='center'>
      <Canva />
      <Control />
    </Flex>
  )
}