import {
  PRODUCT_TOP_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
} from '../../actions/actionTypes';

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productTopRatedReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PRODUCT_TOP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_TOP_SUCCESS:
      return {
        ...state,
        loading: false,
        products: payload,
      };
    case PRODUCT_TOP_FAIL:
      return {
        ...state,
        products: [],
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default productTopRatedReducer;
