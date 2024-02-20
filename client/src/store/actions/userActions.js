import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAIL,
  USER_DETAIL_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_FAIL_VIA_FACEBOOK,
  USER_LOGIN_FAIL_VIA_GOOGLE,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REQUEST_MAIL_SEND_REQUEST,
  USER_REQUEST_MAIL_SEND_FAIL,
  USER_REQUEST_MAIL_SEND_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  PASSWORD_UPDATE_REQUEST,
  PASSWORD_UPDATE_SUCCESS,
  PASSWORD_UPDATE_FAIL,
  ORDER_LIST_MY_RESET,
  SHIPPED_CONFIRM_MAIL_SEND_REQUEST,
  SHIPPED_CONFIRM_MAIL_SEND_FAIL,
  SHIPPED_CONFIRM_MAIL_SEND_SUCCESS,
} from "./actionTypes";

import Api from "../../services/Api";

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `/api/users/login`,
        { email, password },
        config
      );

      dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data });
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      localStorage.setItem("token", JSON.stringify(response.data.token));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETAIL_RESET });
    dispatch({ type: ORDER_LIST_MY_RESET });
    dispatch({ type: USER_LIST_RESET });
  };
};

export const loginOAuthGoogle = () => {
  return (dispatch) => {
    function receiveMessage(event) {
      if (event.origin !== Api.url) {
        dispatch({ type: USER_LOGIN_FAIL_VIA_GOOGLE });
        return;
      }
      if (event.data) {
        localStorage.setItem("user", event.data);
        const data = JSON.parse(event.data);
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data.user.email });
        localStorage.setItem("userInfo", JSON.stringify(data));
      }
    }
    window.open(`/api/auth/google`, "Google OAuth", "height=615,width=605");
    window.addEventListener("message", receiveMessage, false);
  };
};

export const loginOAuthFacebook = () => {
  return (dispatch) => {
    function receiveMessage(event) {
      if (event.origin !== Api.url) {
        dispatch({ type: USER_LOGIN_FAIL_VIA_FACEBOOK });
        return;
      }
      if (event.data) {
        localStorage.setItem("user", event.data);
        const data = JSON.parse(event.data);
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data.user.email });
      }
    }
    window.open(`/api/auth/facebook`, "Facebook OAuth", "height=615,width=605");
    window.addEventListener("message", receiveMessage, false);
  };
};

export const register = (name, email, password, freeCards, spent, orders) => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `/api/users`,
        { name, email, password, freeCards, spent, orders },
        config
      );

      dispatch({ type: USER_REGISTER_SUCCESS, payload: response.data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data });
      localStorage.setItem("userInfo", JSON.stringify(response.data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const getUserDetail = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: USER_DETAIL_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
      const response = await axios.get(`/api/users/${id}`, config);

      dispatch({ type: USER_DETAIL_SUCCESS, payload: response.data });
      return response;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(logout());
      } else {
        dispatch({
          type: USER_DETAIL_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }
  };
};

export const updateUserProfile = (user) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
      console.log(user);

      const response = await axios.put(`/api/users/profile`, user, config);
      dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: response.data });

      login();

      dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data });
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      return response;
    } catch (error) {
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const listUsers = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: USER_LIST_REQUEST });
      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
      const response = await axios.get(`/api/users`, config);

      dispatch({ type: USER_LIST_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: USER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: USER_DELETE_REQUEST });
      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
      await axios.delete(`/api/users/${id}`, config);

      dispatch({ type: USER_DELETE_SUCCESS });
    } catch (error) {
      dispatch({
        type: USER_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const updateUser = (user) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
      const { data } = await axios.put(`/api/users/${user._id}`, user, config);

      dispatch({ type: USER_UPDATE_SUCCESS });
      dispatch({ type: USER_DETAIL_SUCCESS, payload: data });
      dispatch({ type: USER_UPDATE_RESET });
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const resetRequest = (mailAddress) => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_REQUEST_MAIL_SEND_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/users/send-reset-mail`,
        { mailAddress },
        config
      );
      dispatch({ type: USER_REQUEST_MAIL_SEND_SUCCESS, payload: data });
      return data;
    } catch (error) {
      dispatch({
        type: USER_REQUEST_MAIL_SEND_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const resetPassword = (user) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PASSWORD_UPDATE_REQUEST });

      const response = await axios.post(`/api/users/reset`, user);
      dispatch({ type: PASSWORD_UPDATE_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: PASSWORD_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const checkTokenExpiration = () => {
  return async (dispatch, getState) => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        localStorage.removeItem("token");
        dispatch(logout());
      }
    }
  };
};

export const shippedConfirmMail = (mailAddress, order) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SHIPPED_CONFIRM_MAIL_SEND_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/users/shipped-confirm-mail`,
        { mailAddress, order },
        config
      );
      dispatch({ type: SHIPPED_CONFIRM_MAIL_SEND_SUCCESS, payload: data });
      return data;
    } catch (error) {
      dispatch({
        type: SHIPPED_CONFIRM_MAIL_SEND_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
