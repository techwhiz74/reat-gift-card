import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from "./actionTypes";

export const addToCart = (id, qty, isFree) => {
  return async (dispatch, getState) => {
    const response = await axios.get(`/api/products/${id}`);

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: response.data._id,
        name: response.data.name,
        imageUrl: response.data.imageUrl,
        blankUrl: response.data.blankUrl,
        frontUrl: response.data.frontUrl,
        preSMSUrl: response.data.preSMSUrl,
        middleUrl: response.data.middleUrl,
        category: response.data.category,
        trending: response.data.trending,
        price: response.data.price,
        postageFee: response.data.postageFee,
        qty: qty,
        isFree: isFree,
        extra: false,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

export const giftToCart = (id, qty, amount, fee) => {
  return async (dispatch, getState) => {
    const response = await axios.get(`/api/supplements/${id}`);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: response.data._id,
        name: response.data.name,
        imageUrl: response.data.imageUrl,
        frontUrl: response.data.frontUrl,
        price: amount ? amount : response.data.price,
        shipping: response.data.shipping,
        occasion: response.data.occasion,
        category: response.data.category,
        popular: response.data.popular,
        qty: qty,
        fee: fee,
        extra: true,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

export const removeFromCart = (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

export const saveShippingAddress = (data) => {
  return (dispatch) => {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
    });
    localStorage.setItem("shippingAddress", JSON.stringify(data));
  };
};
