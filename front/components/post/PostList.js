import React from 'react';

import { Flex } from '@chakra-ui/react';

import PostCard from './PostCard';

const PostList = () => {
  const postList = Array.from({ length: 20 }, () => Array(20).fill(0));
  return (
    <Flex w="100%" flexWrap="wrap">
      {postList.map((post) => {
        return <PostCard />;
      })}
    </Flex>
  );
};

export default PostList;
