import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Container, Typography, Card, Stack } from "@mui/material";
import colors from "../constant/Colors";

import { listProducts } from "../../store/actions/productActions";

const BirthdayCards = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.productList);
  const birthdayCards = products.filter((item) => item.category === "Birthday");

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const handleClick = (id) => {
    history.push(`/cardinfo/${id}`);
  };

  const viewAllHandler = () => {
    history.push("/theme/Birthday/1");
  };

  return (
    <Container>
      <div className="cardFilters">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ paddingBottom: 3 }}
        >
          <Typography variant="h5">
            <strong>Birthday Cards</strong>
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
          {birthdayCards.slice(0, 10).map((product, index) => (
            <Card
              key={index}
              className="trending-cards"
              onClick={() => handleClick(product._id)}
            >
              <img
                src={product.imageUrl}
                alt=""
                width="100%"
                style={{ aspectRatio: "100/140" }}
              />
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default BirthdayCards;
