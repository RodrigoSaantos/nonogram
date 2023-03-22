import { Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface HintProps {
  children: ReactNode;
}

export function Hint(props: HintProps) {
  return (
    <Text display={'flex'} w='100%' justifyContent={'center'}>
      {props.children}
    </Text>
  )
}