import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  useMediaQuery,
  Dialog,
  DialogContent,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Carousel from "react-material-ui-carousel";

import "../../font.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(0),
  },
}));

const MainLanding = () => {
  const isMobile = useMediaQuery("(max-width: 576px");

  var items = [
    { src: "/assets/landing/banner/birthday_card.png" },
    { src: "/assets/landing/banner/thankyou_card.png" },
    { src: "/assets/landing/banner/gifts.png" },
    { src: "/assets/landing/banner/gift_card01.png" },
    { src: "/assets/landing/banner/gift_card02.png" },
  ];

  function Item(props) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    return (
      <>
        <Box onClick={handleClickOpen}>
          <img
            className="d-block w-100"
            src={props.item.src}
            alt=""
            style={{ width: "100%" }}
          />
        </Box>

        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          onClick={handleClose}
          id="bannerModal"
        >
          <DialogContent
            dividers
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={props.item.src} alt="Card" style={{ width: "800px" }} />
          </DialogContent>
        </BootstrapDialog>
      </>
    );
  }

  return (
    <div className="mainlanding" style={{ padding: "30px 15px" }}>
      <Container sx={{ padding: "0px" }}>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={6}
            md={7}
            lg={7}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                flexDirection: "column",
                zIndex: 2,
                textAlign: "center",
                marginBottom: 5,
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  lineHeight: 1.5,
                  fontFamily: "'hum_me_tight', sans-serif",
                }}
              >
                Send people lovely cards
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: "#d32f2f",
                  lineHeight: 1.5,
                  fontFamily: "'tahoma', sans-serif",
                }}
              >
                Completely FREE!
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  lineHeight: 2.5,
                  fontFamily: "'hum_me_tight', sans-serif",
                }}
              >
                We Even Pay For Postage
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={5} lg={5} sx={{ height: "100%" }}>
            <Carousel pause="hover" autoPlay={true} interval={4000}>
              {items.map((item, i) => (
                <Item key={i} item={item} />
              ))}
            </Carousel>
          </Grid>
        </Grid>

        {/* <Box
          className="mainlanding_content"
          sx={{ position: "absolute", zIndex: 2 }}
        >
          <Typography
            variant="h3"
            sx={{
              lineHeight: 1.5,
              fontFamily: "'hum_me_tight', sans-serif",
            }}
          >
            Send people lovely cards
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: "#d32f2f",
              lineHeight: 1.5,
              fontFamily: "'tahoma', sans-serif",
            }}
          >
            Completely FREE!
          </Typography>

          <Typography
            variant="h5"
            sx={{ lineHeight: 2, fontFamily: "'hum_me_tight', sans-serif" }}
          >
            We Even Pay For Postage
          </Typography>
        </Box>

        <Carousel
          pause="hover"
          sx={{
            padding: "0px",
            width: isMobile ? "90%" : "480px",
            position: "absolute",
            top: isMobile ? "40%" : "5%",
            left: isMobile ? "5%" : "60%",
            zIndex: 1,
            borderRadius: 5,
          }}
          autoPlay={true}
          interval={4000}
          id="11111"
        >
          {items.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </Carousel> */}
      </Container>
    </div>
  );
};

export default MainLanding;
