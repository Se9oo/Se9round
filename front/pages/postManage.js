import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MainLayout from '../components/MainLayout';
import { loadManagePostsRequestAction } from '../reducers/post';

import { Heading } from '@chakra-ui/react';
import PostManageTab from '../components/tab/PostManageTab';

const postManage = () => {
  const dispatch = useDispatch('');
  const { tempPostList, cancelPostList } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(loadManagePostsRequestAction());
  }, []);

  return (
    <MainLayout>
      <Heading as="h1" mb="2rem">
        게시글 관리
      </Heading>
      <PostManageTab tempPostList={tempPostList} cancelPostList={cancelPostList} />
    </MainLayout>
  );
};

export default postManage;
