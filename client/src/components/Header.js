import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Container,
  Link,
  AppBar,
  Toolbar,
  Badge,
  IconButton,
  Stack,
  useMediaQuery,
  SwipeableDrawer,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonIcon from "@mui/icons-material/Person";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";

import ConfirmModal from "./ConfirmModal";
import HeaderDrawContent from "./landing/HeaderDrawContent";
import HeaderButton from "./landing/HeaderButton";
import { getUserDetail, logout } from "../store/actions/userActions";

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

export default function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width: 816px");
  const { userInfo } = useSelector((state) => state.userLogin);
  const { cartItems } = useSelector((state) => state.cart);
  const { success: userUpdateSuccess } = useSelector(
    (state) => state.userUpdate
  );
  const { success: orderPaySuccess } = useSelector((state) => state.orderPay);

  const [userData, setUserData] = useState({});

  const getUserData = useCallback(
    (id) => {
      dispatch(getUserDetail(id))
        .then((res) => {
          if (res.data) {
            setUserData((prevData) => ({
              ...prevData,
              _id: res.data._id,
              freeCards: res.data.freeCards,
              createdAt: res.data.createdAt,
            }));
          } else {
            dispatch(logout());
            history.push("/login");
          }
        })
        .catch((error) => {
          dispatch(logout());
          history.push("/login");
        });
    },
    [dispatch, history]
  );

  useEffect(() => {
    if (userInfo) {
      getUserData(userInfo._id);
    }
  }, [dispatch, getUserData, userInfo, userUpdateSuccess, orderPaySuccess]);

  const toLogin = () => {
    history.push("/login");
  };

  const toAdmin = () => {
    history.push(`/admin/dashboard`);
    handleAccountClose();
  };

  const toAccount = () => {
    history.push(`/account/profile`);
    handleAccountClose();
  };

  const toSearch = () => {
    history.push("/search");
  };

  // For menu on mobile screen
  const [menuOpen, setMenuOpen] = React.useState(false);
  const toggleDrawer = (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setMenuOpen(!menuOpen);
  };

  // Account menu
  const [anchorEl, setAnchorEl] = useState(null);
  const handleAccountOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAccountClose = () => {
    setAnchorEl(null);
  };

  // Logout confirm modal
  const [confirmOpen, setConfirmOpen] = useState(false);
  const confirmClose = () => setConfirmOpen(false);
  const outConfirm = () => {
    setConfirmOpen(true);
    handleAccountClose();
  };

  const logoutHandler = () => {
    dispatch(logout());
    setConfirmOpen(false);
    history.push("/");
  };

  return (
    <header>
      <AppBar
        color="inherit"
        position="fixed"
        sx={{ boxShadow: userInfo?.isAdmin || isMobile ? 2 : 2 }}
      >
        <Container>
          <Toolbar sx={{ paddingY: "10px", alignItems: "flex-end" }}>
            {isMobile ? (
              <Stack direction="column">
                <img
                  src="/assets/icons/menu.png"
                  alt=""
                  height="30px"
                  width="27px"
                  style={{ marginBottom: "3px" }}
                  onClick={toggleDrawer}
                />
                <SwipeableDrawer
                  id="menu-drawer"
                  anchor={"left"}
                  open={menuOpen}
                  onClose={toggleDrawer}
                  onOpen={toggleDrawer}
                >
                  <HeaderDrawContent
                    toggle={toggleDrawer}
                    userInfo={userInfo}
                  />
                </SwipeableDrawer>
              </Stack>
            ) : null}

            {userInfo ? (
              <>
                <Stack
                  direction="row"
                  alignItems="flex-end"
                  justifyContent={isMobile ? "center" : "space-between"}
                  style={{ width: "100%" }}
                >
                  <Link href="/" underline="none" color="inherit">
                    <img
                      id="logo"
                      alt="Logo"
                      src="/assets/logo.jpg"
                      className="m-auto block"
                    />
                  </Link>
                  <div className="header-buttons">
                    {isMobile ? null : <HeaderButton />}
                    {isMobile ? null : (
                      <>
                        <IconButton color="primary" href="/cart">
                          <Badge
                            badgeContent={cartItems.length}
                            color="error"
                            sx={{
                              "& .MuiBadge-badge": {
                                fontSize: 9,
                                height: 15,
                                minWidth: 15,
                              },
                            }}
                          >
                            <BootstrapTooltip title="Shopping cart">
                              <ShoppingCartOutlinedIcon />
                            </BootstrapTooltip>
                          </Badge>
                        </IconButton>

                        <IconButton
                          color="primary"
                          aria-controls={anchorEl ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={Boolean(anchorEl) ? "true" : undefined}
                          onClick={handleAccountOpen}
                        >
                          <Badge
                            badgeContent={userData.freeCards}
                            color="success"
                            sx={{
                              "& .MuiBadge-badge": {
                                fontSize: 9,
                                height: 15,
                                minWidth: 15,
                                display: userInfo.isAdmin && "none",
                              },
                            }}
                          >
                            <PersonOutlineIcon />
                          </Badge>
                        </IconButton>

                        <IconButton color="primary" onClick={toSearch}>
                          <BootstrapTooltip title="Search">
                            <SearchIcon />
                          </BootstrapTooltip>
                        </IconButton>

                        <img
                          id="flag"
                          alt="Flag"
                          src="/assets/uk.png"
                          className="m-auto block"
                        />
                      </>
                    )}
                  </div>
                </Stack>
                {isMobile ? (
                  <PersonIcon
                    aria-controls={anchorEl ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={Boolean(anchorEl) ? "true" : undefined}
                    sx={{ fontSize: 32, marginBottom: "2px" }}
                    onClick={userInfo ? handleAccountOpen : toLogin}
                  />
                ) : null}

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleAccountClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  onMouseLeave={handleAccountClose}
                >
                  {userInfo.isAdmin ? (
                    <MenuItem onClick={toAdmin} sx={{ width: "150px" }}>
                      <VerifiedUserOutlinedIcon
                        color="rgba(0, 0, 0, 0.54)"
                        sx={{ marginRight: 2, width: "22px" }}
                      />
                      Admin
                    </MenuItem>
                  ) : (
                    <MenuItem onClick={toAccount} sx={{ width: "180px" }}>
                      <AccountCircleOutlinedIcon
                        color="rgba(0, 0, 0, 0.54)"
                        sx={{ marginRight: 2, width: "22px" }}
                      />
                      My account
                    </MenuItem>
                  )}

                  <MenuItem onClick={outConfirm}>
                    <LogoutOutlinedIcon
                      color="rgba(0, 0, 0, 0.54)"
                      sx={{ marginRight: 2, width: "22px" }}
                    />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Stack
                  direction="row"
                  alignItems="flex-end"
                  justifyContent={isMobile ? "center" : "space-between"}
                  style={{ width: "100%" }}
                >
                  <Link href="/" underline="none" color="inherit">
                    <img
                      id="logo"
                      alt="Logo"
                      src="/assets/logo.jpg"
                      className="m-auto block logo"
                    />
                  </Link>

                  <div className="header-buttons">
                    {isMobile ? null : (
                      <>
                        <HeaderButton />
                        <IconButton color="primary" href="/cart">
                          <Badge
                            badgeContent={cartItems.length}
                            color="error"
                            sx={{
                              "& .MuiBadge-badge": {
                                fontSize: 9,
                                height: 15,
                                minWidth: 15,
                              },
                            }}
                          >
                            <BootstrapTooltip title="Shopping cart">
                              <ShoppingCartOutlinedIcon />
                            </BootstrapTooltip>
                          </Badge>
                        </IconButton>
                        <IconButton color="primary" onClick={toLogin}>
                          <BootstrapTooltip title="Login">
                            <PersonOutlineIcon />
                          </BootstrapTooltip>
                        </IconButton>
                        <IconButton color="primary" onClick={toSearch}>
                          <BootstrapTooltip title="Search">
                            <SearchIcon />
                          </BootstrapTooltip>
                        </IconButton>
                        <img
                          id="flag"
                          alt="Flag"
                          src="/assets/uk.png"
                          className="m-auto block"
                        />
                      </>
                    )}
                  </div>
                </Stack>

                {isMobile ? (
                  <PersonIcon
                    sx={{ fontSize: 32, marginBottom: "2px" }}
                    onClick={toLogin}
                  />
                ) : null}
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {userInfo?.isAdmin || isMobile ? (
        <div style={{ height: "65px" }}></div>
      ) : (
        <div style={{ marginTop: "65px" }}></div>
      )}

      <ConfirmModal
        open={confirmOpen}
        closeFcn={confirmClose}
        actionFcn={logoutHandler}
        type="Logout"
      />
    </header>
  );
}
