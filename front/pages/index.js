import React from 'react';

import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';

import Header from '../components/Header';
import PostList from '../components/post/PostList';
import TagList from '../components/tag/TagList';

const Se9round = () => {
  const display = useBreakpointValue({
    xxs: 'none',
    xs: 'none',
    sm: 'none',
    md: 'none',
    lg: 'block',
    xl: 'block',
    xxl: 'block',
    '2xl': 'block',
  });

  const margin = useBreakpointValue({
    xxs: '4rem 0 0',
    xs: '4rem 0 0',
    sm: '4rem 0 0',
    md: '4rem 0 0',
    lg: '4rem 0 0',
    xl: '4rem auto 0',
    xxl: '4rem auto 0',
    '2xl': '4rem auto 0',
  });

  return (
    <Box w="100%" h="100vh" p="0" position="relative">
      <Header />
      <Box w={['100%', '100%', '100%', '100%', '100%', '85%', '85%']} maxW="1400px" m={margin} p="1rem">
        <Flex w="100%">
          <PostList />
          {display === 'block' && <TagList />}
        </Flex>
      </Box>
    </Box>
  );
};

export default Se9round;
