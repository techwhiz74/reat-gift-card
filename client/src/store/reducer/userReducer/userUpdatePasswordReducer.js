import {
  PASSWORD_UPDATE_REQUEST,
  PASSWORD_UPDATE_SUCCESS,
  PASSWORD_UPDATE_FAIL,
} from "../../actions/actionTypes";

const initialState = {
  success: false,
  loading: false,
  message: null,
};

export default function userUpdatePasswordReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case PASSWORD_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case PASSWORD_UPDATE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        message: payload,
      };
    case PASSWORD_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false,
      };
    default:
      return state;
  }
}
