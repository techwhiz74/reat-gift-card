import React, { useContext } from "react";

import { Typography, Stack } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";

import { CanvasContext } from "../CanvasContainer";

export default function ImageToolbar({ isEnable, isMobile }) {
  const { actions } = useContext(CanvasContext);
  const addImageArea = () => {
    actions?.addImageArea();
  };

  return (
    <Stack direction="column" alignItems="flex-end">
      <Stack
        direction="column"
        alignItems="center"
        sx={{ width: "55px" }}
        spacing={1}
      >
        <div
          className={isEnable ? "circleBtn" : "circleBtnDisable"}
          onClick={() => isEnable && addImageArea()}
        >
          <AddPhotoAlternateOutlinedIcon
            fontSize={isMobile ? "medium" : "large"}
          />
        </div>
        <Typography
          variant="caption"
          sx={{ color: isEnable ? "#007373" : "rgba(0, 0, 0, 0.6)" }}
        >
          <strong>Image</strong>
        </Typography>
      </Stack>
    </Stack>
  );
}
