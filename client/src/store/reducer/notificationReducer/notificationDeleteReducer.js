import {
  NOTIFICATION_DELETE_FAIL,
  NOTIFICATION_DELETE_REQUEST,
  NOTIFICATION_DELETE_SUCCESS,
  NOTIFICATION_DELETE_RESET,
} from "../../actions/actionTypes";

const initialState = {
  success: false,
  loading: false,
  error: null,
};

const notificationDeleteReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case NOTIFICATION_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NOTIFICATION_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case NOTIFICATION_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: payload,
      };
    case NOTIFICATION_DELETE_RESET:
      return {
        ...state,
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};

export default notificationDeleteReducer;
