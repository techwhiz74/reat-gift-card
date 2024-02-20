import React from "react";
import { Box, Drawer } from "@mui/material";

import DrawerContent from "./DrawerContent";

export default function AdminDrawer(props) {
  return (
    <Box
      component="nav"
      sx={{ width: { sm: props.drawWidth }, flexShrink: { sm: 0 } }}
    >
      {/* Mobile screen */}
      <Drawer
        variant="temporary"
        open={props.mobileView}
        onClose={props.toggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: props.drawWidth,
          },
        }}
      >
        <DrawerContent toggle={props.toggle} user={props.user} />
      </Drawer>
      {/* Desktop Screen */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: props.drawWidth,
          },
        }}
        open
      >
        <DrawerContent toggle={props.toggle} user={props.user} />
      </Drawer>
    </Box>
  );
}
