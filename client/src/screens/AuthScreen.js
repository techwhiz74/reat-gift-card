import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Box, Card } from "@mui/material";

import {
  loginOAuthFacebook,
  loginOAuthGoogle,
} from "../store/actions/userActions";

import GoogleLog from "./auth/GoogleLog";
import MailLog from "./auth/MailLog";
import ForgotPass from "./auth/ForgotPass";
import MailSign from "./auth/MailSign";
import Footer from "../components/Footer";

export default function LoginScreen(props) {
  const dispatch = useDispatch();
  const [currentModal, setCurrentModal] = useState("googleLog");
  const { fromcart } = useParams();

  const { userInfo } = useSelector((state) => state.userLogin);

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  useEffect(() => {
    if (userInfo) {
      if (userInfo.isAdmin) {
        props.history.push("/admin/dashboard");
      } else {
        if (fromcart) {
          props.history.push("/cart");
        } else {
          props.history.push(redirect);
        }
      }
    }
  }, [userInfo, redirect, props.history, fromcart]);

  const loginGoogleHandler = (e) => {
    e.preventDefault();
    dispatch(loginOAuthGoogle());
  };

  const loginFacebookHandler = (e) => {
    e.preventDefault();
    dispatch(loginOAuthFacebook());
  };

  const toGoogle = () => {
    setCurrentModal("googleLog");
  };

  const toMailLog = () => {
    setCurrentModal("mailLog");
  };

  const toForgot = () => {
    setCurrentModal("forgotPass");
  };

  const toRegister = () => {
    setCurrentModal("googleSign");
  };

  const toMailSign = () => {
    setCurrentModal("mailSign");
  };

  return (
    <>
      <Box className="login_panel">
        <Card sx={{ boxShadow: 3 }}>
          {currentModal === "googleLog" && (
            <GoogleLog
              toMailFcn={toMailLog}
              googleHandler={loginGoogleHandler}
              facebookHandler={loginFacebookHandler}
            />
          )}
          {currentModal === "mailLog" && (
            <MailLog
              backFcn={toGoogle}
              registerFcn={toRegister}
              forgotFcn={toForgot}
            />
          )}
          {currentModal === "forgotPass" && <ForgotPass backFcn={toMailLog} />}
          {currentModal === "googleSign" && (
            <GoogleLog
              method="signUp"
              toMailFcn={toMailSign}
              googleHandler={loginGoogleHandler}
              facebookHandler={loginFacebookHandler}
            />
          )}
          {currentModal === "mailSign" && (
            <MailSign backFcn={toRegister} loginFcn={toGoogle} />
          )}
        </Card>
      </Box>
      <Footer />
    </>
  );
}
