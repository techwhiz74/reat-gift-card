import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Container,
  Typography,
  Paper,
  Stack,
  Alert,
  useMediaQuery,
} from "@mui/material";

import Theme from "../../components/themes/Theme";
import GroupFilter from "../../components/home/GroupFilter";
import Paginate from "../../components/Paginate";

import { listAllProducts } from "../../store/actions/productActions";
import { listCategories } from "../../store/actions/categoryActions";

export default function CardForGiftScreen(props) {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 576px");

  const [products, setProducts] = useState([]);
  const [cardFilter, setCardFilter] = useState([]);

  const pageNumber = props.match.params.pageNumber || 1;

  const { pages, page } = useSelector((state) => state.productList);
  const { categories } = useSelector((state) => state.categoryList);
  const items = categories.filter((item) => item.card === true);

  const { occasion } = props;

  const filteredProducts =
    cardFilter.length !== 0
      ? products.filter((product) =>
          product.filters.some((filter) => cardFilter.includes(filter))
        )
      : products;

  useEffect(() => {
    dispatch(listAllProducts(occasion ? occasion : "", pageNumber)).then(
      (res) => {
        setProducts(res.data.products);
      }
    );
  }, [dispatch, occasion, pageNumber]);

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  return (
    <Container className="theme-container">
      <Stack direction="column" spacing={1}>
        <Stack
          direction="column"
          alignItems="center"
          spacing={2}
          sx={{ marginY: "10px" }}
        >
          <Alert
            severity="success"
            sx={{
              width: isMobile ? "100%" : "80%",
              border: "1px solid",
              borderColor: "#2E7D32",
              fontSize: "1rem",
            }}
          >
            Your gift has been added to your basket!
          </Alert>

          <Typography variant="h5">
            <strong>Add a card to your order</strong>
          </Typography>
        </Stack>

        <GroupFilter
          items={items}
          type="addcard"
          cardFilter={cardFilter}
          setCardFilter={setCardFilter}
        />

        <Paper className="row">
          {occasion
            ? filteredProducts
                .filter((product) => product.category === occasion)
                .map((product, index) => (
                  <Theme product={product} key={index} forGift={true} />
                ))
            : filteredProducts.map((product, index) => (
                <Theme product={product} key={index} forGift={true} />
              ))}
        </Paper>
        {cardFilter.length === 0 ? (
          <Paginate
            pages={pages}
            page={parseInt(page)}
            type="themes"
            occasion={occasion}
          />
        ) : null}
      </Stack>
    </Container>
  );
}
