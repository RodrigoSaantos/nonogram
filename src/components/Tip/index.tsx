import { Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface TipProps {
  children: ReactNode;
}

export function Tip(props: TipProps) {
  return (
    <Text display={'flex'} w='100%' justifyContent={'center'}>
      {props.children}
    </Text>
  )
}