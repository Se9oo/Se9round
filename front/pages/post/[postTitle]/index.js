import React from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { loadPostRequestAction } from '../../../reducers/post';
import { checkIsAdminRequestAction } from '../../../reducers/user';

import MainLayout from '../../../components/MainLayout';
import PostViewer from '../../../components/viewer/PostViewer';
import TOC from '../../../components/toc';
import ScrollToTop from '../../../components/ScrollToTop';

// store
import wrapper from '../../../store/configureStore';
import axios from 'axios';
import RelatedPosts from '../../../components/post/RelatedPosts';

import { Box, useBreakpointValue } from '@chakra-ui/react';

const PostView = () => {
  const width = useBreakpointValue({
    xxs: '100%',
    xs: '100%',
    sm: '100%',
    md: '100%',
    lg: '80%',
    xl: '75%',
    xxl: '75%',
    '2xl': '65%',
  });

  const { loadPostInfo } = useSelector((state) => state.post);

  return (
    <MainLayout>
      <Box w={width} m="0 auto">
        <PostViewer title={loadPostInfo.title} contents={loadPostInfo.contents} tags={loadPostInfo.tags} />
        {loadPostInfo && loadPostInfo.relatedPosts.length > 0 && <RelatedPosts list={loadPostInfo.relatedPosts} />}
        <TOC title={loadPostInfo.title} contents={loadPostInfo.contents} />
        <ScrollToTop />
      </Box>
    </MainLayout>
  );
};

// SSR
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {
  let { postTitle } = etc.query;

  // header에 cookie 넣어주기
  const cookies = req ? req.headers.cookie : '';

  axios.defaults.headers.Cookie = '';

  if (req && cookies) {
    axios.defaults.headers.Cookie = cookies;
  }

  // 게시글 내용
  store.dispatch(checkIsAdminRequestAction());
  store.dispatch(loadPostRequestAction({ postTitle }));

  store.dispatch(END);

  await store.sagaTask.toPromise();
});

export default PostView;
