import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { loadPostsRequestAction } from '../reducers/post';

import MainLayout from '../components/MainLayout';
import PostList from '../components/post/PostList';

const Se9round = () => {
  const dispatch = useDispatch('');
  const { postList } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(loadPostsRequestAction());
  }, []);

  return (
    <MainLayout>
      <PostList postList={postList} />
    </MainLayout>
  );
};

export default Se9round;
