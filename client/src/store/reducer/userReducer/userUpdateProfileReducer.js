import {
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
} from "../../actions/actionTypes";

const initialState = {
  success: false,
  loading: false,
  userInfo: null,
};

const userUpdateProfileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        userInfo: payload,
      };
    case USER_UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false,
      };
    default:
      return state;
  }
};

export default userUpdateProfileReducer;
