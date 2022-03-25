export const initialState = {
  postList: [],
  searchPostList: [],
  tempPostList: [],
  loadPostInfo: {},
  loadPostsLoading: false,
  loadPostsSuccess: false,
  loadPostsFailure: false,
  savePostLoading: false,
  savePostSuccess: false,
  savePostFailure: { err: false, message: null },
  tempSavePostLoading: false,
  tempSavePostSuccess: false,
  tempSavePostFailure: { err: false, message: null },
  addClickCountLoading: false,
  addClickCountSuccess: false,
  addClickCountFailure: false,
  loadPostLoading: false,
  loadPostSuccess: false,
  loadPostFailure: { err: false, message: null },
  cancelPostLoading: false,
  cancelPostSuccess: false,
  cancelPostFailure: { err: false, message: null },
  modifyPostLoading: false,
  modifyPostSuccess: false,
  modifyPostFailure: { err: false, message: null },
  searchPostsLoading: false,
  searchPostsSuccess: false,
  searchPostsFailure: { err: false, message: null },
  loadTempPostsLoading: false,
  loadTempPostsSuccess: false,
  loadTempPostsFailure: { err: false, message: null },
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

// 게시글 임시 저장
export const TEMP_SAVE_POST_REQUEST = 'TEMP_SAVE_POST_REQUEST';
export const TEMP_SAVE_POST_SUCCESS = 'TEMP_SAVE_POST_SUCCESS';
export const TEMP_SAVE_POST_FAILURE = 'TEMP_SAVE_POST_FAILURE';

export const tempSavePostRequestAction = (data) => {
  return {
    type: TEMP_SAVE_POST_REQUEST,
    data,
  };
};

// 게시글 클릭시 조회수 add
export const ADD_CLICK_COUNT_REQUEST = 'ADD_CLICK_COUNT_REQUEST';
export const ADD_CLICK_COUNT_SUCCESS = 'ADD_CLICK_COUNT_SUCCESS';
export const ADD_CLICK_COUNT_FAILURE = 'ADD_CLICK_COUNT_FAILURE';

export const addClickCountRequestAction = (data) => {
  return {
    type: ADD_CLICK_COUNT_REQUEST,
    data,
  };
};

// 특정 게시글 조회
export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const loadPostRequestAction = (data) => {
  return {
    type: LOAD_POST_REQUEST,
    data,
  };
};

// 게시글 취소
export const CANCEL_POST_REQUEST = 'CANCEL_POST_REQUEST';
export const CANCEL_POST_SUCCESS = 'CANCEL_POST_SUCCESS';
export const CANCEL_POST_FAILURE = 'CANCEL_POST_FAILURE';

export const cancelPostRequestAction = (data) => {
  return {
    type: CANCEL_POST_REQUEST,
    data,
  };
};

// 게시글 수정
export const MODIFY_POST_REQUEST = 'MODIFY_POST_REQUEST';
export const MODIFY_POST_SUCCESS = 'MODIFY_POST_SUCCESS';
export const MODIFY_POST_FAILURE = 'MODIFY_POST_FAILURE';

export const modifyPostRequestAction = (data) => {
  return {
    type: MODIFY_POST_REQUEST,
    data,
  };
};

// 게시글 찾기
export const SEARCH_POSTS_REQUEST = 'SEARCH_POSTS_REQUEST';
export const SEARCH_POSTS_SUCCESS = 'SEARCH_POSTS_SUCCESS';
export const SEARCH_POSTS_FAILURE = 'SEARCH_POSTS_FAILURE';

export const searchPostsRequestAction = (data) => {
  return {
    type: SEARCH_POSTS_REQUEST,
    data,
  };
};

// 임시 글 목록 불러오기
export const LOAD_TEMP_POSTS_REQUEST = 'LOAD_TEMP_POSTS_REQUEST';
export const LOAD_TEMP_POSTS_SUCCESS = 'LOAD_TEMP_POSTS_SUCCESS';
export const LOAD_TEMP_POSTS_FAILURE = 'LOAD_TEMP_POSTS_FAILURE';

export const loadTempPostsRequestAction = () => {
  return {
    type: LOAD_TEMP_POSTS_REQUEST,
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
        savePostFailure: { err: false, message: null },
      };
    case SAVE_POST_SUCCESS:
      return {
        ...state,
        savePostLoading: false,
        savePostSuccess: true,
        savePostFailure: { err: false, message: null },
      };
    case SAVE_POST_FAILURE:
      return {
        ...state,
        savePostLoading: false,
        savePostSuccess: false,
        savePostFailure: { err: true, message: action.err },
      };
    // 게시글 임시 저장
    case TEMP_SAVE_POST_REQUEST:
      return {
        ...state,
        tempSavePostLoading: true,
        tempSavePostSuccess: false,
        tempSavePostFailure: { err: false, message: null },
      };
    case TEMP_SAVE_POST_SUCCESS:
      return {
        ...state,
        tempSavePostLoading: false,
        tempSavePostSuccess: true,
        tempSavePostFailure: { err: false, message: null },
      };
    case TEMP_SAVE_POST_FAILURE:
      return {
        ...state,
        tempSavePostLoading: false,
        tempSavePostSuccess: false,
        tempSavePostFailure: { err: true, message: action.err },
      };
    // 게시글 조회수 add
    case ADD_CLICK_COUNT_REQUEST:
      return {
        ...state,
        addClickCountLoading: true,
        addClickCountSuccess: false,
        addClickCountFailure: false,
      };
    case ADD_CLICK_COUNT_SUCCESS:
      return {
        ...state,
        addClickCountLoading: false,
        addClickCountSuccess: true,
        addClickCountFailure: false,
      };
    case ADD_CLICK_COUNT_FAILURE:
      return {
        ...state,
        addClickCountLoading: false,
        addClickCountSuccess: false,
        addClickCountFailure: true,
      };
    // 특정 게시글 조회
    case LOAD_POST_REQUEST:
      return {
        ...state,
        loadPostInfo: {},
        loadPostLoading: true,
        loadPostSuccess: false,
        loadPostFailure: false,
      };
    case LOAD_POST_SUCCESS:
      return {
        ...state,
        loadPostInfo: action.data,
        loadPostLoading: false,
        loadPostSuccess: true,
        loadPostFailure: false,
      };
    case LOAD_POST_FAILURE:
      return {
        ...state,
        loadPostInfo: {},
        loadPostLoading: false,
        loadPostSuccess: false,
        loadPostFailure: true,
      };
    // 게시글 취소
    case CANCEL_POST_REQUEST:
      return {
        ...state,
        cancelPostLoading: true,
        cancelPostSuccess: false,
        cancelPostFailure: { err: false, message: null },
      };
    case CANCEL_POST_SUCCESS:
      const newPostList = [...state.postList].filter((post) => post.id !== action.data.postId);
      return {
        ...state,
        postList: newPostList,
        cancelPostLoading: false,
        cancelPostSuccess: true,
        cancelPostFailure: { err: false, message: null },
      };
    case CANCEL_POST_FAILURE:
      return {
        ...state,
        cancelPostLoading: false,
        cancelPostSuccess: false,
        cancelPostFailure: { err: true, message: action.err },
      };
    // 게시글 수정
    case MODIFY_POST_REQUEST:
      return {
        ...state,
        modifyPostLoading: true,
        modifyPostSuccess: false,
        modifyPostFailure: { err: false, message: null },
      };
    case MODIFY_POST_SUCCESS:
      return {
        ...state,
        modifyPostLoading: false,
        modifyPostSuccess: true,
        modifyPostFailure: { err: false, message: null },
      };
    case MODIFY_POST_FAILURE:
      return {
        ...state,
        modifyPostLoading: false,
        modifyPostSuccess: false,
        modifyPostFailure: { err: true, message: null },
      };
    // 게시글 찾기
    case SEARCH_POSTS_REQUEST:
      return {
        ...state,
        searchPostsLoading: true,
        searchPostsSuccess: false,
        searchPostsFailure: { err: false, message: null },
      };
    case SEARCH_POSTS_SUCCESS:
      return {
        ...state,
        searchPostList: [...action.data],
        searchPostsLoading: false,
        searchPostsSuccess: true,
        searchPostsFailure: { err: false, message: null },
      };
    case SEARCH_POSTS_FAILURE:
      return {
        ...state,
        searchPostsLoading: false,
        searchPostsSuccess: false,
        searchPostsFailure: { err: false, message: action.err },
      };
    case LOAD_TEMP_POSTS_REQUEST:
      return {
        ...state,
        loadTempPostsLoading: true,
        loadTempPostsSuccess: false,
        loadTempPostsFailure: { err: false, message: action.err },
      };
    case LOAD_TEMP_POSTS_SUCCESS:
      return {
        ...state,
        tempPostList: [...action.data],
        loadTempPostsLoading: false,
        loadTempPostsSuccess: true,
        loadTempPostsFailure: { err: false, message: action.err },
      };
    default:
      return state;
  }
};

export default reducer;
