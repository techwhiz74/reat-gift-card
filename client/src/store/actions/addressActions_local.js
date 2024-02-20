import {
  ADDRESS_CREATE_ITEM,
  ADDRESS_REMOVE_ITEM,
  ADDRESS_LIST_ITEM,
} from "./actionTypes";
import { v4 as uuidv4 } from "uuid";

export const createAddress = (address) => {
  return async (dispatch, getState) => {
    dispatch({
      type: ADDRESS_CREATE_ITEM,
      payload: {
        _id: uuidv4(),
        name: address.name,
        street_address: address.street_address,
        city: address.city,
        state: address.state,
        zip_code: address.zip_code,
        googleMapLink: address.googleMapLink,
      },
    });
    localStorage.setItem(
      "addressItems",
      JSON.stringify(getState().address.addressItems)
    );
  };
};

export const updateAddress = (address) => {
  return async (dispatch, getState) => {
    dispatch({
      type: ADDRESS_CREATE_ITEM,
      payload: {
        _id: address._id,
        name: address.name,
        street_address: address.street_address,
        city: address.city,
        state: address.state,
        zip_code: address.zip_code,
        googleMapLink: address.googleMapLink,
      },
    });
    localStorage.setItem(
      "addressItems",
      JSON.stringify(getState().address.addressItems)
    );
  };
};

export const listAddresses = () => {
  return async (dispatch) => {
    const addressListDetails = JSON.parse(localStorage.getItem("addressItems"));
    if (addressListDetails) {
      dispatch({
        type: ADDRESS_LIST_ITEM,
        payload: addressListDetails,
      });
    }
  };
};

export const listAddressDetail = (id) => {
  return async (dispatch) => {
    const addressDetail = JSON.parse(localStorage.getItem("addressItems")).find(
      (x) => x._id === id
    );
    return addressDetail;
  };
};

export const deleteAddress = (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: ADDRESS_REMOVE_ITEM,
      payload: id,
    });
    localStorage.setItem(
      "addressItems",
      JSON.stringify(getState().address.addressItems)
    );
  };
};
