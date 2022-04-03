import React from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { loadPostRequestAction } from '../../../reducers/post';
import { checkIsAdminRequestAction } from '../../../reducers/user';

import MainLayout from '../../../components/MainLayout';
import PostViewer from '../../../components/viewer/PostViewer';
import PostList from '../../../components/post/PostList';
import PageHead from '../../../components/head/PageHead';

// store
import wrapper from '../../../store/configureStore';
import axios from 'axios';

import { Box, Heading } from '@chakra-ui/react';

const PostView = () => {
  const { loadPostInfo } = useSelector((state) => state.post);
  const { title, contents, tags, reg_dt, relatedPosts, sub_title, thumbnail } = loadPostInfo;

  return (
    <>
      <PageHead title={title} description={sub_title} keywords={tags} thumbnail={thumbnail} />
      <MainLayout>
        <Box maxW="768px" m="0 auto">
          <PostViewer title={title} contents={contents} tags={tags} reg_dt={reg_dt} />
          {relatedPosts && relatedPosts.length > 0 && (
            <>
              <Heading
                as="h3"
                fontSize="1.5rem"
                borderLeftColor="brown"
                borderLeftWidth="3px"
                borderLeftStyle="solid"
                mb="1rem"
                p="0 .5rem"
              >
                관련 포스트
              </Heading>
              <PostList postList={relatedPosts} />
            </>
          )}
        </Box>
      </MainLayout>
    </>
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
