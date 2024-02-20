import {
  SUPPLEMENT_DELETE_FAIL,
  SUPPLEMENT_DELETE_REQUEST,
  SUPPLEMENT_DELETE_SUCCESS,
  SUPPLEMENT_DELETE_RESET,
} from "../../actions/actionTypes";

const initialState = {
  success: false,
  loading: false,
  error: null,
};

const supplementDeleteReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SUPPLEMENT_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUPPLEMENT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case SUPPLEMENT_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: payload,
      };
    case SUPPLEMENT_DELETE_RESET:
      return {
        ...state,
        success: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default supplementDeleteReducer;
