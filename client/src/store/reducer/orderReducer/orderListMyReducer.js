import {
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_RESET,
} from '../../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderListMyReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ORDER_LIST_MY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_LIST_MY_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: payload,
      };
    case ORDER_LIST_MY_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case ORDER_LIST_MY_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

export default orderListMyReducer;
