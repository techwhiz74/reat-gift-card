import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Button,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";

export default function GiftPanelTheme({ item, productId, prevData }) {
  const history = useHistory();

  const chooseHandler = (itemId) => {
    history.push(`/giftinfo/${itemId}/${productId}/${prevData}`);
  };

  return (
    <Box sx={{ margin: "3px" }}>
      <Card
        sx={{
          width: "100%",
          padding: "3%",
          textAlign: "center",
          borderStyle: "solid",
          borderWidth: "1px",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            aspectRatio: "100/100",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#F1F1F1",
          }}
          onClick={() => chooseHandler(item._id)}
        >
          <img
            src={item.imageUrl}
            alt="card-filter"
            width="100%"
            style={{
              width: "100%",
              height: item.category === "Gift Card" ? "auto" : "100%",
              borderRadius: "10px",
            }}
          />
        </Box>
        <CardContent>
          <Typography variant="body2" sx={{ minHeight: "40px", marginY: 1 }}>
            <span style={{ fontFamily: "sans-serif" }}>
              {item.name}, {item.category}
            </span>
          </Typography>

          <Stack direction="row" justifyContent="center">
            <StarIcon fontSize="small" sx={{ color: "#F9C406" }} />
            <StarIcon fontSize="small" sx={{ color: "#F9C406" }} />
            <StarIcon fontSize="small" sx={{ color: "#F9C406" }} />
            <StarIcon fontSize="small" sx={{ color: "#F9C406" }} />
            <StarHalfIcon fontSize="small" sx={{ color: "#F9C406" }} />
            <Typography variant="body2">({item.reviews})</Typography>
          </Stack>

          <Typography variant="h6" sx={{ marginY: "5%" }}>
            £ {parseFloat(item.price).toFixed(2)}
          </Typography>

          <Button onClick={() => chooseHandler(item._id)}>
            <Typography variant="body2">
              <span style={{ fontFamily: "sans-serif", color: "red" }}>
                <strong>Add To Basket</strong>
              </span>
            </Typography>
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
