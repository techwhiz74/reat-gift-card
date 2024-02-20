import React from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Stack,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";

export default function GiftTheme({ gift }) {
  const history = useHistory();

  const handleClick = (id) => {
    history.push(`/giftinfo/${id}`);
  };

  return (
    <Card className="theme-Gift">
      <Box
        sx={{
          aspectRatio: "100/100",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#F1F1F1",
        }}
      >
        <img
          src={gift.imageUrl}
          alt="card-filter"
          width="100%"
          style={{
            width: "100%",
            height: gift.category === "Gift Card" ? "auto" : "100%",
            borderRadius: "10px",
          }}
        />
      </Box>
      <CardContent>
        <Typography variant="body2" sx={{ minHeight: "40px", marginY: 1 }}>
          <span style={{ fontFamily: "sans-serif" }}>
            {gift.name}, {gift.category}
          </span>
        </Typography>

        <Stack direction="row" justifyContent="center">
          <StarIcon fontSize="small" sx={{ color: "#F9C406" }} />
          <StarIcon fontSize="small" sx={{ color: "#F9C406" }} />
          <StarIcon fontSize="small" sx={{ color: "#F9C406" }} />
          <StarIcon fontSize="small" sx={{ color: "#F9C406" }} />
          <StarHalfIcon fontSize="small" sx={{ color: "#F9C406" }} />
          <Typography variant="body2">({gift.reviews})</Typography>
        </Stack>

        <Typography variant="h6" sx={{ marginY: "5%" }}>
          £ {parseFloat(gift.price).toFixed(2)}
        </Typography>

        <Button onClick={() => handleClick(gift._id)}>
          <Typography variant="body2">
            <span style={{ fontFamily: "sans-serif", color: "red" }}>
              <strong>Add To Basket</strong>
            </span>
          </Typography>
        </Button>
      </CardContent>
    </Card>
  );
}
