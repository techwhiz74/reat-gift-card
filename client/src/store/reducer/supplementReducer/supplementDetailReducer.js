import {
  SUPPLEMENT_DETAIL_FAIL,
  SUPPLEMENT_DETAIL_REQUEST,
  SUPPLEMENT_DETAIL_SUCCESS,
} from "../../actions/actionTypes";

const initialState = {
  supplement: {
    reviews: [],
    rating: 0,
  },
  loading: false,
  error: null,
};

const supplementDetailReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SUPPLEMENT_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUPPLEMENT_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        supplement: { ...state.supplement, ...payload },
      };
    case SUPPLEMENT_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default supplementDetailReducer;
