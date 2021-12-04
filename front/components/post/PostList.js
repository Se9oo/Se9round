import React from 'react';

import { Flex, Heading } from '@chakra-ui/react';

import PostCard from './PostCard';

const PostList = () => {
  const postList = Array.from({ length: 20 }, () => Array(20).fill(0));

  return (
    <Flex flexDir="column" w="75%">
      <Heading as="h2" fontSize="2rem" p="10px">
        Posts
      </Heading>
      <Flex flexWrap="wrap">
        {postList.map((post) => {
          return <PostCard />;
        })}
      </Flex>
    </Flex>
  );
};

export default PostList;
