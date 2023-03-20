import { Flex, Text } from "@chakra-ui/react";
import { Tip } from "../Tip";

interface TipTopProps {
  tips: number[]
}

export function TipTop(props: TipTopProps) {
  return (
      <Flex flexDir={'column'} border='2px solid' bg='gray.100' alignItems={'center'} borderRadius='lg' borderColor={'gray.200'} w={'45px'}>
        {props.tips?.map(tip => (
          <Tip key={tip}>{tip}</Tip>
        ))}
    </Flex>
  )
}