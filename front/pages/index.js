import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { loadPostsRequestAction } from '../reducers/post';

import { Flex, useBreakpointValue } from '@chakra-ui/react';

import MainLayout from '../components/MainLayout';
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

  const dispatch = useDispatch('');

  useEffect(() => {
    dispatch(loadPostsRequestAction());
  }, []);

  return (
    <MainLayout>
      <Flex w="100%">
        <PostList />
        {display === 'block' && <TagList />}
      </Flex>
    </MainLayout>
  );
};

export default Se9round;
