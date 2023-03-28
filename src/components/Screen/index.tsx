import { useControl } from "@/hooks/useControl";
import { Button, Flex, Modal, ModalBody, ModalContent, ModalHeader, useToken } from "@chakra-ui/react";
import { AiFillHeart } from 'react-icons/ai';
import { Canvas } from "../Canvas";
import { Control } from "../Control";

const Hearts = () => {
  const { lives } = useControl()
  const [red500, gray500] = useToken('colors', ['red.500', 'gray.200'])
  const heartIcons = Array(3).fill({}).map((_, i) => {
    const color = i < lives ? red500 : gray500;
    return <AiFillHeart size={52} color={color} key={i} />;
  });
  return (
    <Flex>
      {heartIcons}
    </Flex>
  );
};

export function Screen() {
  const { lives, onReset } = useControl()
  const [red500] = useToken('colors', ['red.500'])
  return (
    <Flex flexDirection={'column'} gap="8" width={'100%'} height="100vh" justify={'center'} align='center'>
      <Hearts />
      <Canvas />
      <Control />
      <Modal size={'xs'} isCentered isOpen={!lives} onClose={() => null}>
        <ModalContent>
          <ModalHeader textAlign={'center'}>
            Sem Vidas!
          </ModalHeader>
          <ModalBody>
            <Flex flexDir={'column'} gap={8} justify={'center'} alignItems='center' height={40}>
              <AiFillHeart size={52} color={red500} />
              <Button colorScheme={'blue'} onClick={onReset}>Recomeçar</Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  )
}