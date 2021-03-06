import { applyMiddleware, compose, createStore } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';

import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

import reducer from '../reducers';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleWares = [sagaMiddleware];

  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middleWares))
      : composeWithDevTools(applyMiddleware(...middleWares));

  const store = createStore(reducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
