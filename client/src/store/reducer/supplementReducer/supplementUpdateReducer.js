import {
  SUPPLEMENT_UPDATE_FAIL,
  SUPPLEMENT_UPDATE_REQUEST,
  SUPPLEMENT_UPDATE_RESET,
  SUPPLEMENT_UPDATE_SUCCESS,
} from "../../actions/actionTypes";

const initialState = {
  supplement: null,
  success: false,
  loading: false,
  error: null,
};

const supplementUpdateReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SUPPLEMENT_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUPPLEMENT_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        supplement: payload,
      };
    case SUPPLEMENT_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: payload,
      };
    case SUPPLEMENT_UPDATE_RESET:
      return { supplement: null };
    default:
      return state;
  }
};

export default supplementUpdateReducer;
