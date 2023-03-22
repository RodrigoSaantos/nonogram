import { Level, LevelProps, level as Nivel } from "@/components/Screen/levels";

interface MergeBlockProps {
  array: LevelProps;
  keys: Array<keyof LevelProps>;
}

function concatArrays(arrays: number[][][]) {
  return arrays.reduce((acc, cur) => {
    return acc.concat([...cur]);
  }, []);
}

function mergeBlock({ array, keys }: MergeBlockProps) {
  let result: Level[] = [];
  keys.forEach((key) => {
    result = result.concat(array[key]);
  });
  return result;
}

function getNumberOfFilled(array: Level[]) {
  let number: number = 0;

  return array.reduce((acc, value, index, array) => {
    if (value.type === "filled") {
      number++;
      if (array[index - 1]?.type === "unfilled" && !number) {
        acc.push(number);
      }
      if (array[index + 1]?.type === undefined) {
        acc.push(number);
      }
    } else {
      if (number) acc.push(number);

      number = 0;
    }
    return acc;
  }, [] as number[]);
}

interface GetTipByBlockProps {
  array: LevelProps
}

function getTipByBlock(props: GetTipByBlockProps) {
  const firstBlock = ["a", "b", "c", "d", "e"] as const;
  const secondBlock = ["f", "g", "h", "i", "j"] as const;
  const allBlock = [firstBlock, secondBlock]
  const columns = {
    a: [1, 11, 21, 31, 41, 51, 61, 71, 81, 91],
    b: [2, 12, 22, 32, 42, 52, 62, 72, 82, 92],
    c: [3, 13, 23, 33, 43, 53, 63, 73, 83, 93],
    d: [4, 14, 24, 34, 44, 54, 64, 74, 84, 94],
    e: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95],
    f: [6, 16, 26, 36, 46, 56, 66, 76, 86, 96],
    g: [7, 17, 27, 37, 47, 57, 67, 77, 87, 97],
    h: [8, 18, 28, 38, 48, 58, 68, 78, 88, 98],
    i: [9, 19, 29, 39, 49, 59, 69, 79, 89, 99],
    j: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  };

  const resultAllBlock = allBlock.map((block, index) => {
    const columnResult = block.map((column) => {
      const array = mergeBlock({
        array: props.array,
        keys: !index ? ['a', 'c'] : ['b', 'd']
      }).filter((item) => columns[column]?.includes(item.id));
      let number: number = 0;
  
      const numberOfFilled = getNumberOfFilled(array)
  
      return numberOfFilled;
    }, {});
    return columnResult
  }, []);

  return concatArrays(resultAllBlock)
}

function getTipByBlockLine(props: GetTipByBlockProps) {
  const firstBlock = ["1", "2", "3", "4", "5"] as const;
  const secondBlock = ["6", "7", "8", "9", "10"] as const;
  const allBlock = [firstBlock, secondBlock]
  const lines = {
    '1': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    '2': [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    '3': [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    '4': [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    '5': [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
    '6': [51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
    '7': [61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
    '8': [71, 72, 73, 74, 75, 76, 77, 78, 79, 80],
    '9': [81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
    '10': [91, 92, 93, 94, 95, 96, 97, 98, 99, 100],
  };

  const resultAllBlock = allBlock.map((block, index) => {
    const lineResult = block.map((line) => {
      const array = mergeBlock({
        array: props.array,
        keys: !index ? ['a', 'b'] : ['c', 'd']
      }).filter((item) => lines[line]?.includes(item.id));
  
      const numberOfFilled = getNumberOfFilled(array)
  
      return numberOfFilled;
    }, {});
    return lineResult
  }, []);

  return concatArrays(resultAllBlock)
}

export function getTipByColumn(level: LevelProps) {
  const columnTips = getTipByBlock({
    array: level,
  });

  return columnTips;
}

export function getTipByLine(level: LevelProps) {
  const lineTips = getTipByBlockLine({
    array: level,
  });

  return lineTips;
}


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
