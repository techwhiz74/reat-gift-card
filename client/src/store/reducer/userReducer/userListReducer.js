import {
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
} from '../../actions/actionTypes';

const initialState = {
  users: [],
  loading: false,
};

const userListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        users: payload,
      };
    case USER_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case USER_LIST_RESET:
      return {
        users: [],
      };
    default:
      return state;
  }
};

export default userListReducer;
