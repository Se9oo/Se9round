export const initialState = {
  isAdmin: false,
  adminLoginLoading: false,
  adminLoginSuccess: false,
  adminLoginFailure: false,
};

// 관리자 로그인
export const ADMIN_LOGIN_REQUEST = 'ADMIN_LOGIN_REQUEST';
export const ADMIN_LOGIN_SUCCESS = 'ADMIN_LOGIN_SUCCESS';
export const ADMIN_LOGIN_FAILURE = 'ADMIN_LOGIN_FAILURE';

export const adminLoginRequestAction = (data) => {
  return {
    type: ADMIN_LOGIN_REQUEST,
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
      return {
        ...state,
        adminLoginLoading: true,
        adminLoginSuccess: false,
        adminLoginSuccess: false,
      };
    case ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        isAdmin: true,
        adminLoginLoading: false,
        adminLoginSuccess: true,
        adminLoginFailure: false,
      };
    case ADMIN_LOGIN_FAILURE:
      return {
        ...state,
        adminLoginLoading: false,
        adminLoginSuccess: false,
        adminLoginFailure: true,
      };
    default:
      return state;
  }
};

export default reducer;
