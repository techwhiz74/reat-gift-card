import React from "react";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CardWithIcon from "./CardWithIcon";

export default function NewCustomers(props) {
  return (
    <CardWithIcon
      to="/admin/customers"
      icon={PersonAddIcon}
      title="New customers"
      subtitle={props.value > 0 ? props.value : "0"}
    />
  );
}
