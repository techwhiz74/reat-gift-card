import {
  ADDRESS_DETAIL_FAIL,
  ADDRESS_DETAIL_REQUEST,
  ADDRESS_DETAIL_SUCCESS,
} from "../../actions/actionTypes";

const initialState = {
  address: {},
  loading: false,
  error: null,
};

const addressDetailReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADDRESS_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADDRESS_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        address: { ...state.address, ...payload },
      };
    case ADDRESS_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default addressDetailReducer;
