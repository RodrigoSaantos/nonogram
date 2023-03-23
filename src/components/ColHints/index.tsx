import { Flex, Text } from "@chakra-ui/react";

interface ColHintsProps {
  hints: number[]
  isDisabled: boolean;
}

export function ColHints({ hints, isDisabled }: ColHintsProps) {
  return (
      <Flex flexDir={'column'} border='2px solid' bg='gray.100' alignItems={'center'} borderRadius='lg' borderColor={'gray.200'} w={'45px'} h={'96px'} justifyContent="flex-end">
        {hints?.map(hint => (
          <Text opacity={isDisabled ? 0.5 : 1} key={hint} display={'flex'} w='100%' justifyContent={'center'}>
            {hint}
          </Text>
        ))}
    </Flex>
  )
}