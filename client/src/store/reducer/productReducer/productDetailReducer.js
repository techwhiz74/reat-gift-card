import {
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
} from '../../actions/actionTypes';

const initialState = {
  product: {
    reviews: [],
    rating: 0,
  },
  loading: false,
  error: null,
};

const productDetailReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PRODUCT_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        product: { ...state.product, ...payload },
      };
    case PRODUCT_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default productDetailReducer;
