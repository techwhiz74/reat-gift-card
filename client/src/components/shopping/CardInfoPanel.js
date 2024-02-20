import React from "react";

import { Box, Typography, Stack } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CardGiftcardRoundedIcon from "@mui/icons-material/CardGiftcardRounded";

export default function CardInfoPanel(props) {
  const { title, size, price, giftcard, fee, shipping } = props;

  const panelIcon = () => {
    if (title === "Greeting Card") {
      return (
        <i
          className="bi bi-envelope-paper-heart"
          style={{
            fontSize: "28px",
            marginLeft: "3.5px",
            marginRight: "3.5px",
            color: "rgba(1, 1, 1, 0.6)",
          }}
        />
      );
    } else if (title === "Gift Card") {
      return (
        <CardGiftcardRoundedIcon
          fontSize="large"
          sx={{ color: "rgba(1, 1, 1, 0.6)" }}
        />
      );
    } else if (title === "Delivery") {
      return (
        <LocalShippingOutlinedIcon
          fontSize="large"
          sx={{ color: "rgba(1, 1, 1, 0.6)" }}
        />
      );
    } else {
      return (
        <i
          className="bi bi-gift"
          style={{
            fontSize: "28px",
            marginLeft: "3.5px",
            marginRight: "3.5px",
            color: "rgba(1, 1, 1, 0.6)",
          }}
        />
      );
    }
  };

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          borderWidth: 1,
          borderStyle: "solid",
          borderRadius: 2,
          borderColor: "#32a1ae",
          paddingX: 2,
          paddingY: 1,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          {panelIcon()}

          <Stack direction="column">
            <Typography variant="body1">
              <strong>{title}</strong>
            </Typography>
            <Typography
              variant="body2"
              sx={{ display: size ? "block" : "none" }}
            >
              {size} Size
            </Typography>
          </Stack>
        </Stack>
        <Stack
          direction="column"
          sx={{ textAlign: "right" }}
          alignItems="stretch"
        >
          <Typography variant="body1">
            {title === "Delivery" ? null : (
              <strong>£ {price ? parseFloat(price).toFixed(2) : "0.00"}</strong>
            )}
          </Typography>
          <Typography variant="body1">
            {title === "Greeting Card" || title === "Gift Card" ? (
              <strong>
                {price
                  ? giftcard
                    ? `£ ${fee || "0.00"} (FEE)`
                    : "FREE"
                  : "FREE"}
              </strong>
            ) : (
              title === "Delivery" && (
                <strong>{shipping ? `£ ${shipping}` : "FREE"}</strong>
              )
            )}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
