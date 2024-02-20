import React, { useContext, useState } from "react";

import { Stack, Typography, Divider } from "@mui/material";
import TextFieldsIcon from "@mui/icons-material/TextFields";

import { CanvasContext } from "../CanvasMiddleContainer";

export const sizeList = [
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "22px",
  "24px",
  "26px",
  "28px",
  "36px",
  "48px",
  "72px",
];

export const fontList = [
  "Arial",
  "Arial Black",
  "Arial Unicode MS",
  "Calibri",
  "Cambria",
  "Cambria Math",
  "Candara",
  `Segoe UI`,
  "Comic Sans MS",
  "Consolas",
  "Constantia",
  "Corbel",
  "Courier New",
  "Georgia",
  "Lucida Sans Unicode",
  "Tahoma",
  "Times New Roman",
  "Trebuchet MS",
  "Verdana",
];

export default function MiddleToolbar(props) {
  const [isElementAdded, setIsElementAdded] = useState(false);

  const { actions } = useContext(CanvasContext);
  const addElement = (type) => {
    if (!isElementAdded) {
      actions?.addElement(type);
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
        <div className="circleBtn" onClick={() => addElement("TEXT")}>
          <TextFieldsIcon fontSize={props.isMobile ? "medium" : "large"} />
        </div>
        <Typography variant="caption" sx={{ color: "#007373" }}>
          <strong>Add Text</strong>
        </Typography>
      </Stack>

      {props.isEditEnable ? (
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
            </Stack>
          </Stack>
        </div>
      ) : null}
    </Stack>
  );
}
