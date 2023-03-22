import { Flex } from "@chakra-ui/react";
import { Hint } from "../Hint";

interface RowHintsProps {
  hints: number[]
}

export function RowHints({ hints }: RowHintsProps) {
  return (
      <Flex border='2px solid' bg='gray.100' alignItems={'center'} borderRadius='lg' borderColor={'gray.200'} w='109px' h={'45px'}>
        {hints?.map((tip, index) => (
          <Hint key={`${tip}-${index}`}>{tip}</Hint>
        ))}
    </Flex>
  )
}