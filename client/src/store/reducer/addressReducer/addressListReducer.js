import {
  ADDRESS_LIST_FAIL,
  ADDRESS_LIST_REQUEST,
  ADDRESS_LIST_SUCCESS,
} from "../../actions/actionTypes";

const initialState = {
  addresses: [],
  loading: false,
  error: null,
};

const addressListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADDRESS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADDRESS_LIST_SUCCESS:
      return {
        ...state,
        addresses: payload,
        loading: false,
      };
    case ADDRESS_LIST_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default addressListReducer;
