import React, { useState, useEffect, useRef } from "react";
import { ColorPicker } from "primereact/colorpicker";

import {
  Stack,
  TextField,
  MenuItem,
  Paper,
  Divider,
  Typography,
  Button,
  Menu,
  IconButton,
} from "@mui/material";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";

export default function TextCustomPanel({
  messageFcn,
  fontName,
  fontSize,
  isMobile,
}) {
  const [txtContent, setTxtContent] = useState("Write Here");
  const [selectedFont, setSelectedFont] = useState(fontName ? fontName : "");
  const [selectedSize, setSelectedSize] = useState(fontSize);
  const [selectedAlgin, setSelectedAlign] = useState("center");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const colorPickerRef = useRef(null);

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

  const sizeList = [
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

  // Menu controllers
  const [anchorElFont, setAnchorElFont] = useState(null);
  const [anchorElSize, setAnchorElSize] = useState(null);
  const [anchorElAlign, setAnchorElAlign] = useState(null);

  const openFont = Boolean(anchorElFont);
  const openSize = Boolean(anchorElSize);
  const openAlign = Boolean(anchorElAlign);

  const handleClickFont = (event) => {
    setAnchorElFont(event.currentTarget);
  };
  const handleClickSize = (event) => {
    setAnchorElSize(event.currentTarget);
  };
  const handleClickAlign = (event) => {
    setAnchorElAlign(event.currentTarget);
  };

  const handleCloseFont = () => {
    setAnchorElFont(null);
  };
  const handleCloseSize = () => {
    setAnchorElSize(null);
  };
  const handleCloseAlign = () => {
    setAnchorElAlign(null);
  };

  const messageHandler = (e) => {
    const content = e.target.value;
    setTxtContent(content);
    messageFcn(content);
  };
  const handleFontChange = (value) => {
    setSelectedFont(value);
    handleCloseFont();
  };
  const handleSizeChange = (value) => {
    setSelectedSize(value);
    handleCloseSize();
  };
  const alignHandler = (alignment) => {
    setSelectedAlign(alignment);
    handleCloseAlign();
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

  const getAlignmentIcon = () => {
    switch (selectedAlgin) {
      case "center":
        return <FormatAlignCenterIcon />;
      case "left":
        return <FormatAlignLeftIcon />;
      case "right":
        return <FormatAlignRightIcon />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Stack
        direction={isMobile ? "row" : "column"}
        alignItems={"flex-end"}
        justifyContent="space-between"
        spacing={2}
      >
        {/* <TextField
          id=""
          label="Write your message"
          placeholder={middle ? null : "Maximum 30 letters"}
          size="small"
          inputProps={{ maxLength: middle ? null : 30 }}
          fullWidth
          onChange={messageHandler}
        /> */}

        <Stack direction="column" alignItems="center" sx={{ width: "55px" }}>
          <div
            className="circleBtn"
            aria-controls={openFont ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openFont ? "true" : undefined}
            onClick={handleClickFont}
          >
            <Typography variant="body1" className="size-button">
              <strong>Aa</strong>
            </Typography>
          </div>
          <Menu
            anchorEl={anchorElFont}
            open={openFont}
            onClose={handleCloseFont}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{ style: { maxHeight: "200px", overflowY: "auto" } }}
          >
            {fontList.map((option, index) => (
              <MenuItem
                key={index}
                dense={true}
                value={option}
                onClick={() => handleFontChange(option)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
          <Typography variant="body2">Font</Typography>
        </Stack>

        <Stack direction="column" alignItems="center" sx={{ width: "55px" }}>
          <div
            className="circleBtn"
            aria-controls={openSize ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openSize ? "true" : undefined}
            onClick={handleClickSize}
          >
            <Typography variant="body1" className="size-button">
              <strong>{parseInt(selectedSize)}</strong>
            </Typography>
          </div>
          <Menu
            anchorEl={anchorElSize}
            open={openSize}
            onClose={handleCloseSize}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{ style: { maxHeight: "200px", overflowY: "auto" } }}
          >
            {sizeList.map((option, index) => (
              <MenuItem
                key={index}
                dense={true}
                value={option}
                onClick={() => handleSizeChange(option)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
          <Typography variant="body2">Size</Typography>
        </Stack>

        <Stack direction="column" alignItems="center" sx={{ width: "55px" }}>
          <div
            className="circleBtn"
            style={{ padding: "5px" }}
            ref={colorPickerRef}
          >
            <ColorPicker
              value={selectedColor}
              onChange={(e) => {
                setSelectedColor(e.value);
              }}
              appendTo={colorPickerRef.current}
              position="bottom-right"
            />
          </div>
          <Typography variant="body2">Colour</Typography>
        </Stack>
        <Stack direction="column" alignItems="center" sx={{ width: "55px" }}>
          <div
            className="circleBtn"
            aria-controls={openAlign ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openAlign ? "true" : undefined}
            onClick={handleClickAlign}
          >
            {getAlignmentIcon()}
          </div>
          <Menu
            anchorEl={anchorElAlign}
            open={openAlign}
            onClose={handleCloseAlign}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={() => alignHandler("left")}>
              <FormatAlignLeftIcon />
            </MenuItem>
            <MenuItem onClick={() => alignHandler("center")}>
              <FormatAlignCenterIcon />
            </MenuItem>
            <MenuItem onClick={() => alignHandler("right")}>
              <FormatAlignRightIcon />
            </MenuItem>
          </Menu>
          <Typography variant="body2">Align</Typography>
        </Stack>
      </Stack>
    </div>
  );
}
