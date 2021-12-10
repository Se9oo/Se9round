import React from 'react';

import { Box, useBreakpointValue } from '@chakra-ui/react';

import Header from './Header';

const MainLayout = ({ children }) => {
  const margin = useBreakpointValue({
    xxs: '4rem 0',
    xs: '4rem 0',
    sm: '4rem 0',
    md: '4rem 0',
    lg: '4rem 0',
    xl: '4rem auto',
    xxl: '4rem auto',
    '2xl': '4rem auto',
  });

  return (
    <Box w="100%" position="relative">
      <Header />
      <Box w={['100%', '100%', '100%', '100%', '100%', '85%', '85%']} maxW="1400px" m={margin} p="1rem">
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
