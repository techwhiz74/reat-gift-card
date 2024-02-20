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
  Paper,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import Carousel from "react-material-ui-carousel";

import CardInfoPanel from "../components/shopping/CardInfoPanel";
import InfoFAQs from "../components/shopping/InfoFAQs";
import Footer from "../components/Footer";

import {
  listProductDetail,
  updateProduct,
} from "../store/actions/productActions";

export default function CardInfoScreen() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id, forGift } = useParams();
  const isMobile = useMediaQuery("(max-width: 576px");

  const [cardImage, setCardImage] = useState();
  const [cardTitle, setCardTitle] = useState("Card Front");
  const [cardData, setCardData] = useState({
    name: "",
    category: "",
    price: "",
    imageUrl: "",
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
            frontUrl: res.data.frontUrl,
            middleUrl: res.data.middleUrl,
            preSMSUrl: res.data.preSMSUrl,
            description: res.data.description,
          });
          setCardImage(res.data.imageUrl);
        }
      });
    },
    [dispatch]
  );

  console.log(cardImage);

  useEffect(() => {
    getCardDetail(id);
  }, [dispatch, id, getCardDetail]);

  // var items = [
  //   { src: cardData.imageUrl, type: "Card Front" },
  //   {
  //     src: cardData.preSMSUrl
  //       ? cardData.middleUrl
  //       : "/assets/cards/blankpage.png",
  //     type: "Inside Right",
  //   },
  // ];

  function Item(props) {
    return (
      <Paper sx={{ boxShadow: 3 }}>
        <img
          className="d-block w-100"
          src={props.item.src}
          alt=""
          style={{
            aspectRatio: "100/140",
          }}
        />
      </Paper>
    );
  }

  // const category_name = cardData.category.toLowerCase();

  const textContent = (
    <Typography variant="body1">
      {/* Show your appreciation by sending them this {category_name} card.
      <br />
      Available as a greeting card, this {category_name} card is blank inside so
      you can personalise it with a message of your own. All our cards are
      printed with premium paper with a glossy finish. */}
      {cardData.description}
    </Typography>
  );

  const addToCart = () => {
    formatDesign(id);
    if (forGift) {
      history.push(`/cart/${id}`);
    } else {
      history.push(`/addgift/${id}`);
    }
  };

  const formatDesign = (id) => {
    dispatch(updateProduct({ _id: id, frontUrl: null, middleUrl: null }));
  };

  const toDesign = () => {
    formatDesign(id);
    if (forGift) {
      history.push(`/design/${id}/front/forGift`);
    } else {
      history.push(`/design/${id}/front`);
    }
  };

  return (
    <>
      <Container sx={{ padding: isMobile ? 0 : 5 }}>
        <Grid container spacing={isMobile ? 3 : 6}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: "#e1f3f5",
                padding: "15%",
              }}
            >
              <Stack alignItems="center">
                <Paper sx={{ boxShadow: 3 }}>
                  <img
                    className="d-block w-100"
                    src={cardImage}
                    alt="card-images"
                    style={{
                      aspectRatio: "100/140",
                    }}
                  />
                </Paper>

                <Stack direction="row" alignItems="center" spacing={2}>
                  <IconButton color="inherit">
                    <ChevronLeftIcon fontSize="large" />
                  </IconButton>
                  <Stack direction="row">
                    <IconButton color="inherit">
                      <FiberManualRecordIcon fontSize="small" />
                    </IconButton>
                    <IconButton color="inherit">
                      <FiberManualRecordOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                  <IconButton color="inherit">
                    <ChevronRightIcon fontSize="large" />
                  </IconButton>
                </Stack>

                <Typography sx={{ textAlign: "center" }}>
                  {cardTitle}
                </Typography>
              </Stack>

              {/* <Carousel
                pause="hover"
                autoPlay={false}
                indicators={true}
                swipe={true}
                navButtonsAlwaysVisible={true}
              >
                {items.map((item, i) => (
                  <Item key={i} item={item} />
                ))}
              </Carousel> */}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack
              direction="column"
              spacing={3}
              sx={{
                paddingX: isMobile ? 3 : 0,
                paddingBottom: 0,
              }}
            >
              <Typography variant="h5">
                <strong>{cardData.category} card</strong>
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

              <CardInfoPanel title="Greeting Card" size="A5" />
              <CardInfoPanel title="Delivery" />

              <Button
                variant="outlined"
                color="primary"
                sx={{ borderRadius: "25px" }}
                fullWidth
                onClick={addToCart}
              >
                <span>Add to Basket</span>
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: "25px" }}
                fullWidth
                size="large"
                onClick={toDesign}
              >
                <span>
                  <strong>Personalise</strong>
                </span>
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <InfoFAQs info={true} />

      <Footer />
    </>
  );
}
