import {
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_RESET,
} from "../../actions/actionTypes";

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categoryListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CATEGORY_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        categories: payload,
        loading: false,
      };
    case CATEGORY_LIST_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CATEGORY_LIST_RESET:
      return {
        categories: [],
      };
    default:
      return state;
  }
};

export default categoryListReducer;
