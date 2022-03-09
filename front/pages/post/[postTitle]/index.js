import React from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { loadPostRequestAction } from '../../../reducers/post';
import { checkIsAdminRequestAction } from '../../../reducers/user';

import MainLayout from '../../../components/MainLayout';
import PostViewer from '../../../components/viewer/PostViewer';

// store
import wrapper from '../../../store/configureStore';
import axios from 'axios';
import TOC from '../../../components/toc';

const PostView = () => {
  const { loadPostInfo } = useSelector((state) => state.post);

  return (
    <MainLayout>
      <PostViewer title={loadPostInfo.title} contents={loadPostInfo.contents} tags={loadPostInfo.tags} />
      <TOC title={loadPostInfo.title} contents={loadPostInfo.contents} />
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
