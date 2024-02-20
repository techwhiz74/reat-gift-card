import React, { useContext, useState } from "react";

import { Stack, Typography, Divider } from "@mui/material";
import TextFieldsIcon from "@mui/icons-material/TextFields";

import { CanvasContext } from "../GiftCardCanvas";

export const sizeList = ["18px", "24px"];

export const fontList = ["Arial", "Comic Sans MS"];

export default function GiftSubTextToolbar({
  isEditEnable,
  isEnable,
  isMobile,
}) {
  const [isElementAdded, setIsElementAdded] = useState(false);

  const { actions } = useContext(CanvasContext);
  const addSubElement = (type) => {
    if (!isElementAdded) {
      actions?.addSubElement(type);
      setIsElementAdded(true);
    }
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
          onClick={() => isEnable && addSubElement("TEXT")}
        >
          <TextFieldsIcon fontSize={isMobile ? "medium" : "large"} />
        </div>
        <Typography
          variant="caption"
          sx={{ color: isEnable ? "#007373" : "rgba(0, 0, 0, 0.6)" }}
        >
          <strong>Subtext</strong>
        </Typography>
      </Stack>

      {isEditEnable ? (
        <div id="toolbar" style={{ display: "none" }}>
          <Stack direction="column" spacing={1}>
            <select className="ql-font" style={{ width: "100%" }}>
              {fontList.map((font, index) => (
                <option key={index} value={font}>
                  {font}
                </option>
              ))}
            </select>
            <Divider />
            <Stack direction="row">
              <select className="ql-size">
                {sizeList.map((size, index) => (
                  <option key={index} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <Divider orientation="vertical" flexItem />
              <button className="ql-bold" />
              <Divider orientation="vertical" flexItem />
              <button className="ql-italic" />
              <Divider orientation="vertical" flexItem />
              <button className="ql-underline" />
              <Divider orientation="vertical" flexItem />
              <select className="ql-align" />
              <Divider orientation="vertical" flexItem />
              <select className="ql-color" />
              {/* <Divider orientation="vertical" flexItem />
              <select className="ql-background" /> */}
            </Stack>
          </Stack>
        </div>
      ) : null}
    </Stack>
  );
}
