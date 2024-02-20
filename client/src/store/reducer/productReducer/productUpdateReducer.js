import {
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
} from "../../actions/actionTypes";

const initialState = {
  product: null,
  success: false,
  loading: false,
  error: null,
};

const productUpdateReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PRODUCT_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: payload,
      };
    case PRODUCT_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: payload,
      };
    case PRODUCT_UPDATE_RESET:
      return { product: null };
    default:
      return state;
  }
};

export default productUpdateReducer;
