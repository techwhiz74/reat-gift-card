import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Box } from "@mui/material";

import AdminNav from "../components/admin/AdminNav";
import AdminDrawer from "../components/admin/AdminDrawer";

import { logout } from "../store/actions/userActions";

const drawWidth = 250;

export default function AdminLayout() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/");
    }
  });

  const [mobileViewOpen, setMobileViewOpen] = useState(false);
  const handleToggle = () => {
    setMobileViewOpen(!mobileViewOpen);
  };

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AdminNav
        toggle={handleToggle}
        drawWidth={drawWidth}
        logout={logoutHandler}
      />
      <AdminDrawer
        toggle={handleToggle}
        mobileView={mobileViewOpen}
        drawWidth={drawWidth}
        user={userInfo}
      />
    </Box>
  );
}
