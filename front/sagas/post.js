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
  ADD_CLICK_COUNT_REQUEST,
  ADD_CLICK_COUNT_SUCCESS,
  ADD_CLICK_COUNT_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
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
  return axios.post('/api/post', data);
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
      err: err.response,
    });
  }
}

function* watchSavePost() {
  yield takeLatest(SAVE_POST_REQUEST, savePost);
}

// 게시글 임시 저장
function tempSavePostAPI(data) {
  return axios.post('/api/post/temp', data);
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

// 게시글 조회수 add
function addClickCountAPI(data) {
  return axios.post('/api/post/count', data);
}

function* addClickCount(data) {
  try {
    yield call(addClickCountAPI, data);
    yield put({
      type: ADD_CLICK_COUNT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: ADD_CLICK_COUNT_FAILURE,
      err: err.response,
    });
  }
}

function* watchAddClickCount() {
  yield takeLatest(ADD_CLICK_COUNT_REQUEST, addClickCount);
}

// 특정 게시글 조회
function loadPostAPI(data) {
  return axios.get('/api/post', data);
}

function* loadPost(data) {
  try {
    const result = yield call(loadPostAPI, data);

    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_POST_FAILURE,
      err: err.response,
    });
  }
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchSavePost),
    fork(watchTempSavePost),
    fork(watchAddClickCount),
    fork(watchLoadPost),
  ]);
}
