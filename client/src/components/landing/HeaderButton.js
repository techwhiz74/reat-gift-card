import React from "react";
import { Button } from "@mui/material";

export default function HeaderButton() {
  return (
    <>
      <Button color="inherit" href="/themes/page/1">
        <span>Greeting Cards</span>
      </Button>
      <Button color="inherit" href="/theme/Birthday/1">
        <span>Birthdays</span>
      </Button>
      <Button color="inherit" href="/gifts/page/1">
        <span>Gifts</span>
      </Button>
      <Button color="inherit" href="/gift/Gift Card/1">
        <span>Gift-Cards</span>
      </Button>
    </>
  );
}
