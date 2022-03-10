import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { loadPostsRequestAction } from '../reducers/post';

import MainLayout from '../components/MainLayout';
import PostList from '../components/post/PostList';

const Se9round = () => {
  const dispatch = useDispatch('');

  useEffect(() => {
    dispatch(loadPostsRequestAction());
  }, []);

  return (
    <MainLayout>
      <PostList />
    </MainLayout>
  );
};

export default Se9round;
