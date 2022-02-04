import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import { baseURL } from '../config/config';
import postSaga from './post';
import userSaga from './user';
import imageSaga from './image';

axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga), fork(imageSaga)]);
}
