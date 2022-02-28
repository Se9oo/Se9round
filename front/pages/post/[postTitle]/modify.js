import React from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

import MainLayout from '../../../components/MainLayout';
import EditorForm from '../../../components/editor/EditorForm';

import { checkIsAdminRequestAction } from '../../../reducers/user';
import { loadPostRequestAction } from '../../../reducers/post';

import wrapper from '../../../store/configureStore';
import axios from 'axios';

const Modify = () => {
  const { loadPostInfo } = useSelector((state) => state.post);

  return (
    <MainLayout>
      <EditorForm mode="modify" loadPostInfo={loadPostInfo} />
    </MainLayout>
  );
};

// SSR
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {
  const { postTitle } = etc.query;

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

export default Modify;
