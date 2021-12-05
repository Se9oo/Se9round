import React from 'react';

import { Flex, useBreakpointValue } from '@chakra-ui/react';

import PostCard from './PostCard';

const PostList = () => {
  const postList = Array.from({ length: 20 }, () => Array(20).fill(0));

  const width = useBreakpointValue({
    xxs: '100%',
    xs: '100%',
    sm: '100%',
    md: '100%',
    lg: '90%',
    xl: '85%',
    xxl: '85%',
    '2xl': '75%',
  });

  return (
    <Flex flexDir="column" w={width}>
      <Flex flexWrap="wrap">
        {postList.map((post) => {
          return <PostCard />;
        })}
      </Flex>
    </Flex>
  );
};

export default PostList;
