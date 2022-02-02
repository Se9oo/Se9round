import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import { baseURL } from '../config/config';
import postSaga from './post';
import userSaga from './user';

axios.defaults.baseURL = baseURL;

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}
