import React from 'react';

import { Box, useBreakpointValue } from '@chakra-ui/react';

import Header from './Header';
import Footer from './footer';

const MainLayout = ({ children }) => {
  const margin = useBreakpointValue({
    xxs: '4rem 0 0',
    xs: '4rem 0 0',
    sm: '4rem 0 0',
    md: '4rem 0 0',
    lg: '4rem auto 0',
    xl: '4rem auto 0',
    xxl: '4rem auto 0',
    '2xl': '4rem auto 0',
  });

  return (
    // height = (100vh - header - footer - contents padding)
    <Box w="100%" h="calc(100vh - 3rem - 4rem - 1rem)" position="relative">
      <Header />
      <Box
        w={['100%', '100%', '100%', '100%', '100%', '90%', '90%']}
        maxW="1400px"
        h="auto"
        minH="100%"
        m={margin}
        p="1rem"
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
