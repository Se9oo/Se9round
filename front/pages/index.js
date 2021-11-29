import React from 'react';

import { Box, Heading } from '@chakra-ui/react';

import Header from '../components/Header';
import PostList from '../components/post/PostList';

const Se9round = () => {
  return (
    <Box w="100%" h="100vh" p="0" position="relative">
      <Header />
      <Box w={['100%', '100%', '90%', '85%', '85%']} maxW="1200px" m="4rem auto 0" mt="4rem" p="1rem">
        <Heading as="h2" fontSize="2rem" p="10px">
          Posts
        </Heading>
        <PostList />
      </Box>
    </Box>
  );
};

export default Se9round;
