import React from "react";

import { Box, Stack, Typography, IconButton } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

export default function CheckoutTheme({ item, extra }) {
  const downloadImage = async (imageUrl, fileName) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob({ type: "image/png" });
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(`Failed to download ${fileName}`, error);
    }
  };

  const handleDownload = () => {
    downloadImage(
      item.frontUrl ? item.frontUrl : item.imageUrl,
      `cardFront_${item._id}.png`
    );
    if (item.category !== "Gift Card") {
      downloadImage(
        item.middleUrl ? item.middleUrl : item.preSMSUrl,
        `cardBack_${item._id}.png`
      );
    }
  };

  const downloadButton = (
    <IconButton onClick={handleDownload}>
      <FileDownloadOutlinedIcon color="primary" />
    </IconButton>
  );

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-around"
        spacing={4}
      >
        <img
          src={
            item.frontUrl
              ? item.frontUrl
              : item.blankUrl
              ? item.blankUrl
              : item.imageUrl
          }
          alt={item.name}
          className="img-thumbnail"
          style={{
            maxWidth: "150px",
            minWidth: "120px",
            aspectRatio: extra
              ? item.category === "Gift Card"
                ? "152/100"
                : "100/100"
              : "100/140",
          }}
        />

        <Stack direction="column" spacing={1}>
          <Typography variant="body1">{item.name}</Typography>
          <Typography variant="body2">Price: £ {item.price}</Typography>
          <Typography variant="body2">Qty: {item.qty}</Typography>
        </Stack>
        {!extra || item.category === "Gift Card" ? (
          downloadButton
        ) : (
          <Typography></Typography>
        )}
      </Stack>
    </Box>
  );
}
