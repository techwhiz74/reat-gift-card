import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  AppBar,
  IconButton,
  Toolbar,
  Link,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";

import ConfirmModal from "../ConfirmModal";
import NotificationsPopover from "../NotificationsPopover";

import { logout } from "../../store/actions/userActions";

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

export default function AdminNav(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 576px");

  const toStore = () => {
    history.push("/");
  };

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
    setOpen(false);
  };

  const outConfirm = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <AppBar
      position="fixed"
      color="inherit"
      sx={{
        width: { sm: `calc(100% - ${props.drawWidth}px)` },
        ml: { sm: `${props.drawWidth}px` },
        paddingY: "7px",
      }}
    >
      <Toolbar sx={{ paddingX: 1 }}>
        <IconButton
          color="primary"
          edge="start"
          onClick={props.toggle}
          sx={{ display: { sm: "none" }, ml: 1 }}
        >
          <MenuIcon />
        </IconButton>
        {/* <Link
          href="/"
          underline="none"
          sx={{ display: { sm: "none" }, margin: "auto" }}
        >
          <img
            alt="Logo"
            src="/assets/logo.jpg"
            className="m-auto block "
            height={"50px"}
          />
        </Link> */}

        <div style={{ marginLeft: "auto", marginRight: isMobile ? "5%" : 1 }}>
          {isMobile ? null : (
            <IconButton>
              <img
                id="flag"
                alt="Flag"
                src="/assets/uk.png"
                className="m-auto block"
              />
            </IconButton>
          )}

          <IconButton color="primary" onClick={toStore}>
            <div>
              <BootstrapTooltip title="Store">
                <StorefrontOutlinedIcon />
              </BootstrapTooltip>
            </div>
          </IconButton>

          <NotificationsPopover />

          {isMobile ? null : (
            <IconButton color="primary" onClick={outConfirm}>
              <div>
                <BootstrapTooltip title="Logout">
                  <LogoutOutlinedIcon />
                </BootstrapTooltip>
              </div>
            </IconButton>
          )}
        </div>

        <ConfirmModal
          open={open}
          closeFcn={handleClose}
          actionFcn={logoutHandler}
          type="Logout"
        />
      </Toolbar>
    </AppBar>
  );
}
