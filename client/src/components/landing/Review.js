import React from "react";

import {
  Box,
  Container,
  Typography,
  Stack,
  useMediaQuery,
} from "@mui/material";

const Review = ({ info }) => {
  const isMobile = useMediaQuery("(max-width: 576px");
  const reviewContent = (content, name, country, num) => {
    return (
      <Stack
        id="text-component"
        direction="column"
        justifyContent="space-between"
        spacing={3}
        sx={{
          background: "#E1F3F5",
          borderRadius: "10px",
          padding: 3,
          minHeight: "330px",
          minWidth: "347px",
          marginX: 1,
        }}
      >
        <Typography>{content}</Typography>

        <Stack direction="row" alignItems="center" spacing={1}>
          <img
            src={`/assets/landing/review/review-${num}.jpg`}
            alt="pack4"
            style={{
              width: "84px",
              borderRadius: "45px",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "white",
            }}
          />

          <Stack direction="column" spacing={1}>
            <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
              {name}, {country}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    );
  };

  const content_1 =
    "Sending little notes to my loved ones has never been easier with Free-Cards! I adore the variety of Easter and Christmas cards, perfect for brightening my granddaughter's day.";
  const content_2 =
    "Free-Cards helps me keep my Mum connected with my life's special moments. Even without being tech-savvy, she can enjoy receiving personalised postcards that she absolutely loves.";
  const content_3 =
    "With Free-Cards, I can effortlessly upload photos and send heartfelt cards. It's my go-to solution whenever I need to come up with something special and add a personal touch.";

  return (
    <Container sx={{ marginTop: 3 }}>
      <div className="cardFilters">
        <Stack
          direction="column"
          spacing={3}
          sx={{ paddingY: isMobile ? 3 : null }}
        >
          <Typography
            variant="h5"
            style={{ textAlign: isMobile ? "center" : "left" }}
          >
            <strong>What people say about us</strong>
          </Typography>

          <div className="filterCardPanel">
            <Box>{reviewContent(content_1, "CHARLOTTE ", "UK", 1)}</Box>
            <Box>{reviewContent(content_2, "ISABELLA", "UK", 2)}</Box>
            <Box>{reviewContent(content_3, "JAMES", "UK", 3)}</Box>
          </div>
        </Stack>
      </div>
    </Container>
  );
};

export default Review;
