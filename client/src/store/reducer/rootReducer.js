import { combineReducers } from "redux";
import cartReducer from "./cartReducer";

import productDetailReducer from "./productReducer/productDetailReducer";
import productListReducer from "./productReducer/productListReducer";
import productDeleteReducer from "./productReducer/productDeleteReducer";
import productCreateReducer from "./productReducer/productCreateReducer";
import productUpdateReducer from "./productReducer/productUpdateReducer";
import productCreateReviewReducer from "./productReducer/productCreateReviewReducer";
import productTopRatedReducer from "./productReducer/ProductTopRatedReducer";

import userDeleteReducer from "./userReducer/userDeleteReducer";
import userDetailReducer from "./userReducer/userDetailReducer";
import userListReducer from "./userReducer/userListReducer";
import userLoginReducer from "./userReducer/userLoginReducer";
import userRegisterReducer from "./userReducer/userRegisterReducer";
import userUpdateProfileReducer from "./userReducer/userUpdateProfileReducer";
import userResetPasswordReducer from "./userReducer/userUpdatePasswordReducer";
import userRequestMailReducer from "./userReducer/userRequestMailReducer";
import userUpdateReducer from "./userReducer/userUpdateReducer";
import shippedConfirmMailReducer from "./userReducer/shippedConfirmMailReducer";

import orderCreateReducer from "./orderReducer/orderCreateReducer";
import orderDetailsReducer from "./orderReducer/orderDetailsReducer";
import orderListMyReducer from "./orderReducer/orderListMyReducer";
import orderPayReducer from "./orderReducer/orderPayReducer";
import orderListReducer from "./orderReducer/orderListReducer";
import orderDeliverReducer from "./orderReducer/orderDeliverReducer";
import orderDeleteReducer from "./orderReducer/orderDeleteReducer";

import categoryDetailReducer from "./categoryReducer/categoryDetailReducer";
import categoryListReducer from "./categoryReducer/categoryListReducer";
import categoryDeleteReducer from "./categoryReducer/categoryDeleteReducer";
import categoryCreateReducer from "./categoryReducer/categoryCreateReducer";
import categoryUpdateReducer from "./categoryReducer/categoryUpdateReducer";

import supplementDetailReducer from "./supplementReducer/supplementDetailReducer";
import supplementListReducer from "./supplementReducer/supplementListReducer";
import supplementDeleteReducer from "./supplementReducer/supplementDeleteReducer";
import supplementCreateReducer from "./supplementReducer/supplementCreateReducer";
import supplementUpdateReducer from "./supplementReducer/supplementUpdateReducer";

import addressDetailReducer from "./addressReducer/addressDetailReducer";
import addressListReducer from "./addressReducer/addressListReducer";
import addressDeleteReducer from "./addressReducer/addressDeleteReducer";
import addressCreateReducer from "./addressReducer/addressCreateReducer";
import addressUpdateReducer from "./addressReducer/addressUpdateReducer";

import notificationListReducer from "./notificationReducer/notificationListReducer";
import notificationDeleteReducer from "./notificationReducer/notificationDeleteReducer";
import notificationCreateReducer from "./notificationReducer/notificationCreateReducer";
import notificationUpdateReducer from "./notificationReducer/notificationUpdateReducer";

const rootReducer = () =>
  combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productCreateReview: productCreateReviewReducer,
    productTopRated: productTopRatedReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetail: userDetailReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userResetPassword: userResetPasswordReducer,
    userRequestMail: userRequestMailReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    shippedConfirmMail: shippedConfirmMailReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    categoryList: categoryListReducer,
    categoryDetail: categoryDetailReducer,
    categoryDelete: categoryDeleteReducer,
    categoryCreate: categoryCreateReducer,
    categoryUpdate: categoryUpdateReducer,
    supplementList: supplementListReducer,
    supplementDetail: supplementDetailReducer,
    supplementDelete: supplementDeleteReducer,
    supplementCreate: supplementCreateReducer,
    supplementUpdate: supplementUpdateReducer,
    addressList: addressListReducer,
    addressDetail: addressDetailReducer,
    addressDelete: addressDeleteReducer,
    addressCreate: addressCreateReducer,
    addressUpdate: addressUpdateReducer,
    notificationList: notificationListReducer,
    notificationDelete: notificationDeleteReducer,
    notificationCreate: notificationCreateReducer,
    notificationUpdate: notificationUpdateReducer,
  });

export default rootReducer;
