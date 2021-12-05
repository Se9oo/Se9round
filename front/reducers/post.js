export const initialState = {
  postList: [],
  loadPostsLoading: false,
  loadPostsSuccess: false,
  loadPostsFailure: false,
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POSTS_REQUEST:
      return {
        loadPostsLoading: true,
        loadPostsSuccess: false,
        loadPostsFailure: false,
      };
    case LOAD_POSTS_SUCCESS:
      return {
        loadPostsLoading: false,
        loadPostsSuccess: true,
        loadPostsFailure: false,
        postList: [...action.data],
      };
    case LOAD_POSTS_FAILURE:
      return {
        loadPostsLoading: false,
        loadPostsSuccess: false,
        loadPostsFailure: true,
      };

    default:
      return state;
  }
};

export default reducer;
