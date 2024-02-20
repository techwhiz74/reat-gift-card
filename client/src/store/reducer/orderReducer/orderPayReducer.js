import {
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
} from '../../actions/actionTypes';

const initialState = {};

const orderPayReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ORDER_PAY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case ORDER_PAY_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export default orderPayReducer;
