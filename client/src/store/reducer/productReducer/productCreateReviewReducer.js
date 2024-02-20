import {
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_SUCCESS,
} from '../../actions/actionTypes';

const initialState = {
  success: false,
  loading: false,
  error: null,
};

const productCreateReviewReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: payload,
      };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export default productCreateReviewReducer;
