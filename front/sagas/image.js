import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { SAVE_IMAGE_REQUEST, SAVE_IMAGE_SUCCESS, SAVE_IMAGE_FAILURE } from '../reducers/image';

// 이미지 저장
function saveImageAPI(data) {
  return axios.post('/api/image', data);
}

function* saveImage(action) {
  try {
    const result = yield call(saveImageAPI, action.data);
    yield put({
      type: SAVE_IMAGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: SAVE_IMAGE_FAILURE,
      err: err.response,
    });
  }
}

function* watchSaveImage() {
  yield takeLatest(SAVE_IMAGE_REQUEST, saveImage);
}

export default function* imageSaga() {
  yield all([fork(watchSaveImage)]);
}
