import { all, fork, put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  SAVE_POST_SUCCESS,
  SAVE_POST_FAILURE,
  SAVE_POST_REQUEST,
} from '../reducers/post';

// 게시글 목록 조회
function loadPostsAPI() {
  return axios.get('/api/posts');
}

function* loadPosts() {
  try {
    //const result = call(loadPostsAPI);
    const result = {
      data: [
        {
          id: 1,
          title: '테스트',
          contents: '테스트테스트',
          reg_dt: '2021-12-05',
          status: 1,
        },
        {
          id: 2,
          title: '테스트',
          contents: '테스트테스트',
          reg_dt: '2021-12-05',
          status: 1,
        },
        {
          id: 3,
          title: '테스트',
          contents: '테스트테스트',
          reg_dt: '2021-12-05',
          status: 1,
        },
      ],
    };

    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      err: err.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

// 게시글 저장
function savePostAPI(data) {
  axios.post('/api/post', data);
}

function* savePost(data) {
  try {
    console.log(data);
    //call(savePostAPI, data);
    yield put({
      type: SAVE_POST_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SAVE_POST_FAILURE,
      err: err.response.data,
    });
  }
}

function* watchSavePost() {
  yield takeLatest(SAVE_POST_REQUEST, savePost);
}

export default function* postSaga() {
  yield all([fork(watchLoadPosts), fork(watchSavePost)]);
}
