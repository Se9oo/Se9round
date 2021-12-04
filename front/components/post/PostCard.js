import React from 'react';

import { Flex, Box, Heading, Text, useBreakpointValue } from '@chakra-ui/react';

const PostCard = () => {
  const postWidth = useBreakpointValue({
    xxs: '100%',
    xs: '100%',
    sm: '100%',
    md: 'calc(50% - 1rem)',
    lg: 'calc(50% - 2rem)',
    xl: 'calc(50% - 2rem)',
    xxl: 'calc(33% - 2rem)',
    '2xl': 'calc(33% - 2rem)',
  });

  const margin = useBreakpointValue({
    xxs: '.5rem 0',
    xs: '.5rem 0',
    sm: '.5rem 0',
    md: '.5rem',
    lg: '.5rem',
    xl: '.5rem',
    xxl: '.5rem',
  });

  return (
    <Flex
      w={postWidth}
      flexDir="column"
      bg="white"
      m={margin}
      p="10px"
      boxShadow="sm"
      borderRadius="md"
      cursor="pointer"
      _hover={{
        transform: 'translateY(-.2rem)',
        transition: 'all .2s ease',
        boxShadow: 'lg',
      }}
    >
      <Box h="200px">이미지</Box>
      <Heading as="h2" fontSize="1.2rem" mb="1rem">
        Lorem Ipsum
      </Heading>
      <Text fontSize="1rem" mb="5px" isTruncated>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s,
      </Text>
      <Text fontSize="sm">2021.11.28</Text>
    </Flex>
  );
};

export default PostCard;
