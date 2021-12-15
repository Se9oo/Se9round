import axios from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_SUCCESS, ADMIN_LOGIN_FAILURE } from '../reducers/user';

function adminLoginAPI(data) {
  return axios.post('/api/adminlogin', data);
}

function* adminLogin() {
  try {
    // call(adminLoginAPI);

    yield put({
      type: ADMIN_LOGIN_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: ADMIN_LOGIN_FAILURE,
    });
  }
}

function* watchAdminLogin() {
  yield takeLatest(ADMIN_LOGIN_REQUEST, adminLogin);
}

export default function* userSaga() {
  yield all([fork(watchAdminLogin)]);
}
