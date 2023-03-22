import { useControl } from "@/hooks/useControl";
import { getFilledByColumn } from "@/utils/getFilledByColumn";
import { Flex } from "@chakra-ui/react";
import { Box } from "../Box";
import { level } from "../Screen/levels";
import { TipLeft } from "../TipLeft";
import { TipTop } from "../TipTop";

export function Canva() {
  const { columnTip, lineTip } = useControl()
  return (
    <Flex align={'flex-end'}>
        <Flex gap={'4px'} justifyContent='center' marginBlockEnd={1} h='480px' flexDir={'column'} marginInlineEnd='4px'>
          {lineTip.map((tip, index) => (
            <TipLeft key={`${tip[0]}-${index}`} tips={tip} />
          ))}
        </Flex>
      <Flex flexDirection={'column'}>
        <Flex gap={'4px'} justifyContent='center' marginBlockEnd={1}>
          {columnTip.map((tip, index) => (
            <TipTop key={`${tip[0]}-${index}`} tips={tip} />
          ))}
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