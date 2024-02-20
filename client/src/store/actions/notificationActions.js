import axios from "axios";
import {
  NOTIFICATION_CREATE_FAIL,
  NOTIFICATION_CREATE_REQUEST,
  NOTIFICATION_CREATE_SUCCESS,
  NOTIFICATION_DELETE_FAIL,
  NOTIFICATION_DELETE_REQUEST,
  NOTIFICATION_DELETE_SUCCESS,
  NOTIFICATION_DELETE_RESET,
  NOTIFICATION_LIST_FAIL,
  NOTIFICATION_LIST_REQUEST,
  NOTIFICATION_LIST_SUCCESS,
  NOTIFICATION_UPDATE_REQUEST,
  NOTIFICATION_UPDATE_SUCCESS,
  NOTIFICATION_UPDATE_FAIL,
} from "./actionTypes";

// import Api from "../../services/Api";

export const listNotifications = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: NOTIFICATION_LIST_REQUEST });
      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
      const response = await axios.get(`/api/notifications`, config);
      dispatch({ type: NOTIFICATION_LIST_SUCCESS, payload: response.data });
      return response;
    } catch (error) {
      dispatch({
        type: NOTIFICATION_LIST_FAIL,
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const deleteNotification = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: NOTIFICATION_DELETE_REQUEST });
      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
      await axios.delete(`/api/notifications/${id}`, config);

      dispatch({ type: NOTIFICATION_DELETE_SUCCESS });
      dispatch({ type: NOTIFICATION_DELETE_RESET });
    } catch (error) {
      dispatch({
        type: NOTIFICATION_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const createNotification = (notification) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: NOTIFICATION_CREATE_REQUEST });
      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/notifications`,
        notification,
        config
      );
      dispatch({ type: NOTIFICATION_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: NOTIFICATION_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const updateNotification = (notification) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: NOTIFICATION_UPDATE_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/notifications/${notification._id}`,
        notification,
        config
      );

      dispatch({ type: NOTIFICATION_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: NOTIFICATION_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
