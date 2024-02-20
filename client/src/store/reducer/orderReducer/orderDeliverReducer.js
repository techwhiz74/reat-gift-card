import {
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_RESET,
} from '../../actions/actionTypes';

const initialState = {};

const orderDeliverReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ORDER_DELIVER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DELIVER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case ORDER_DELIVER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};

export default orderDeliverReducer;
