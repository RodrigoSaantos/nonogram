import { useControl } from "@/hooks/useControl";
import { Box, Flex } from "@chakra-ui/react";
import { Cell } from "../Cell";
import { gamePuzzle, Puzzle } from "../Screen/puzzle";
import { RowHints } from "../RowHints";
import { ColHints } from "../ColHints";

export function Canvas() {
  const { colHint, rowHint } = useControl()
  return (
    <Flex align={'flex-end'}>
      <Flex
        gap={'4px'}
        justifyContent='center'
        marginBlockEnd={1} h='480px'
        flexDir={'column'}
        marginInlineEnd='4px'
      >
        {rowHint.map((hint, index) => (
          <RowHints key={`${hint[0]}-${index}`} hints={hint} />
        ))}
      </Flex>
      <Flex flexDirection={'column'}>
        <Flex gap={'4px'} justifyContent='center' marginBlockEnd={1}>
          {colHint.map((hint, index) => (
            <ColHints key={`${hint[0]}-${index}`} hints={hint} />
          ))}
        </Flex>
        <Box
          display={'grid'}
          gridTemplateColumns="repeat(2, 1fr)"
          border='2px solid'
        >
          {Object.values(gamePuzzle).map((puzzles: Puzzle[]) => (
            <Box key={puzzles[0].id} border="2px solid" display="grid" gridTemplateColumns="repeat(5, 1fr)">
              {puzzles.map((puzzle: Puzzle) => <Cell key={puzzle.id} data={puzzle} />)}
            </Box>
          ))}
        </Box>
      </Flex>
    </Flex>
  )
}