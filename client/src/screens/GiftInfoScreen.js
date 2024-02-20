import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ShowMoreText from "react-show-more-text";
import {
  Container,
  Grid,
  Stack,
  Box,
  Typography,
  Button,
  useMediaQuery,
  RadioGroup,
  FormControlLabel,
  Radio,
  Snackbar,
  Alert,
} from "@mui/material";

import CardInfoPanel from "../components/shopping/CardInfoPanel";

import {
  listSupplementDetail,
  updateSupplement,
} from "../store/actions/supplementActions";
import { giftToCart } from "../store/actions/cartActions";

export default function GiftInfoScreen() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { giftId, productId, prevData } = useParams();
  const isMobile = useMediaQuery("(max-width: 576px");
  const [open, setOpen] = useState();

  const [amount, setAmount] = useState();
  const [fee, setFee] = useState(0);
  const [giftData, setGiftData] = useState({
    name: "",
    category: "",
    occasion: [],
    price: "",
    imageUrl: "",
    description: "",
    shipping: "",
  });

  const getGiftDetail = useCallback(
    (giftId) => {
      dispatch(listSupplementDetail(giftId)).then((res) => {
        if (res.data) {
          setGiftData({
            _id: res.data._id,
            name: res.data.name,
            category: res.data.category,
            occasion: res.data.occasion,
            price: res.data.price,
            shipping: res.data.shipping,
            imageUrl: res.data.imageUrl,
            description: res.data.description,
          });
        }
      });
    },
    [dispatch]
  );

  useEffect(() => {
    getGiftDetail(giftId);
  }, [dispatch, giftId, getGiftDetail]);

  const selectHandler = (e) => {
    setAmount(e.target.value);
    // Gift-Cards fee
    if (e.target.value === "10") {
      setFee(2.99);
    } else if (e.target.value === "30") {
      setFee(3.99);
    } else {
      setFee(4.99);
    }
  };

  const textContent = (
    <Typography variant="body1">
      {/* {giftData.description} about this gift: <br /> The perfect gift for any
      occasion, this beautifully crafted item is sure to delight your loved
      ones. Express your love and appreciation with this heartfelt gift,
      guaranteed to create lasting memories on any important day. */}
      {giftData.description}
    </Typography>
  );

  const nextHandler = () => {
    if (productId) {
      if (prevData === "undefined") {
        history.push(`/addgift/${productId}/${giftId}`);
      } else {
        history.push(`/addgift/${productId}/${prevData},${giftId}`);
      }
    } else {
      // history.push(`/addcard/${giftData.occasion}/1`);
      history.push(`/addcards/page/1`);
    }
  };

  const addToCart = () => {
    if (giftData.category === "Gift Card") {
      if (amount) {
        formatDesign(giftId);
        dispatch(giftToCart(giftId, 1, amount, fee));
        nextHandler();
      } else {
        setOpen(true);
      }
    } else {
      dispatch(giftToCart(giftId, 1));
      nextHandler();
    }
  };

  const formatDesign = (giftId) => {
    dispatch(
      updateSupplement({ _id: giftId, frontUrl: null, middleUrl: null })
    );
  };

  const toDesign = () => {
    if (amount) {
      formatDesign(giftId);
      if (prevData !== "undefined") {
        history.push(
          `/giftdesign/${giftId}/${productId}/${amount}/${fee}/${prevData}`
        );
      } else {
        history.push(`/giftdesign/${giftId}/${productId}/${amount}/${fee}`);
      }
    } else {
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Container sx={{ padding: isMobile ? 0 : 5 }}>
      <Grid container spacing={isMobile ? 3 : 6}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: "#e1f3f5",
              padding: giftData.category === "Gift Card" ? "10%" : "15%",
            }}
          >
            <Box
              sx={{
                aspectRatio: "100/100",
                display: "flex",
                alignItems: "center",
                backgroundColor: "#e1f3f5",
              }}
            >
              <img
                src={giftData.imageUrl}
                alt=""
                className="img-thumbnail"
                style={{
                  width: "100%",
                  height: giftData.category === "Gift Card" ? "auto" : "100%",
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack
            direction="column"
            spacing={3}
            sx={{ paddingX: isMobile ? 3 : 0, paddingBottom: isMobile ? 3 : 0 }}
          >
            <Typography variant="h5">
              <strong>{giftData.name}</strong>
            </Typography>
            {isMobile ? (
              <Box>
                <ShowMoreText
                  lines={2}
                  more="More"
                  less="Less"
                  className="showmore"
                >
                  {textContent}
                </ShowMoreText>
              </Box>
            ) : (
              textContent
            )}

            {giftData.category === "Gift Card" ? (
              <Stack
                direction={isMobile ? "column" : "row"}
                alignItems={isMobile ? "stretch" : "center"}
                justifyContent="space-between"
              >
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  onChange={(e) => selectHandler(e)}
                >
                  <FormControlLabel
                    value="10"
                    control={<Radio />}
                    label="£ 10"
                  />
                  <FormControlLabel
                    value="30"
                    control={<Radio />}
                    label="£ 30"
                  />
                  <FormControlLabel
                    value="50"
                    control={<Radio />}
                    label="£ 50"
                  />
                  <FormControlLabel
                    value="100"
                    control={<Radio />}
                    label="£ 100"
                  />
                </RadioGroup>

                <Typography sx={{ marginBottom: 1, textAlign: "right" }}>
                  <strong>Giftcard Value</strong>
                </Typography>
              </Stack>
            ) : null}

            <CardInfoPanel
              title={
                giftData.category === "Gift Card"
                  ? "Gift Card"
                  : `${giftData.occasion[0]} Gift`
              }
              price={amount ? amount : giftData.price}
              giftcard={giftData.category === "Gift Card"}
              fee={fee}
            />
            <CardInfoPanel title="Delivery" shipping={giftData.shipping} />

            <Button
              variant="outlined"
              color="primary"
              sx={{ borderRadius: "25px" }}
              fullWidth
              onClick={addToCart}
            >
              <span>Add To Basket</span>
            </Button>
            {giftData.category === "Gift Card" ? (
              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: "25px" }}
                fullWidth
                onClick={toDesign}
              >
                <span>Personalise</span>
              </Button>
            ) : null}
          </Stack>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "350px" }}>
          Please Select the Giftcard Value.
        </Alert>
      </Snackbar>
    </Container>
  );
}
