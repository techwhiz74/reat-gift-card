import React from "react";
import { Button, Box, Stack } from "@mui/material";

const GiftFilter = (props) => {
  const { items, giftCategory, setGiftCategory } = props;

  const handleClick = (category) => {
    setGiftCategory(category);
  };

  return (
    <Box className="filterCardPanel">
      <Stack direction="row" spacing={2}>
        <Button
          variant={giftCategory ? "outlined" : "contained"}
          color="primary"
          sx={{ borderRadius: "25px", minWidth: "70px" }}
          onClick={() => handleClick()}
        >
          <span>All</span>
        </Button>
        {items.map((category, index) => (
          <Button
            key={index}
            variant={giftCategory === category.name ? "contained" : "outlined"}
            color="primary"
            sx={{ borderRadius: "25px", lineHeight: 1, fontSize: "0.9rem" }}
            onClick={() => handleClick(category.name)}
          >
            <span>{category.name}</span>
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default GiftFilter;
