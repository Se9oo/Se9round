export const initialState = {
  isAdmin: false,
  adminLoginLoading: false,
  adminLoginSuccess: false,
  adminLoginFailure: { err: false, msg: null },
  adminLogoutLoading: false,
  adminLogoutSuccess: false,
  adminLogoutFailure: { err: false, msg: null },
  checkIsAdminLoading: false,
  checkIsAdminSuccess: false,
  checkIsAdminFailure: { err: false, msg: null },
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

// 관리자 로그아웃
export const ADMIN_LOGOUT_REQUEST = 'ADMIN_LOGOUT_REQUEST';
export const ADMIN_LOGOUT_SUCCESS = 'ADMIN_LOGOUT_SUCCESS';
export const ADMIN_LOGOUT_FAILURE = 'ADMIN_LOGOUT_FAILURE';

export const adminLogoutRequestAction = () => {
  return {
    type: ADMIN_LOGOUT_REQUEST,
  };
};

// 관리자 체크
export const CHECK_IS_ADMIN_REQUEST = 'CHECK_IS_ADMIN_REQUEST';
export const CHECK_IS_ADMIN_SUCCESS = 'CHECK_IS_ADMIN_SUCCESS';
export const CHECK_IS_ADMIN_FAILURE = 'CHECK_IS_ADMIN_FAILURE';

export const checkIsAdminRequestAction = () => {
  return {
    type: CHECK_IS_ADMIN_REQUEST,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // 관리자 로그인
    case ADMIN_LOGIN_REQUEST:
      return {
        ...state,
        adminLoginLoading: true,
        adminLoginSuccess: false,
        adminLoginFailure: { err: false, msg: null },
        adminLogoutSuccess: false,
      };
    case ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        isAdmin: true,
        adminLoginLoading: false,
        adminLoginSuccess: true,
        adminLoginFailure: { err: false, msg: null },
      };
    case ADMIN_LOGIN_FAILURE:
      return {
        ...state,
        adminLoginLoading: false,
        adminLoginSuccess: false,
        adminLoginFailure: { err: true, msg: action.err },
      };
    // 관리자 로그아웃
    case ADMIN_LOGOUT_REQUEST:
      return {
        ...state,
        adminLogoutLoading: true,
        adminLogoutSuccess: false,
        adminLogoutFailure: { err: false, msg: null },
      };
    case ADMIN_LOGOUT_SUCCESS:
      return {
        ...state,
        isAdmin: false,
        adminLogoutLoading: false,
        adminLogoutSuccess: true,
        adminLogoutFailure: { err: false, msg: null },
      };
    case ADMIN_LOGOUT_FAILURE:
      return {
        ...state,
        adminLogoutLoading: false,
        adminLogoutSuccess: false,
        adminLogoutFailure: { err: true, msg: action.err },
      };
    // 관리자 체크
    case CHECK_IS_ADMIN_REQUEST:
      return {
        ...state,
        checkIsAdminLoading: true,
        checkIsAdminSuccess: false,
        checkIsAdminFailure: false,
      };
    case CHECK_IS_ADMIN_SUCCESS:
      return {
        ...state,
        isAdmin: true,
        checkIsAdminLoading: false,
        checkIsAdminSuccess: true,
        checkIsAdminFailure: false,
      };
    case CHECK_IS_ADMIN_FAILURE:
      return {
        ...state,
        checkIsAdminLoading: false,
        checkIsAdminSuccess: true,
        checkIsAdminFailure: { err: true, msg: action.err },
      };
    default:
      return state;
  }
};

export default reducer;
