import { getFilledByColumn } from "@/utils/getFilledByColumn";
import { Flex } from "@chakra-ui/react";
import { Box } from "../Box";
import { level } from "../Screen/levels";
import { TipLeft } from "../TipLeft";
import { TipTop } from "../TipTop";

export function Canva() {
  return (
    <Flex align={'flex-end'}>
        <Flex gap={'4px'} justifyContent='center' marginBlockEnd={1} h='480px' flexDir={'column'} marginInlineEnd='4px'>
          <TipLeft />
          <TipLeft />
          <TipLeft />
          <TipLeft />
          <TipLeft />
          <TipLeft />
          <TipLeft />
          <TipLeft />
          <TipLeft />
          <TipLeft />
        </Flex>
      <Flex flexDirection={'column'}>
        <Flex gap={'4px'} justifyContent='center' marginBlockEnd={1}>
          <TipTop tips={getFilledByColumn(level.a.concat(level.c), [1,6,11, 16, 21])} />
          <TipTop tips={[]} />
          <TipTop tips={[]} />
          <TipTop tips={[]} />
          <TipTop tips={[]} />
          <TipTop tips={[]} />
          <TipTop tips={[]} />
          <TipTop tips={[]} />
          <TipTop tips={[]} />
          <TipTop tips={[]} />
        </Flex>
        <Flex display={'grid'} gridTemplateColumns="repeat(2, 1fr)" border='2px solid'>
          <Flex border="2px solid" display={'grid'} gridTemplateColumns="repeat(5, 1fr)">
            {level.a.map(box => (
              <Box key={box.id} data={box} />
            ))}
          </Flex>
          <Flex border="2px solid" display={'grid'} gridTemplateColumns="repeat(5, 1fr)">
            {level.b.map(box => (
              <Box key={box.id} data={box} />
            ))}
          </Flex>
          <Flex border="2px solid" display={'grid'} gridTemplateColumns="repeat(5, 1fr)">
            {level.c.map(box => (
              <Box key={box.id} data={box} />
            ))}
          </Flex>
          <Flex border="2px solid" display={'grid'} gridTemplateColumns="repeat(5, 1fr)">
            {level.d.map(box => (
              <Box key={box.id} data={box} />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}