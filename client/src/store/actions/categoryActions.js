import axios from "axios";
import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_RESET,
  CATEGORY_DETAIL_FAIL,
  CATEGORY_DETAIL_REQUEST,
  CATEGORY_DETAIL_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
} from "./actionTypes";

// import Api from "../../services/Api";

export const createCategory = (category) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: CATEGORY_CREATE_REQUEST });
      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };

      const { data } = await axios.post(`/api/category`, category, config);
      dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CATEGORY_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const updateCategory = (category) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: CATEGORY_UPDATE_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/category/${category._id}`,
        category,
        config
      );

      dispatch({ type: CATEGORY_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CATEGORY_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const listCategories = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: CATEGORY_LIST_REQUEST });
      const response = await axios.get(`/api/category`);

      dispatch({ type: CATEGORY_LIST_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: CATEGORY_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const listCategoryDetail = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: CATEGORY_DETAIL_REQUEST });
      const response = await axios.get(`/api/category/${id}`);
      dispatch({ type: CATEGORY_DETAIL_SUCCESS, payload: response.data });
      return response;
    } catch (error) {
      dispatch({
        type: CATEGORY_DETAIL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const deleteCategory = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: CATEGORY_DELETE_REQUEST });
      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
      await axios.delete(`/api/category/${id}`, config);

      dispatch({ type: CATEGORY_DELETE_SUCCESS });
      dispatch({ type: CATEGORY_DELETE_RESET });
    } catch (error) {
      dispatch({
        type: CATEGORY_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
