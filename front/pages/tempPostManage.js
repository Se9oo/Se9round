import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MainLayout from '../components/MainLayout';
import PostList from '../components/post/PostList';
import { loadTempPostsRequestAction } from '../reducers/post';

import { Heading } from '@chakra-ui/react';

const TempPostManage = () => {
  const dispatch = useDispatch('');
  const { tempPostList } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(loadTempPostsRequestAction());
  }, []);

  return (
    <MainLayout>
      <Heading as="h1" mb="2rem">
        임시 게시글 목록
      </Heading>
      <PostList postList={tempPostList} />
    </MainLayout>
  );
};

export default TempPostManage;
