import {
  USER_REQUEST_MAIL_SEND_SUCCESS,
  USER_REQUEST_MAIL_SEND_FAIL,
  USER_REQUEST_MAIL_SEND_REQUEST,
  USER_REQUEST_MAIL_SEND_RESET,
} from "../../actions/actionTypes";

const initialState = {
  success: false,
  loading: false,
  message: null,
};

export default function userRequestMailReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case USER_REQUEST_MAIL_SEND_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case USER_REQUEST_MAIL_SEND_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        message: payload,
      };
    case USER_REQUEST_MAIL_SEND_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false,
      };
    case USER_REQUEST_MAIL_SEND_RESET:
      return {
        ...state,
        success: false,
        loading: false,
      };
    default:
      return state;
  }
}
