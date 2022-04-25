export const initialState = {
  saveImageLoading: false,
  saveImageSuccess: false,
  saveImageFailure: { err: false, msg: null },
  imageName: null,
};

// 이미지 저장
export const SAVE_IMAGE_REQUEST = 'SAVE_IMAGE_REQUEST';
export const SAVE_IMAGE_SUCCESS = 'SAVE_IMAGE_SUCCESS';
export const SAVE_IMAGE_FAILURE = 'SAVE_IMAGE_FAILURE';

export const saveImageRequestAction = (data) => {
  return {
    type: SAVE_IMAGE_REQUEST,
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_IMAGE_REQUEST:
      return {
        ...state,
        saveImageLoading: true,
        saveImageSuccess: false,
        saveImageFailure: { err: false, msg: null },
        imageName: null,
      };
    case SAVE_IMAGE_SUCCESS:
      return {
        ...state,
        saveImageLoading: false,
        saveImageSuccess: true,
        saveImageFailure: { err: false, msg: null },
        imageName: action.data,
      };
    case SAVE_IMAGE_FAILURE:
      return {
        ...state,
        saveImageLoading: false,
        saveImageSuccess: false,
        saveImageFailure: { err: true, msg: action.err },
        imageName: null,
      };
    default:
      return state;
  }
};

export default reducer;
