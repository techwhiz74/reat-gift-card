import {
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_RESET,
} from "../../actions/actionTypes";

const initialState = {
  success: false,
  loading: false,
  error: null,
};

const categoryDeleteReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CATEGORY_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CATEGORY_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case CATEGORY_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: payload,
      };
    case CATEGORY_DELETE_RESET:
      return {
        ...state,
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};

export default categoryDeleteReducer;
