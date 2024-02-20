import {
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
} from "../../actions/actionTypes";

const initialState = {
  order: {},
  loading: true,
  error: null,
};

const orderDetailsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default orderDetailsReducer;
