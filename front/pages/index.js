import React from 'react';

import { Box, Heading, Flex } from '@chakra-ui/react';

import Header from '../components/Header';
import PostList from '../components/post/PostList';
import TagList from '../components/tag/TagList';

const Se9round = () => {
  return (
    <Box w="100%" h="100vh" p="0" position="relative">
      <Header />
      <Box w={['100%', '100%', '90%', '85%', '85%']} maxW="1400px" m="4rem auto 0" mt="4rem" p="1rem">
        <Flex w="100%">
          <PostList />
          <TagList />
        </Flex>
      </Box>
    </Box>
  );
};

export default Se9round;
