import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, Stack, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { listCategories } from "../../store/actions/categoryActions";

import GiftPanelTheme from "./GiftPanelTheme";

export default function GiftPanel({ items, productId, prevData }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  return (
    <Box className="cardspanel">
      <Stack direction="column" alignItems="center" spacing={2}>
        <Typography variant="h5">
          <strong>Recommended Gifts</strong>
        </Typography>

        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          partialVisible
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 2000,
                min: 992,
              },
              items: 6,
              partialVisibilityGutter: 10,
            },
            mobile: {
              breakpoint: {
                max: 576,
                min: 0,
              },
              items: 2,
              partialVisibilityGutter: 0,
            },
            tablet: {
              breakpoint: {
                max: 992,
                min: 576,
              },
              items: 3,
              partialVisibilityGutter: 20,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {items.map((item, index) => (
            <GiftPanelTheme
              key={index}
              item={item}
              productId={productId}
              prevData={prevData}
            />
          ))}
        </Carousel>
      </Stack>
    </Box>
  );
}
