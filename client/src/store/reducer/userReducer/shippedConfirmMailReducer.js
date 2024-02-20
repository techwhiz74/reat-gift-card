import {
  SHIPPED_CONFIRM_MAIL_SEND_REQUEST,
  SHIPPED_CONFIRM_MAIL_SEND_FAIL,
  SHIPPED_CONFIRM_MAIL_SEND_SUCCESS,
  SHIPPED_CONFIRM_MAIL_SEND_RESET,
} from "../../actions/actionTypes";

const initialState = {
  success: false,
  loading: false,
  message: null,
};

export default function shippedConfirmMailReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case SHIPPED_CONFIRM_MAIL_SEND_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case SHIPPED_CONFIRM_MAIL_SEND_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        message: payload,
      };
    case SHIPPED_CONFIRM_MAIL_SEND_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false,
      };
    case SHIPPED_CONFIRM_MAIL_SEND_RESET:
      return {
        ...state,
        success: false,
        loading: false,
      };
    default:
      return state;
  }
}
