import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import {
  Stack,
  IconButton,
  Typography,
  Container,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { listProductDetail } from "../../store/actions/productActions";

export default function ModifyScreen() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const isMobile = useMediaQuery("(max-width: 576px");

  const [cardData, setCardData] = useState({});

  const getProductDetail = useCallback(
    (id) => {
      dispatch(listProductDetail(id)).then((res) => {
        if (res.data) {
          setCardData({
            category: res.data.category,
          });
        }
      });
    },
    [dispatch]
  );

  useEffect(() => {
    getProductDetail(id);
  }, [dispatch, id, getProductDetail]);

  function onReturn(e) {
    e.preventDefault();
    // history.push(`/theme/${cardData.category}/1`);
    history.goBack();
  }

  return (
    <Container sx={{ marginTop: "20px" }}>
      <Stack
        direction={isMobile ? "column" : "row"}
        justifyContent="left"
        alignItems="center"
        spacing={2}
      >
        {isMobile ? null : (
          <IconButton aria-label="goback" onClick={onReturn}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="h5">
          <strong>Personalize your card</strong>
        </Typography>
      </Stack>
    </Container>
  );
}
