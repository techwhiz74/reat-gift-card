import axios from "axios";
import {
  ADDRESS_CREATE_FAIL,
  ADDRESS_CREATE_REQUEST,
  ADDRESS_CREATE_SUCCESS,
  ADDRESS_DELETE_FAIL,
  ADDRESS_DELETE_REQUEST,
  ADDRESS_DELETE_SUCCESS,
  ADDRESS_DELETE_RESET,
  ADDRESS_DETAIL_FAIL,
  ADDRESS_DETAIL_REQUEST,
  ADDRESS_DETAIL_SUCCESS,
  ADDRESS_LIST_FAIL,
  ADDRESS_LIST_REQUEST,
  ADDRESS_LIST_SUCCESS,
  ADDRESS_UPDATE_FAIL,
  ADDRESS_UPDATE_REQUEST,
  ADDRESS_UPDATE_SUCCESS,
} from "./actionTypes";
import { logout } from "../actions/userActions";

// import Api from "../../services/Api";

export const createAddress = (address) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ADDRESS_CREATE_REQUEST });
      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };

      const { data } = await axios.post(`/api/addresses`, address, config);
      dispatch({ type: ADDRESS_CREATE_SUCCESS, payload: data });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(logout());
      } else {
        dispatch({
          type: ADDRESS_CREATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }
  };
};

export const updateAddress = (address) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ADDRESS_UPDATE_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/addresses/${address._id}`,
        address,
        config
      );

      dispatch({ type: ADDRESS_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(logout());
      } else {
        dispatch({
          type: ADDRESS_UPDATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }
  };
};

export const listAddresses = (user, keyword = "", pageNumber = "") => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ADDRESS_LIST_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
      const response = await axios.get(
        `/api/addresses/${user}?keyword=${keyword}&pageNumber=${pageNumber}`,
        config
      );

      dispatch({ type: ADDRESS_LIST_SUCCESS, payload: response.data });
      return response;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(logout());
      } else {
        dispatch({
          type: ADDRESS_LIST_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }
  };
};

export const listAddressDetail = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ADDRESS_DETAIL_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };

      const response = await axios.get(`/api/addresses/detail/${id}`, config);
      dispatch({ type: ADDRESS_DETAIL_SUCCESS, payload: response.data });
      return response;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(logout());
      } else {
        dispatch({
          type: ADDRESS_DETAIL_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }
  };
};

export const deleteAddress = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ADDRESS_DELETE_REQUEST });
      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
      await axios.delete(`/api/addresses/${id}`, config);

      dispatch({ type: ADDRESS_DELETE_SUCCESS });
      dispatch({ type: ADDRESS_DELETE_RESET });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(logout());
      } else {
        dispatch({
          type: ADDRESS_DELETE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }
  };
};
