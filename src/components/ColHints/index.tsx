import { Flex } from "@chakra-ui/react";
import { Hint } from "../Hint";

interface ColHintsProps {
  hints: number[]
}

export function ColHints({ hints }: ColHintsProps) {
  return (
      <Flex flexDir={'column'} border='2px solid' bg='gray.100' alignItems={'center'} borderRadius='lg' borderColor={'gray.200'} w={'45px'}>
        {hints?.map(tip => (
          <Hint key={tip}>{tip}</Hint>
        ))}
    </Flex>
  )
}