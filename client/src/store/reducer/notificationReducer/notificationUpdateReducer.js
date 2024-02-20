import {
  NOTIFICATION_UPDATE_FAIL,
  NOTIFICATION_UPDATE_REQUEST,
  NOTIFICATION_UPDATE_SUCCESS,
  NOTIFICATION_UPDATE_RESET,
} from "../../actions/actionTypes";

const initialState = {
  notification: null,
  success: false,
  loading: false,
  error: null,
};

const notificationUpdateReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case NOTIFICATION_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NOTIFICATION_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        notification: payload,
      };
    case NOTIFICATION_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: payload,
      };
    case NOTIFICATION_UPDATE_RESET:
      return { notification: null };
    default:
      return state;
  }
};

export default notificationUpdateReducer;
