import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  Container,
  Toolbar,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { logout } from "../../store/actions/userActions";

import DrawerListItem from "./DrawerListItem";

export default function DrawerContent(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 576px");

  const [selectedItem, setSelectedItem] = useState(0);
  const handleListItemClick = (item) => {
    setSelectedItem(item);
    props.toggle();
  };
  const names = [
    "Dashboard",
    "Customers",
    "Products",
    "Categories",
    "Orders",
    "Profile",
  ];

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <Container>
      <Toolbar
        disableGutters
        sx={{ justifyContent: "center", paddingY: "15px" }}
      >
        <Link href="/" underline="none">
          <img
            alt="Logo"
            src="/assets/logo.jpg"
            className="m-auto block logo"
            height={isMobile ? "45px" : "50px"}
          />
        </Link>
        <IconButton onClick={props.toggle} sx={{ display: { sm: "none" } }}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      {/* <Box className="admin-profile">
        <h5> {props.user.name}</h5>
        <span> {props.user.email}</span>
      </Box>
      <Divider /> */}
      <List>
        {names.map((name, i) => (
          <DrawerListItem
            key={i}
            num={i}
            name={name}
            selectedItem={selectedItem}
            handleListItemClick={handleListItemClick}
          />
        ))}
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton onClick={logoutHandler}>
            <ListItemIcon>
              <LogoutOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Container>
  );
}
