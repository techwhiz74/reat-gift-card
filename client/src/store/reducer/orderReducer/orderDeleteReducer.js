import {
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_RESET,
} from "../../actions/actionTypes";

const initialState = {
  success: false,
  loading: false,
  error: null,
};

const orderDeleteReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ORDER_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case ORDER_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: payload,
      };
    case ORDER_DELETE_RESET:
      return {
        ...state,
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};

export default orderDeleteReducer;
