import axios from "axios";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_RESET,
} from "./actionTypes";
import { logout } from "../actions/userActions";

export const createOrder = (order) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_CREATE_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
      const response = await axios.post(`/api/orders`, order, config);
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: response.data });
      return response;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(logout());
      } else {
        dispatch({
          type: ORDER_CREATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }
  };
};

export const getOrderDetails = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST });
      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
      const response = await axios.get(`/api/orders/${id}`, config);

      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: response.data });
      return response;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(logout());
      } else {
        dispatch({
          type: ORDER_DETAILS_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }
  };
};

export const payOrder = (orderId, paymentResult) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_PAY_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
      const response = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch({ type: ORDER_PAY_SUCCESS, payload: response.data });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(logout());
      } else {
        dispatch({
          type: ORDER_PAY_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }
  };
};

export const updateOrderStatus = (order) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_DELIVER_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
      const response = await axios.put(
        `/api/orders/${order._id}/status`,
        order,
        config
      );

      dispatch({ type: ORDER_DELIVER_SUCCESS, payload: response.data });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(logout());
      } else {
        dispatch({
          type: ORDER_DELIVER_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }
  };
};

export const listMyOrders = (keyword = "", pageNumber = 1) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_LIST_MY_REQUEST });
      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };

      const response = await axios.get(
        `/api/orders/myorders?keyword=${keyword}&pageNumber=${pageNumber}`,
        config
      );

      dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: response.data });
      return response;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(logout());
      } else {
        dispatch({
          type: ORDER_LIST_MY_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }
  };
};

export const listOrders = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_LIST_REQUEST });
      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
      const response = await axios.get(`/api/orders`, config);

      dispatch({ type: ORDER_LIST_SUCCESS, payload: response.data });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(logout());
      } else {
        dispatch({
          type: ORDER_LIST_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }
  };
};

export const deleteOrder = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_DELETE_REQUEST });
      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
      await axios.delete(`/api/orders/${id}`, config);

      dispatch({ type: ORDER_DELETE_SUCCESS });
      dispatch({ type: ORDER_DELETE_RESET });
    } catch (error) {
      dispatch({
        type: ORDER_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
