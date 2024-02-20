import {
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_RESET,
} from "../../actions/actionTypes";

const initialState = {
  success: false,
  loading: false,
  error: null,
};

const productDeleteReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PRODUCT_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case PRODUCT_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: payload,
      };
    case PRODUCT_DELETE_RESET:
      return {
        ...state,
        success: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default productDeleteReducer;
