import React from "react";

import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import CardWithIcon from "./CardWithIcon";

export default function AllFreeCards(props) {
  const { value } = props;
  return (
    <CardWithIcon
      to="/admin/customers"
      icon={CardGiftcardIcon}
      title="All free cards"
      subtitle={value}
    />
  );
}
