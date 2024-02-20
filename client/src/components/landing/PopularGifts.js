import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  Box,
  Button,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import colors from "../constant/Colors";

import { listSupplements } from "../../store/actions/supplementActions";

const PopularGifts = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { supplements } = useSelector((state) => state.supplementList);
  const popularGifts = supplements.filter((item) => item.popular === true);

  useEffect(() => {
    dispatch(listSupplements());
  }, [dispatch]);

  const handleClick = (id) => {
    history.push(`/giftinfo/${id}`);
  };

  const viewAllHandler = () => {
    history.push("/gifts/page/1");
  };

  return (
    <Container sx={{ marginTop: 2 }}>
      <div className="cardFilters">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ paddingBottom: 3 }}
        >
          <Typography variant="h5">
            <strong>Popular Gifts</strong>
          </Typography>
          <Typography
            variant="body1"
            onClick={viewAllHandler}
            sx={{
              "&:hover": {
                textDecoration: "underline",
                cursor: "pointer",
              },
              color: colors.blue,
            }}
          >
            <strong>View All</strong>
          </Typography>
        </Stack>

        <div className="filterCardPanel">
          {popularGifts.slice(0, 10).map((gift, index) => (
            <Card key={index} className="popular-gifts">
              <Box
                sx={{
                  aspectRatio: "100/100",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#F5F5F5",
                }}
              >
                <img
                  src={gift.imageUrl}
                  alt="card-filter"
                  style={{
                    width: "100%",
                    height: gift.category === "Gift Card" ? "auto" : "100%",
                    borderRadius: "10px",
                  }}
                />
              </Box>

              <CardContent>
                <Typography
                  variant="body2"
                  sx={{ minHeight: "40px", marginY: 1 }}
                >
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
          ))}
        </div>
      </div>
    </Container>
  );
};

export default PopularGifts;
