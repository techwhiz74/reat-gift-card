import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Container, Typography, Card, Stack } from "@mui/material";

import { listProducts } from "../../store/actions/productActions";

const TrendingCards = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.productList);
  const trendingCards = products.filter((item) => item.trending === true);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const handleClick = (id) => {
    history.push(`/cardinfo/${id}`);
  };

  return (
    <Container sx={{ marginTop: 2 }}>
      <div className="cardFilters">
        <Stack sx={{ paddingBottom: 3 }}>
          <Typography variant="h5">
            <strong>Trending Cards</strong>
          </Typography>
        </Stack>

        <div className="filterCardPanel">
          {trendingCards.slice(0, 5).map((product, index) => (
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

export default TrendingCards;
