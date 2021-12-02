import { HYDRATE } from 'next-redux-wrapper';

const initialState = {};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE', action);
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default rootReducer;
