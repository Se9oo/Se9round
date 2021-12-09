import React from 'react';
import { useSelector } from 'react-redux';

import { Flex, useBreakpointValue } from '@chakra-ui/react';

import PostCard from './PostCard';

const PostList = () => {
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

  const { postList } = useSelector((state) => state.post);

  return (
    <Flex flexDir="column" w={width}>
      <Flex flexWrap="wrap">
        {postList.map((post) => {
          return <PostCard key={post.id} post={post} />;
        })}
      </Flex>
    </Flex>
  );
};

export default PostList;
