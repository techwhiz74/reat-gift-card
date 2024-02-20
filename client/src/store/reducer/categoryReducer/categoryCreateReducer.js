import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_RESET,
} from "../../actions/actionTypes";

const initialState = {
  category: null,
  success: false,
  loading: false,
  error: null,
};

const categoryCreateReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CATEGORY_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CATEGORY_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        category: payload,
      };
    case CATEGORY_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: payload,
      };
    case CATEGORY_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export default categoryCreateReducer;
