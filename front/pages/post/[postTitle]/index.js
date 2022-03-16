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
    lg: '100%',
    xl: '65%',
    xxl: '65%',
    '2xl': '65%',
  });

  const display = useBreakpointValue({
    xxs: 'none',
    xs: 'none',
    sm: 'none',
    md: 'none',
    lg: 'none',
    xl: 'none',
    xxl: 'block',
    '2xl': 'block',
  });

  const { loadPostInfo } = useSelector((state) => state.post);
  const { title, contents, tags, reg_dt, relatedPosts } = loadPostInfo;

  return (
    <MainLayout>
      <Box w={width} m="0 auto">
        <PostViewer title={title} contents={contents} tags={tags} reg_dt={reg_dt} />
        {relatedPosts && relatedPosts.length > 0 && <RelatedPosts list={relatedPosts} />}
        <Box display={display}>
          <TOC title={title} contents={contents} />
          <ScrollToTop />
        </Box>
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
