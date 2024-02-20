import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
} from "../../actions/actionTypes";

const initialState = {
  product: null,
  success: false,
  loading: false,
  error: null,
};

const productCreateReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PRODUCT_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: payload,
      };
    case PRODUCT_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: payload,
      };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export default productCreateReducer;
