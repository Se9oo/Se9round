import React from 'react';
import { useSelector } from 'react-redux';

import { loadPostsRequestAction } from '../reducers/post';
import { checkIsAdminRequestAction } from '../reducers/user';

import MainLayout from '../components/MainLayout';
import Introduce from '../components/introduce/Introduce';
import PostList from '../components/post/PostList';
import Pagination from '../components/pagination';

import { Box, Divider } from '@chakra-ui/react';

import axios from 'axios';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';

const Home = () => {
  const { postList, pagination } = useSelector((state) => state.post);

  return (
    <MainLayout>
      <Box m="1rem 0">
        <Introduce />
      </Box>
      <Divider mb="2rem" />
      <PostList postList={postList} />
      <Pagination pagination={pagination} />
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {
  const { page } = etc.query;

  // header에 cookie 넣어주기
  const cookies = req ? req.headers.cookie : '';

  axios.defaults.headers.Cookie = '';

  if (req && cookies) {
    axios.defaults.headers.Cookie = cookies;
  }

  // 게시글 목록
  store.dispatch(checkIsAdminRequestAction());
  store.dispatch(loadPostsRequestAction({ page: page ? page : 1 }));
  store.dispatch(END);

  await store.sagaTask.toPromise();
});

export default Home;
