import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Container, IconButton, Typography, Paper, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import GiftTheme from "../components/themes/GiftTheme";
import GroupFilter from "../components/home/GroupFilter";

import { listSupplements } from "../store/actions/supplementActions";
import { listCategories } from "../store/actions/categoryActions";

export default function GiftsScreen(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [giftsNumber, setGiftsNumber] = useState();

  const { supplements } = useSelector((state) => state.supplementList) || {};
  const { categories } = useSelector((state) => state.categoryList);
  const items = categories.filter((item) => item.card === false);

  const { occasion } = props;

  useEffect(() => {
    dispatch(listSupplements())
      .then((res) => {
        if (occasion) {
          setGiftsNumber(
            res.data.supplements.filter((gift) => gift.category === occasion)
              .length
          );
        } else {
          setGiftsNumber(res.data.supplements.length);
        }
      })
      .catch((error) => console.log(error));
    dispatch(listSupplements(occasion ? occasion : ""));
  }, [dispatch, occasion]);

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  function onReturn(e) {
    e.preventDefault();
    history.push("/");
  }

  return (
    <Container className="theme-container">
      <Stack direction="column" spacing={1}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ marginBottom: "10px", marginTop: "10px" }}
        >
          <IconButton aria-label="goback" onClick={onReturn}>
            <ArrowBackIcon />
          </IconButton>
          {occasion ? (
            occasion !== "undefined" && (
              <Typography variant="h5">
                <strong>
                  {occasion} gifts ({giftsNumber})
                </strong>
              </Typography>
            )
          ) : (
            <Typography variant="h5">
              <strong>All gifts ({giftsNumber})</strong>
            </Typography>
          )}
        </Stack>

        {occasion === "Gift Card" ? null : (
          <GroupFilter items={items} type="gifts" />
        )}

        <Paper className="row">
          {occasion
            ? supplements
                .filter((gift) => gift.category === occasion)
                .map((gift, index) => <GiftTheme gift={gift} key={index} />)
            : supplements
                // .filter((gift) => gift.category !== "Gift Card")
                .map((gift, index) => <GiftTheme gift={gift} key={index} />)}
        </Paper>
      </Stack>
    </Container>
  );
}
