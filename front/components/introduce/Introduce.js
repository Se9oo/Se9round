import React from 'react';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

const Introduce = () => {
  return (
    <Flex w="100%" flexDir="column" alignItems="center">
      <Box bg="brown" borderRadius="9999px;">
        <Image w="13rem" src="/assets/images/profile.png" alt="profile-image" borderRadius="9999px" />
      </Box>
      <Text color="gray.400" fontSize="1rem" fontWeight="300" p="1rem 0">
        se9round.dev
      </Text>
    </Flex>
  );
};

export default Introduce;
