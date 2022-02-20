import axios from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILURE,
  ADMIN_LOGOUT_REQUEST,
  ADMIN_LOGOUT_SUCCESS,
  ADMIN_LOGOUT_FAILURE,
  CHECK_IS_ADMIN_REQUEST,
  CHECK_IS_ADMIN_SUCCESS,
  CHECK_IS_ADMIN_FAILURE,
} from '../reducers/user';

// 관리자 로그인
function adminLoginAPI(data) {
  return axios.post('/api/admin-login', data);
}

function* adminLogin(data) {
  try {
    yield call(adminLoginAPI, data);

    yield put({
      type: ADMIN_LOGIN_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: ADMIN_LOGIN_FAILURE,
      err: err.response.data,
    });
  }
}

function* watchAdminLogin() {
  yield takeLatest(ADMIN_LOGIN_REQUEST, adminLogin);
}

// 관리자 로그아웃
function adminLogoutAPI() {
  return axios.post('/api/admin-logout');
}

function* adminLogout() {
  try {
    yield call(adminLogoutAPI);
    yield put({
      type: ADMIN_LOGOUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: ADMIN_LOGOUT_FAILURE,
      err: err.response.data,
    });
  }
}

function* watchAdminLogout() {
  yield takeLatest(ADMIN_LOGOUT_REQUEST, adminLogout);
}

// 관리자 체크
function checkIsAdminAPI() {
  return axios.post('/api/admin-check');
}

function* checkIsAdmin() {
  try {
    yield call(checkIsAdminAPI);
    yield put({
      type: CHECK_IS_ADMIN_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: CHECK_IS_ADMIN_FAILURE,
      err: err.response.data,
    });
  }
}

function* watchCheckIsAdmin() {
  yield takeLatest(CHECK_IS_ADMIN_REQUEST, checkIsAdmin);
}
export default function* userSaga() {
  yield all([fork(watchAdminLogin), fork(watchAdminLogout), fork(watchCheckIsAdmin)]);
}
