import React from "react";

import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound";
import CardWithIcon from "./CardWithIcon";

export default function MonthlyRevenue(props) {
  return (
    <CardWithIcon
      to="/admin/products"
      icon={CurrencyPoundIcon}
      title="Monthly revenue"
      subtitle={"£" + props.value}
    />
  );
}
