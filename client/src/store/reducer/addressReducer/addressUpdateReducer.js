import {
  ADDRESS_UPDATE_FAIL,
  ADDRESS_UPDATE_REQUEST,
  ADDRESS_UPDATE_SUCCESS,
  ADDRESS_UPDATE_RESET,
} from "../../actions/actionTypes";

const initialState = {
  address: null,
  success: false,
  loading: false,
  error: null,
};

const addressUpdateReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADDRESS_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADDRESS_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        address: payload,
      };
    case ADDRESS_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: payload,
      };
    case ADDRESS_UPDATE_RESET:
      return { address: null };
    default:
      return state;
  }
};

export default addressUpdateReducer;
