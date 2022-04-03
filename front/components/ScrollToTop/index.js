import React from 'react';

import { ArrowUpIcon } from '@chakra-ui/icons';

const ScrollToTop = () => {
  const handleScrollToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <ArrowUpIcon
      position="fixed"
      top="90%"
      fontSize="2.5rem"
      color="white"
      backgroundColor="brown"
      borderRadius="999px"
      boxShadow="md"
      cursor="pointer"
      _hover={{
        backgroundColor: 'white',
        color: 'brown',
        transition: 'all .2s ease',
      }}
      onClick={handleScrollToTop}
    />
  );
};

export default ScrollToTop;
