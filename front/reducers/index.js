import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import post from './post';
import user from './user';
import image from './image';
import tag from './tag';

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE', action);
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        post,
        user,
        image,
        tag,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
