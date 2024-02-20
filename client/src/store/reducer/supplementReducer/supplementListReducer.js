import {
  SUPPLEMENT_LIST_SUCCESS,
  SUPPLEMENT_LIST_REQUEST,
  SUPPLEMENT_LIST_FAIL,
} from "../../actions/actionTypes";

const initialState = {
  supplements: [],
  pages: null,
  page: null,
  loading: false,
  error: null,
};

const supplementListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SUPPLEMENT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUPPLEMENT_LIST_SUCCESS:
      return {
        ...state,
        supplements: payload.supplements,
        pages: payload.pages,
        page: payload.page,
        loading: false,
      };
    case SUPPLEMENT_LIST_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default supplementListReducer;
