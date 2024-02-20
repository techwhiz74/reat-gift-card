import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  Container,
  Stack,
  Button,
  IconButton,
  Typography,
  CardMedia,
  useMediaQuery,
  Divider,
  Box,
  Link,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { listProductDetail } from "../../store/actions/productActions";
import {
  listSupplements,
  listSupplementDetail,
} from "../../store/actions/supplementActions";

import GiftsPanel from "../../components/shopping/GiftsPanel";

export default function GiftForCardScreen() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id, giftIds } = useParams();
  const isMobile = useMediaQuery("(max-width: 576px");

  const { supplements } = useSelector((state) => state.supplementList);

  const [cardData, setCardData] = useState({
    name: "",
    category: "",
    price: "",
    imageUrl: "/assets/cards/blankpage.png",
    description: "",
  });

  const getCardDetail = useCallback(
    (id) => {
      dispatch(listProductDetail(id)).then((res) => {
        if (res.data) {
          setCardData({
            name: res.data.name,
            category: res.data.category,
            price: res.data.price,
            imageUrl: res.data.imageUrl,
            blankUrl: res.data.blankUrl,
            frontUrl: res.data.frontUrl,
            description: res.data.description,
          });
        }
      });
    },
    [dispatch]
  );

  const [giftId, setGiftId] = useState([]);
  const [giftData, setGiftData] = useState([]);

  useEffect(() => {
    dispatch(listSupplements());
    getCardDetail(id);
    if (giftIds) {
      setGiftId(giftIds.split(","));
    }
  }, [dispatch, id, getCardDetail, listSupplements, supplements.length]);

  const getGiftDetail = useCallback(
    (id) => {
      return dispatch(listSupplementDetail(id)).then((res) => {
        if (res.data) {
          return {
            name: res.data.name,
            category: res.data.category,
            price: res.data.price,
            imageUrl: res.data.imageUrl,
            frontUrl: res.data.frontUrl,
            description: res.data.description,
          };
        } else {
          return null;
        }
      });
    },
    [dispatch]
  );

  useEffect(() => {
    if (giftId.length > 0) {
      Promise.all(giftId.map((id) => getGiftDetail(id)))
        .then((giftDetails) => {
          setGiftData(giftDetails);
        })
        .catch((error) => {
          console.error("Error fetching gift details:", error);
        });
    }
  }, [giftId, getGiftDetail, giftData.length]);

  const toCart = () => {
    history.push(`/cart/${id}`);
  };

  function onReturn(e) {
    e.preventDefault();
    history.goBack();
  }

  const ChooseGiftBox = (item) => {
    return (
      <>
        <AddCircleIcon color="primary" sx={{ fontSize: 25 }} />
        <Box
          sx={{
            width: isMobile ? "44%" : "160px",
            minWidth: isMobile ? "44%" : "160px",
            aspectRatio: "100/100",
            border: "dashed",
            borderWidth: "1px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: "#F1F1F1",
            boxShadow: 3,
          }}
        >
          {Object.keys(item.data).length === 0 ? (
            <Typography variant="body1" color="grey">
              Add an Extra Gift?
            </Typography>
          ) : (
            <img
              src={
                item.data.frontUrl ||
                item.data.blankUrl ||
                item.data.imageUrl ||
                "/assets/cards/blankpage.png"
              }
              alt="card-filter"
              width="100%"
              style={{
                height: item.data.category === "Gift Card" ? "auto" : "100%",
              }}
            />
          )}
        </Box>
      </>
    );
  };

  return (
    <Container className="theme-container">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={isMobile ? "center" : "space-between"}
        sx={{ marginBottom: "10px", marginTop: "10px" }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          {isMobile ? null : (
            <IconButton aria-label="goback" onClick={onReturn}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            <strong>Pair Your Card With The Perfect Gift</strong>
          </Typography>
        </Stack>
      </Stack>

      <Box sx={{ padding: "15px" }}>
        <Box className="card-plus-gifts" sx={{ justifyContent: "left" }}>
          <CardMedia
            sx={{
              width: isMobile ? "43%" : "160px",
              minWidth: isMobile ? "43%" : "160px",
              aspectRatio: "100/140",
              border: "solid",
              borderWidth: "1px",
              boxShadow: 3,
            }}
            image={
              cardData.frontUrl ||
              cardData.blankUrl ||
              cardData.imageUrl ||
              "/assets/cards/blankpage.png"
            }
            title="greeting card"
          />

          {giftData.map((gift, index) => (
            <ChooseGiftBox key={index} data={gift} />
          ))}
          <ChooseGiftBox data={{}} />
        </Box>

        <Divider sx={{ marginTop: "25px" }} />

        <GiftsPanel
          items={supplements.filter((item) =>
            item.occasion.includes(cardData.category)
          )}
          productId={id}
          prevData={giftIds}
        />

        <Stack direction="column" alignItems="center" sx={{ marginTop: 3 }}>
          {giftId.length > 0 ? (
            <Button variant="outlined" onClick={toCart}>
              <span>Go to Checkout</span>
            </Button>
          ) : (
            <Link
              component="button"
              variant="h6"
              color="error"
              underline="hover"
              onClick={toCart}
            >
              <strong>No Thanks - just send Free Card</strong>
            </Link>
          )}
        </Stack>
      </Box>
    </Container>
  );
}
