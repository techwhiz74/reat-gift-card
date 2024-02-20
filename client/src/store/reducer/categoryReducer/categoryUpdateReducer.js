import {
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_RESET,
} from "../../actions/actionTypes";

const initialState = {
  category: null,
  success: false,
  loading: false,
  error: null,
};

const categoryUpdateReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CATEGORY_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CATEGORY_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        category: payload,
      };
    case CATEGORY_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: payload,
      };
    case CATEGORY_UPDATE_RESET:
      return { product: null };
    default:
      return state;
  }
};

export default categoryUpdateReducer;
