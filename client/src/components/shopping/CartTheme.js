import React, { useState } from "react";

import { Stack, Typography, Paper, IconButton, TextField } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import ConfirmModal from "../ConfirmModal";
import { removeFromCart } from "../../store/actions/cartActions";

export default function CartTheme(props) {
  const { item, extra } = props;

  const [open, setOpen] = useState(false);
  const handleOpen = (id) => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const quantities = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
    { value: 7 },
    { value: 8 },
    { value: 9 },
    { value: 10 },
  ];

  return (
    <Paper sx={{ paddingX: "5%", paddingY: 2, marginBottom: 3, width: "100%" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        key={item.product}
      >
        <Stack direction="row" spacing={3}>
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
            width="140px"
            style={{
              aspectRatio: extra
                ? item.category === "Gift Card"
                  ? "152/100"
                  : "100/100"
                : "100/140",
            }}
          />
          <Stack direction="column">
            {/* <Typography variant="body1">{item.name}</Typography> */}
            <Typography variant="body1">
              <strong>Price</strong>
            </Typography>
            <Typography>£ {parseFloat(item.price).toFixed(2)}</Typography>
            <Typography variant="body1">
              <strong>Quantity</strong>
            </Typography>
            {extra ? (
              <TextField
                select
                variant="outlined"
                value={item.qty}
                type="number"
                name="quantity"
                size="small"
                SelectProps={{
                  native: true,
                }}
                onChange={(e) => props.qtyHandler(e, item)}
              >
                {quantities.map((qty, index) => (
                  <option key={index} value={qty.value}>
                    {qty.value}
                  </option>
                ))}
              </TextField>
            ) : (
              <Typography>{item.qty}</Typography>
            )}
          </Stack>
        </Stack>

        <IconButton
          type="button"
          variant="light"
          color="disabled"
          // onClick={() => props.removeFcn(item.product)}
          onClick={handleOpen}
        >
          <CloseOutlinedIcon />
        </IconButton>
      </Stack>

      <ConfirmModal
        id={item.product}
        open={open}
        closeFcn={handleClose}
        actionFcn={removeFromCart}
        type="Delete"
      />
    </Paper>
  );
}
