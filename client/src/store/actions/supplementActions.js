import axios from "axios";
import {
  SUPPLEMENT_CREATE_FAIL,
  SUPPLEMENT_CREATE_REQUEST,
  SUPPLEMENT_CREATE_SUCCESS,
  SUPPLEMENT_DELETE_FAIL,
  SUPPLEMENT_DELETE_REQUEST,
  SUPPLEMENT_DELETE_SUCCESS,
  SUPPLEMENT_DELETE_RESET,
  SUPPLEMENT_DETAIL_FAIL,
  SUPPLEMENT_DETAIL_REQUEST,
  SUPPLEMENT_DETAIL_SUCCESS,
  SUPPLEMENT_LIST_FAIL,
  SUPPLEMENT_LIST_REQUEST,
  SUPPLEMENT_LIST_SUCCESS,
  SUPPLEMENT_UPDATE_FAIL,
  SUPPLEMENT_UPDATE_REQUEST,
  SUPPLEMENT_UPDATE_SUCCESS,
} from "./actionTypes";

// import Api from "../../services/Api";

export const listSupplements = (keyword = "", pageNumber = "") => {
  return async (dispatch) => {
    try {
      dispatch({ type: SUPPLEMENT_LIST_REQUEST });
      const response = await axios.get(
        `/api/supplements?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      dispatch({ type: SUPPLEMENT_LIST_SUCCESS, payload: response.data });
      return response;
    } catch (error) {
      dispatch({
        type: SUPPLEMENT_LIST_FAIL,
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const listAllSupplements = (keyword = "", pageNumber = "") => {
  return async (dispatch) => {
    try {
      dispatch({ type: SUPPLEMENT_LIST_REQUEST });
      const response = await axios.get(
        `/api/supplements/all?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      dispatch({ type: SUPPLEMENT_LIST_SUCCESS, payload: response.data });
      return response;
    } catch (error) {
      dispatch({
        type: SUPPLEMENT_LIST_FAIL,
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const listSupplementDetail = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SUPPLEMENT_DETAIL_REQUEST });
      const response = await axios.get(`/api/supplements/${id}`);
      dispatch({ type: SUPPLEMENT_DETAIL_SUCCESS, payload: response.data });
      return response;
    } catch (error) {
      dispatch({
        type: SUPPLEMENT_DETAIL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const deleteSupplement = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SUPPLEMENT_DELETE_REQUEST });
      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
      await axios.delete(`/api/supplements/${id}`, config);

      dispatch({ type: SUPPLEMENT_DELETE_SUCCESS });
      dispatch({ type: SUPPLEMENT_DELETE_RESET });
    } catch (error) {
      dispatch({
        type: SUPPLEMENT_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const createSupplement = (supplement) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SUPPLEMENT_CREATE_REQUEST });
      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };

      const { data } = await axios.post(`/api/supplements`, supplement, config);
      dispatch({ type: SUPPLEMENT_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SUPPLEMENT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const updateSupplement = (supplement) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SUPPLEMENT_UPDATE_REQUEST });

      const { data } = await axios.put(
        `/api/supplements/${supplement._id}`,
        supplement
      );
      dispatch({ type: SUPPLEMENT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SUPPLEMENT_UPDATE_FAIL,
        payload:
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
      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };

      const { data } = await axios.post(`/api/upload`, file, config);

      return data;
    } catch (error) {}
  };
};
