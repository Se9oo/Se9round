import { all, fork, put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  SAVE_POST_REQUEST,
  SAVE_POST_SUCCESS,
  SAVE_POST_FAILURE,
  TEMP_SAVE_POST_REQUEST,
  TEMP_SAVE_POST_SUCCESS,
  TEMP_SAVE_POST_FAILURE,
} from '../reducers/post';

// 게시글 목록 조회
function loadPostsAPI() {
  return axios.get('/api/posts');
}

function* loadPosts() {
  try {
    const result = yield call(loadPostsAPI);

    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      err: err.response,
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
    yield call(savePostAPI, data);
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

// 게시글 임시 저장
function tempSavePostAPI(data) {
  axios.post('/api/temp/post', data);
}

function* tempSavePost(data) {
  try {
    // call(tempSavePostAPI, data);
    yield put({
      type: TEMP_SAVE_POST_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: TEMP_SAVE_POST_FAILURE,
      err: err.reponse.data,
    });
  }
}

function* watchTempSavePost() {
  yield takeLatest(TEMP_SAVE_POST_REQUEST, tempSavePost);
}

export default function* postSaga() {
  yield all([fork(watchLoadPosts), fork(watchSavePost), fork(watchTempSavePost)]);
}
