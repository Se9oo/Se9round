export const initialState = {
  tagList: [],
  loadTagsLoading: false,
  loadTagsSuccess: false,
  loadTagsFailure: { err: false, msg: null },
};

// 태그 목록 조회
export const LOAD_TAGS_REQUEST = 'LOAD_TAGS_REQUEST';
export const LOAD_TAGS_SUCCESS = 'LOAD_TAGS_SUCCESS';
export const LOAD_TAGS_FAILURE = 'LOAD_TAGS_FAILURE';

export const loadTagsRequestAction = () => {
  return {
    type: LOAD_TAGS_REQUEST,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // 태그 목록 조회
    case LOAD_TAGS_REQUEST:
      return {
        ...state,
        loadTagsLoading: true,
        loadTagsSuccess: false,
        loadTagsFailure: { err: false, msg: null },
      };
    case LOAD_TAGS_SUCCESS:
      return {
        ...state,
        tagList: [...action.data],
        loadTagsLoading: false,
        loadTagsSuccess: true,
        loadTagsFailure: { err: false, msg: null },
      };
    case LOAD_TAGS_FAILURE:
      return {
        ...state,
        loadTagsLoading: false,
        loadTagsSuccess: false,
        loadTagsFailure: { err: false, msg: action.err },
      };
    default:
      return state;
  }
};

export default reducer;
