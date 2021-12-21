export const initialState = {
  postList: [],
  loadPostsLoading: false,
  loadPostsSuccess: false,
  loadPostsFailure: false,
  savePostLoading: false,
  savePostSuccess: false,
  savePostFailure: false,
};

// 게시글 목록 조회
export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const loadPostsRequestAction = () => {
  return {
    type: LOAD_POSTS_REQUEST,
  };
};

// 게시글 저장
export const SAVE_POST_REQUEST = 'SAVE_POST_REQUEST';
export const SAVE_POST_SUCCESS = 'SAVE_POST_SUCCESS';
export const SAVE_POST_FAILURE = 'SAVE_POST_FAILURE';

export const savePostRequestAction = (data) => {
  return {
    type: SAVE_POST_REQUEST,
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // 게시글 목록 조회
    case LOAD_POSTS_REQUEST:
      return {
        ...state,
        loadPostsLoading: true,
        loadPostsSuccess: false,
        loadPostsFailure: false,
      };
    case LOAD_POSTS_SUCCESS:
      return {
        ...state,
        loadPostsLoading: false,
        loadPostsSuccess: true,
        loadPostsFailure: false,
        postList: [...action.data],
      };
    case LOAD_POSTS_FAILURE:
      return {
        ...state,
        loadPostsLoading: false,
        loadPostsSuccess: false,
        loadPostsFailure: true,
      };
    // 게시글 저장
    case SAVE_POST_REQUEST:
      return {
        ...state,
        savePostLoading: true,
        savePostSuccess: false,
        savePostFailure: false,
      };
    case SAVE_POST_SUCCESS:
      return {
        ...state,
        savePostLoading: false,
        savePostSuccess: true,
        savePostFailure: false,
      };
    case SAVE_POST_FAILURE:
      return {
        ...state,
        savePostLoading: false,
        savePostSuccess: false,
        savePostFailure: true,
      };

    default:
      return state;
  }
};

export default reducer;
