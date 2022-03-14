import React from 'react';

import { Flex, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <footer>
      <Flex w="100%" h="4rem" justifyContent="center" alignItems="center" bgColor="brown">
        <Text color="white" fontWeight="700">
          Copyright &copy; 2022 se9oo All Rights Reserved.
        </Text>
      </Flex>
    </footer>
  );
};

export default Footer;
