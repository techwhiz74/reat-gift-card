import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  Container,
  IconButton,
  Typography,
  Paper,
  Stack,
  useMediaQuery,
  InputBase,
  Divider,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";

import Theme from "../components/themes/Theme";

import { listProducts } from "../store/actions/productActions";
import { listCategories } from "../store/actions/categoryActions";

export default function SearchScreen() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [cardsNumber, setCardsNumber] = useState();
  const [keyword, setKeyword] = useState();

  const isMobile = useMediaQuery("(max-width: 576px");

  const { products } = useSelector((state) => state.productList) || {};

  useEffect(() => {
    if (keyword !== "all") {
      dispatch(listProducts(keyword)).then((res) => {
        setCardsNumber(res.data.products.length);
      });
    } else {
      dispatch(listProducts()).then((res) => {
        setCardsNumber(res.data.products.length);
      });
    }

    // dispatch(listAllProducts(keyword));
  }, [dispatch, keyword]);

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  const backSearch = () => {
    history.goBack();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!keyword) {
      setKeyword("all");
    }
  };

  return (
    <Container className="theme-container">
      <Box sx={{ width: "100%" }}>
        <Paper
          component="form"
          onSubmit={submitHandler}
          style={{
            width: isMobile ? "90%" : "50%",
            display: "flex",
            margin: "auto",
            marginTop: isMobile ? "10px" : "0px",
            borderRadius: "25px",
            paddingLeft: "10px",
            paddingRight: "5px",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search here..."
            size="small"
            onChange={(e) => setKeyword(e.target.value)}
            inputProps={{ "aria-label": "search google maps" }}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton type="submit" sx={{ p: "5px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>

      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ marginBottom: "10px", marginTop: "10px" }}
      >
        {keyword ? (
          keyword !== "all" ? (
            <>
              <IconButton aria-label="goback" onClick={backSearch}>
                <ArrowBackIcon fontSize="small" />
              </IconButton>
              <Typography variant="h5">
                <strong>
                  Search results with "{keyword}" ({cardsNumber})
                </strong>
              </Typography>
            </>
          ) : (
            <>
              <IconButton aria-label="goback" onClick={backSearch}>
                <ArrowBackIcon fontSize="small" />
              </IconButton>
              <Typography variant="h5">
                <strong>All cards ({cardsNumber})</strong>
              </Typography>
            </>
          )
        ) : null}
      </Stack>

      <Paper className="row">
        {keyword
          ? products.map((product, index) => (
              <Theme product={product} key={index} />
            ))
          : null}
      </Paper>
    </Container>
  );
}
