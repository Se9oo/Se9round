import React from 'react';

import { Flex, Spinner } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Flex w="100%" flexDir="column" justifyContent="center" alignItems="center">
      <Spinner thickness="6px" speed="1s" emptyColor="gray.200" color="brown" size="xl" mb="1rem" />
    </Flex>
  );
};

export default Loading;
