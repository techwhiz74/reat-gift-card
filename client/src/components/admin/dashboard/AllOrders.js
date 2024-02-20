import React from "react";

import CardWithIcon from "./CardWithIcon";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";

export default function AllOrders(props) {
  return (
    <CardWithIcon
      to="/admin/orders"
      icon={ShoppingCartCheckoutOutlinedIcon}
      title="All orders"
      subtitle={props.value}
    />
  );
}
