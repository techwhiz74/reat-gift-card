import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
} from "../../actions/actionTypes";

const initialState = {
  loading: false,
  success: false,
  order: null,
  error: null,
};

const orderCreateReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        order: payload,
      };
    case ORDER_CREATE_FAIL:
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

export default orderCreateReducer;
