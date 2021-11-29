import React from 'react';

import { Box } from '@chakra-ui/react';

const Header = () => {
  return (
    <nav>
      <Box w="100%" h="3rem" position="fixed" top="0" left="0" bg="white" pb="3rem" mb="3rem" />
    </nav>
  );
};

export default Header;
