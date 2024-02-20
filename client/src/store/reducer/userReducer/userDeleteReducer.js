import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
} from '../../actions/actionTypes';

const initialState = {
  success: false,
  loading: false,
};

const userDeleteReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case USER_DELETE_FAIL:
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

export default userDeleteReducer;
