import React from "react";
import { Box, useMediaQuery } from "@mui/material";

import MainLanding from "../components/landing/MainLanding";
import CardFilter from "../components/landing/CardFilter";
import BirthdayCards from "../components/landing/BirthdayCards";
import TrendingCards from "../components/landing/TrendingCards";
import PopularGifts from "../components/landing/PopularGifts";
import QRPanel from "../components/landing/QRPanel";
// import Choose from "../components/landing/Choose";
import Review from "../components/landing/Review";
import Footer from "../components/Footer";

const HomeScreen = () => {
  const isMobile = useMediaQuery("(max-width: 576px");

  return (
    <Box sx={{ marginBottom: isMobile ? 0 : 3 }}>
      <MainLanding />
      <CardFilter />
      <BirthdayCards />
      <PopularGifts />
      <TrendingCards />
      <QRPanel />
      {/* <Choose /> */}
      <Review />
      <Footer isLanding={true} />
    </Box>
  );
};

export default HomeScreen;
