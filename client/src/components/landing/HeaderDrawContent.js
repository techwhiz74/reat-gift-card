import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Container,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
// import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
// import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
// import SearchIcon from "@mui/icons-material/Search";
// import LoginIcon from "@mui/icons-material/Login";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
// import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
// import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { logout } from "../../store/actions/userActions";

export default function DrawerContent({ toggle, userInfo }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleButtonClick = (event, item) => {
    event.preventDefault();
    history.push(item.url);
    toggle(event);
  };
  const items = [
    {
      name: "Greeting cards",
      url: "/themes/page/1",
      icon: <ChevronRightIcon />,
      // icon: (
      //   <i
      //     className="bi bi-envelope-paper-heart"
      //     style={{ fontSize: "20px", marginLeft: "2px" }}
      //   />
      // ),
    },
    {
      name: "Birthdays",
      url: "/theme/Birthday/1",
      icon: <ChevronRightIcon />,
      // icon: <CakeOutlinedIcon />,
    },
    {
      name: "Gifts",
      url: "/gifts/page/1",
      icon: <ChevronRightIcon />,
      // icon: (
      //   <i
      //     className="bi bi-gift-fill"
      //     style={{ fontSize: "20px", marginLeft: "2px", fontWeight: "bold" }}
      //   />
      // ),
    },
    {
      name: "Gift Cards",
      url: "/gift/Gift Card/page/1",
      icon: <ChevronRightIcon />,
      // icon: <CardGiftcardIcon />,
    },
    {
      name: "Basket",
      url: "/cart",
      icon: <ChevronRightIcon />,
      // icon: <ShoppingCartOutlinedIcon />,
    },
    {
      name: "Search",
      url: "/search",
      icon: <ChevronRightIcon />,
      // icon: <SearchIcon />,
    },
  ];

  if (userInfo) {
    if (userInfo.isAdmin) {
      items.push({
        name: "Admin",
        url: "/admin/dashboard",
        icon: <ChevronRightIcon />,
        // icon: <VerifiedUserOutlinedIcon />,
      });
    }
    // else {
    // items.push({
    //   name: "My account",
    //   url: "/account/profile",
    //   icon: <ChevronRightIcon />,
    //   icon: <AccountCircleOutlinedIcon />,
    // });
    // }
  }

  const loginHandler = (event) => {
    history.push("/login");
    toggle(event);
  };

  const logoutHandler = (event) => {
    dispatch(logout());
    history.push("/");
    toggle(event);
  };

  return (
    <Container sx={{ height: "100%" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ paddingY: 2 }}
      >
        <Typography variant="h6">
          <strong>Menu</strong>
        </Typography>
        <IconButton onClick={(e) => toggle(e)} sx={{ padding: 0 }}>
          <CloseIcon />
        </IconButton>
      </Stack>

      <Divider />

      <List>
        <ListItem disablePadding sx={{ display: "block" }}>
          {items.map((item, i) => (
            <div key={i}>
              <ListItemButton
                onClick={(e) => handleButtonClick(e, item)}
                sx={{ paddingX: 0, paddingY: 1 }}
              >
                <ListItemText primary={item.name} />
                <ListItemIcon sx={{ minWidth: "0px" }}>
                  {item.icon}
                </ListItemIcon>
              </ListItemButton>
              <Divider />
            </div>
          ))}

          {/* {!userInfo ? (
            <ListItemButton
              onClick={loginHandler}
              sx={{ paddingX: 0, paddingY: 1 }}
            >
              <ListItemText primary="Log in" />
              <ListItemIcon sx={{ minWidth: "0px" }}>
                <ChevronRightIcon />
              </ListItemIcon>
            </ListItemButton>
          ) : (
            <ListItemButton
              onClick={logoutHandler}
              sx={{ paddingX: 0, paddingY: 1 }}
            >
              <ListItemText primary="Log out" />
              <ListItemIcon sx={{ minWidth: "0px" }}>
                <ChevronRightIcon />
              </ListItemIcon>
            </ListItemButton>
          )} */}
          <Divider />
        </ListItem>
      </List>

      {/* <Box>
        <Divider />
        {!userInfo ? (
          <ListItemButton onClick={loginHandler}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Log in" />
          </ListItemButton>
        ) : (
          <ListItemButton onClick={logoutHandler}>
            <ListItemIcon>
              <LogoutRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItemButton>
        )}
      </Box> */}
    </Container>
  );
}
