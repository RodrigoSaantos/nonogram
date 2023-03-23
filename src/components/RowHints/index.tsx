
import { Flex, Text } from "@chakra-ui/react";

interface RowHintsProps {
  hints: number[];
  isDisabled: boolean;
}

export function RowHints({ hints, isDisabled }: RowHintsProps) {
  return (
    <Flex border='2px solid' bg='gray.100' alignItems={'center'} justifyContent='flex-end' borderRadius='lg' borderColor={'gray.200'} w='96px' h={'45px'} p={'5px'}>
      {hints?.map((hint, index) => (
        <Text opacity={isDisabled ? 0.5 : 1} key={`${hint}-${index}`} display={'flex'} w='100%' justifyContent={'flex-end'} maxW={'20px'}>
          {hint}
        </Text>
      ))}
    </Flex>
  )
}