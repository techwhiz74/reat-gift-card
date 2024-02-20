import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Container, IconButton, Typography, Paper, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Theme from "../components/themes/Theme";
import GroupFilter from "../components/home/GroupFilter";
import Paginate from "../components/Paginate";

import { listProducts, listAllProducts } from "../store/actions/productActions";
import { listCategories } from "../store/actions/categoryActions";

export default function ThemeScreen(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [cardsNumber, setCardsNumber] = useState();
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [cardFilter, setCardFilter] = useState([]);

  const keyword = props.match.params.keyword;
  const pageNumber = props.match.params.pageNumber || 1;

  const { pages, page } = useSelector((state) => state.productList);
  const { categories } = useSelector((state) => state.categoryList);
  const items = categories.filter((item) => item.card === true);

  const { occasion } = props;

  useEffect(() => {
    dispatch(listProducts(keyword))
      .then((res) => {
        if (occasion) {
          setCardsNumber(
            res.data.products.filter((product) => product.category === occasion)
              .length
          );
          setAllProducts(
            res.data.products.filter((product) => product.category === occasion)
          );
        } else {
          setCardsNumber(res.data.products.length);
          setAllProducts(res.data.products);
        }
      })
      .catch((error) => console.log(error));
    dispatch(listAllProducts(occasion ? occasion : keyword, pageNumber)).then(
      (res) => {
        setProducts(res.data.products);
      }
    );
  }, [dispatch, occasion, pageNumber, keyword]);

  const productsForOccasion = occasion
    ? products.filter((product) => product.category === occasion)
    : products;

  const filteredProducts =
    cardFilter.length !== 0
      ? allProducts.filter((product) =>
          product.filters.some((filter) => cardFilter.includes(filter))
        )
      : productsForOccasion;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  const backSearch = () => {
    history.goBack();
  };

  function onReturn(e) {
    e.preventDefault();
    history.push("/");
  }

  const toSearch = () => {
    history.push("/search");
  };

  return (
    <Container className="theme-container">
      <Stack direction="column" spacing={1}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ marginBottom: "10px", marginTop: "10px" }}
        >
          {keyword ? (
            <>
              <IconButton aria-label="goback" onClick={backSearch}>
                <ArrowBackIcon fontSize="small" />
              </IconButton>
              <Typography variant="h5">
                Search results with "{keyword}" ({cardsNumber})
              </Typography>
            </>
          ) : (
            <>
              <IconButton aria-label="goback" onClick={onReturn}>
                <ArrowBackIcon />
              </IconButton>
              {occasion ? (
                occasion !== "undefined" && (
                  <Typography variant="h5">
                    <strong>
                      {occasion} cards ({cardsNumber})
                    </strong>
                  </Typography>
                )
              ) : (
                <Typography variant="h5">
                  <strong>All cards ({cardsNumber})</strong>
                </Typography>
              )}
            </>
          )}
        </Stack>

        {keyword ? null : (
          <GroupFilter
            items={items}
            type="themes"
            cardFilter={cardFilter}
            setCardFilter={setCardFilter}
          />
        )}

        <Paper className="row">
          {filteredProducts.map((product, index) => (
            <Theme product={product} key={index} />
          ))}
        </Paper>
        <Paginate
          pages={pages}
          page={parseInt(page)}
          type="themes"
          occasion={occasion}
        />

        {/* <Fab
          color="primary"
          aria-label="add"
          sx={{ position: "fixed", zIndex: 10, bottom: 30, right: 20 }}
          onClick={toSearch}
        >
          <SearchIcon />
        </Fab> */}
      </Stack>
    </Container>
  );
}
