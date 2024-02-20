import {
  ADDRESS_DELETE_FAIL,
  ADDRESS_DELETE_REQUEST,
  ADDRESS_DELETE_SUCCESS,
  ADDRESS_DELETE_RESET,
} from "../../actions/actionTypes";

const initialState = {
  success: false,
  loading: false,
  error: null,
};

const addressDeleteReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADDRESS_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADDRESS_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case ADDRESS_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: payload,
      };
    case ADDRESS_DELETE_RESET:
      return {
        ...state,
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};

export default addressDeleteReducer;
