import {
  NOTIFICATION_CREATE_FAIL,
  NOTIFICATION_CREATE_REQUEST,
  NOTIFICATION_CREATE_SUCCESS,
  NOTIFICATION_CREATE_RESET,
} from "../../actions/actionTypes";

const initialState = {
  notification: null,
  success: false,
  loading: false,
  error: null,
};

const notificationCreateReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case NOTIFICATION_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NOTIFICATION_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        notification: payload,
      };
    case NOTIFICATION_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: payload,
      };
    case NOTIFICATION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export default notificationCreateReducer;
