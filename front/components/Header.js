import React from 'react';

import { Box } from '@chakra-ui/react';

const Header = () => {
  return (
    <header>
      <Box w="100%" h="3rem" position="fixed" top="0" left="0" bg="white" boxShadow="sm" />
    </header>
  );
};

export default Header;
