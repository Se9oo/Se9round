import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { LOAD_TAGS_FAILURE, LOAD_TAGS_REQUEST, LOAD_TAGS_SUCCESS } from '../reducers/tag';

// 태그 목록 조회
function loadTagsAPI() {
  return axios.get('/api/tags');
}

function* loadTags() {
  try {
    const result = yield call(loadTagsAPI);

    yield put({
      type: LOAD_TAGS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_TAGS_FAILURE,
      err: err.response.data,
    });
  }
}

function* watchLoadTags() {
  yield takeLatest(LOAD_TAGS_REQUEST, loadTags);
}

export default function* tagSaga() {
  yield all([fork(watchLoadTags)]);
}
