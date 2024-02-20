import React, { useState, useEffect } from "react";

import { Stack, TextField } from "@mui/material";

export default function TextCustomPanel({
  messageFcn,
  fontName,
  fontSize,
  fontColor,
  middle,
  isMobile,
}) {
  const [txtContent, setTxtContent] = useState("Write Here");
  const [selectedFont, setSelectedFont] = useState(fontName ? fontName : "");
  const [selectedSize, setSelectedSize] = useState(fontSize);
  const [selectedAlgin, setSelectedAlign] = useState("center");
  const selectedColor = `#${fontColor}`;

  const fontList = [
    "Arial",
    "Arial Black",
    "Arial Unicode MS",
    "Calibri",
    "Cambria",
    "Comic Sans MS",
    "Consolas",
    "Constantia",
    "Courier New",
    "Georgia",
    "Tahoma",
    "Times New Roman",
    "Trebuchet MS",
  ];
  if (fontName) {
    fontList.unshift(fontName);
  }

  const messageHandler = (e) => {
    const content = e.target.value;
    setTxtContent(content);
    messageFcn(content);
  };

  // Add style to ReactQuill
  useEffect(() => {
    var content = document.getElementById("text-component");
    if (content) {
      content.textContent = txtContent;
    }
    var quillElement = document.querySelector("#text-component");
    var quillTxtElement = document.querySelector(".item-container");
    if (quillElement) {
      quillElement.style.fontFamily = selectedFont;
      quillElement.style.fontSize = selectedSize;
      quillElement.style.color = `#${selectedColor}`;
    }
    if (quillTxtElement) {
      quillTxtElement.style.justifyContent = selectedAlgin;
      quillElement.style.textAlign = selectedAlgin;
    }
  }, [txtContent, selectedFont, selectedSize, selectedAlgin, selectedColor]);

  return (
    <div>
      <Stack
        direction={isMobile ? "row" : "column"}
        alignItems={"flex-end"}
        justifyContent="space-between"
        spacing={2}
      >
        <TextField
          variant="standard"
          label="Write your message here"
          placeholder={middle ? null : "Maximum 30 letters"}
          size="small"
          inputProps={{ maxLength: middle ? null : 30 }}
          fullWidth
          onChange={messageHandler}
        />
      </Stack>
    </div>
  );
}
