import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
} from '../../actions/actionTypes';

const initialState = {
  products: [],
  pages: null,
  page: null,
  loading: false,
  error: null,
};

const productListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        products: payload.products,
        pages: payload.pages,
        page: payload.page,
        loading: false,
      };
    case PRODUCT_LIST_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default productListReducer;
