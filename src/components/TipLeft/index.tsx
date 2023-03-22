import { Flex, Text } from "@chakra-ui/react";
import { Tip } from "../Tip";

interface TipLeftProps {
  tips: number[]
}

export function TipLeft(props: TipLeftProps) {
  return (
      <Flex border='2px solid' bg='gray.100' alignItems={'center'} borderRadius='lg' borderColor={'gray.200'} w='109px' h={'45px'}>
        {props.tips?.map((tip, index) => (
          <Tip key={`${tip}-${index}`}>{tip}</Tip>
        ))}
    </Flex>
  )
}