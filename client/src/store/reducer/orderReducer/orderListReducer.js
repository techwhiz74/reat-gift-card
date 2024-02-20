import {
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
} from '../../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ORDER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: payload,
      };
    case ORDER_LIST_FAIL:
      return {
        ...state,
        loading: false,
        orders: null,
        error: payload,
      };
    default:
      return state;
  }
};

export default orderListReducer;
