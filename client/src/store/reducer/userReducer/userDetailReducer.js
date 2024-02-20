import {
  USER_DETAIL_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_RESET,
  USER_DETAIL_SUCCESS,
} from "../../actions/actionTypes";

const initialState = {
  user: {},
  loading: false,
  error: null,
};

const userDetailReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_DETAIL_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case USER_DETAIL_SUCCESS: {
      return {
        ...state,
        loading: false,
        user: payload,
      };
    }
    case USER_DETAIL_FAIL: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }
    case USER_DETAIL_RESET:
      return {
        user: {},
      };
    default:
      return state;
  }
};

export default userDetailReducer;
