import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import post from './post';
import user from './user';
import image from './image';

const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log('HYDRATE', action);
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  post,
  user,
  image,
});

export default rootReducer;
