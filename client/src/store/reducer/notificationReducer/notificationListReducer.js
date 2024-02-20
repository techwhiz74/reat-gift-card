import {
  NOTIFICATION_LIST_FAIL,
  NOTIFICATION_LIST_REQUEST,
  NOTIFICATION_LIST_SUCCESS,
  NOTIFICATION_LIST_RESET,
} from "../../actions/actionTypes";

const initialState = {
  notifications: [],
  loading: false,
  error: null,
};

const notificationListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case NOTIFICATION_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NOTIFICATION_LIST_SUCCESS:
      return {
        ...state,
        notifications: payload,
        loading: false,
      };
    case NOTIFICATION_LIST_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case NOTIFICATION_LIST_RESET:
      return {
        notifications: [],
      };
    default:
      return state;
  }
};

export default notificationListReducer;
