import {
  CATEGORY_DETAIL_FAIL,
  CATEGORY_DETAIL_REQUEST,
  CATEGORY_DETAIL_SUCCESS,
} from "../../actions/actionTypes";

const initialState = {
  category: {},
  loading: false,
  error: null,
};

const categoryDetailReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CATEGORY_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CATEGORY_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        category: { ...state.category, ...payload },
      };
    case CATEGORY_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default categoryDetailReducer;
