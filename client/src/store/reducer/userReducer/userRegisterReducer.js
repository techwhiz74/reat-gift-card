import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../../actions/actionTypes";

const initialState = {
  success: false,
  loading: false,
  userInfo: null,
  error: null,
};

const userRegisterReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userInfo: payload,
      };
    case USER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default userRegisterReducer;
