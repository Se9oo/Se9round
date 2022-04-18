import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { addClickCountRequestAction, loadPostRequestAction } from '../../../reducers/post';
import { checkIsAdminRequestAction } from '../../../reducers/user';

import PageHead from '../../../components/head/PageHead';
import MainLayout from '../../../components/MainLayout';
import PostViewer from '../../../components/viewer/PostViewer';
import Utterances from '../../../components/utterances/utterances';
import RelatedPostList from '../../../components/post/RelatedPostList';

import { Box } from '@chakra-ui/react';
// store
import wrapper from '../../../store/configureStore';
import axios from 'axios';

const PostView = () => {
  const dispatch = useDispatch('');
  const { loadPostInfo } = useSelector((state) => state.post);
  const { title, contents, tags, reg_dt, relatedPosts, sub_title, thumbnail } = loadPostInfo;

  useEffect(() => {
    // 조회수 add
    dispatch(addClickCountRequestAction({ postId: loadPostInfo.id }));
  }, []);

  return (
    <>
      <PageHead title={title} description={sub_title} keywords={tags} thumbnail={thumbnail} />
      <MainLayout>
        <Box maxW="768px" m="0 auto">
          <PostViewer title={title} contents={contents} tags={tags} reg_dt={reg_dt} />
          <Utterances />
          <RelatedPostList postList={relatedPosts} />
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

  const { post, user } = store.getState();
  const { loadPostInfo } = post;

  // 페이지 정보 없는 경우 or 게시글이 취소 혹은 삭제 상태인 경우
  if (Object.keys(loadPostInfo).length === 0 || (!user.isAdmin && loadPostInfo.status !== 1)) {
    return {
      redirect: {
        destination: '/404',
      },
    };
  }
});

export default PostView;
