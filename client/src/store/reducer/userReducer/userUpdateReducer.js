import {
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
} from "../../actions/actionTypes";

const initialState = {
  user: {},
  success: false,
  loading: false,
};

export default function userUpdateReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case USER_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case USER_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: payload,
      };
    case USER_UPDATE_RESET:
      return {
        ...state,
        success: false,
        user: {},
      };

    default:
      return state;
  }
}
