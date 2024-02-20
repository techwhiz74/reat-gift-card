import axios from "axios";
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_RESET,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from "./actionTypes";

// import Api from "../../services/Api";

export const listProducts = (keyword = "", pageNumber = "") => {
  return async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const response = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: response.data });
      return response;
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const listAllProducts = (keyword = "", pageNumber = "") => {
  return async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const response = await axios.get(
        `/api/products/all?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: response.data });
      return response;
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const listProductDetail = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAIL_REQUEST });
      const response = await axios.get(`/api/products/${id}`);
      dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: response.data });
      return response;
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAIL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_DELETE_REQUEST });
      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
      await axios.delete(`/api/products/${id}`, config);

      dispatch({ type: PRODUCT_DELETE_SUCCESS });
      dispatch({ type: PRODUCT_DELETE_RESET });
    } catch (error) {
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const createProduct = (product) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REQUEST });
      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };

      const { data } = await axios.post(`/api/products`, product, config);
      dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const updateProduct = (product) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_UPDATE_REQUEST });

      const { data } = await axios.put(`/api/products/${product._id}`, product);
      dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const createProductReview = (productId, review) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
      await axios.post(`/api/products/${productId}/reviews`, review, config);

      dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const listTopProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_TOP_REQUEST });
      const response = await axios.get(`/api/products/top`);
      dispatch({ type: PRODUCT_TOP_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: PRODUCT_TOP_FAIL,
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const Upload = (file) => {
  return async (dispatch, getState) => {
    try {
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      //   },
      // };

      const { data } = await axios.post(`/api/upload`, file);

      return data;
    } catch (error) {}
  };
};
