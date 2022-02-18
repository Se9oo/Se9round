import React from 'react';

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

const Alert = ({ alertProps, isOpen, onClose }) => {
  const buttonSize = useBreakpointValue({
    xxs: 'sm',
    xs: 'sm',
    sm: 'sm',
    md: 'sm',
    lg: 'md',
    xl: 'md',
    xxl: 'md',
    '2xl': 'md',
  });

  const { title, contents, mod, actionText, btnAction } = alertProps;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text>{contents}</Text>
        </ModalBody>

        <ModalFooter>
          {mod === 'action' && (
            <Button size={buttonSize} m="1rem .1rem" onClick={btnAction}>
              {actionText}
            </Button>
          )}
          <Button size={buttonSize} bg={mod === 'action' ? 'gray.300' : 'brown'} m="1rem 0" onClick={onClose}>
            닫기
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Alert;
