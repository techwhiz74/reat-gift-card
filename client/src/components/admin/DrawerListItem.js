import React from "react";
import { useHistory } from "react-router-dom";

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import colors from "../constant/Colors";

export default function DrawerListItem(props) {
  const isSelected = props.selectedItem === props.num;
  const history = useHistory();

  const handleButtonClick = (event) => {
    event.preventDefault();
    props.handleListItemClick(props.num);
    history.push(`/admin/${targetUrl}`);
  };

  const icons = [
    <HomeIcon color={isSelected ? "primary" : "inherit"} />,
    <GroupIcon color={isSelected ? "primary" : "inherit"} />,
    <CardGiftcardIcon color={isSelected ? "primary" : "inherit"} />,
    <FormatListBulletedIcon color={isSelected ? "primary" : "inherit"} />,
    <ShoppingCartCheckoutIcon color={isSelected ? "primary" : "inherit"} />,
    <ManageAccountsIcon color={isSelected ? "primary" : "inherit"} />,
  ];

  const targetUrl = props.name.toLowerCase();

  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <ListItemButton selected={isSelected} onClick={handleButtonClick}>
        <ListItemIcon>{icons[props.num]}</ListItemIcon>
        <ListItemText
          primary={props.name}
          sx={{
            color: isSelected ? colors.blue : "black",
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}
