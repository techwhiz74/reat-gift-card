import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REQUEST_MAIL_SEND_FAIL,
  USER_REQUEST_MAIL_SEND_SUCCESS,
} from "../../actions/actionTypes";

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
  mailResult: null,
};

const userLoginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: payload,
        error: null,
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case USER_LOGOUT:
      return {
        ...state,
        userInfo: null,
      };
    case USER_REQUEST_MAIL_SEND_SUCCESS:
      return {
        ...state,
        loading: false,
        mailResult: payload,
      };
    case USER_REQUEST_MAIL_SEND_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default userLoginReducer;
