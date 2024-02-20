import {
  SUPPLEMENT_CREATE_FAIL,
  SUPPLEMENT_CREATE_REQUEST,
  SUPPLEMENT_CREATE_RESET,
  SUPPLEMENT_CREATE_SUCCESS,
} from "../../actions/actionTypes";

const initialState = {
  supplement: null,
  success: false,
  loading: false,
  error: null,
};

const supplementCreateReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SUPPLEMENT_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUPPLEMENT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        supplement: payload,
      };
    case SUPPLEMENT_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: payload,
      };
    case SUPPLEMENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export default supplementCreateReducer;
