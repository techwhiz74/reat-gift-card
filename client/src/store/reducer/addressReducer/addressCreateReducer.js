import {
  ADDRESS_CREATE_FAIL,
  ADDRESS_CREATE_REQUEST,
  ADDRESS_CREATE_SUCCESS,
  ADDRESS_CREATE_RESET,
} from "../../actions/actionTypes";

const initialState = {
  address: null,
  success: false,
  loading: false,
  error: null,
};

const addressCreateReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADDRESS_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADDRESS_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        address: payload,
      };
    case ADDRESS_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: payload,
      };
    case ADDRESS_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export default addressCreateReducer;
