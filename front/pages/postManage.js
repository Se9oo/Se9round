import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Heading } from '@chakra-ui/react';
import { loadManagePostsRequestAction } from '../reducers/post';

import MainLayout from '../components/MainLayout';
import PostManageTab from '../components/tab/PostManageTab';
import Error from './_error';

const postManage = () => {
  const dispatch = useDispatch('');
  const { tempPostList, cancelPostList } = useSelector((state) => state.post);
  const { isAdmin } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadManagePostsRequestAction());
  }, []);

  return (
    <>
      {isAdmin ? (
        <MainLayout>
          <Heading as="h1" mb="2rem">
            게시글 관리
          </Heading>
          <PostManageTab tempPostList={tempPostList} cancelPostList={cancelPostList} />
        </MainLayout>
      ) : (
        <Error statusCode="401" />
      )}
    </>
  );
};

export default postManage;
