import { Level } from "@/components/Screen/levels";


export function getFilledByColumn(level: Level[], filterIds: number[]) {
  const array = level.filter(item => filterIds.includes(item.id))
  let number: number = 0

  const numberOfFilled = array.reduce((acc, value, index, array) => {
    if (value.type === 'filled') {
      number ++ 
      if (array[index - 1]?.type === 'unfilled' && !number) {
        acc.push(number)
      }
      if (array[index + 1]?.type === undefined) {
        acc.push(number)
      }
    } else {
      if (number) acc.push(number)
  
      number = 0
    }
    return acc
  }, [] as number[]);

  return numberOfFilled
}
