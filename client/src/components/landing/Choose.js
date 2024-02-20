import React from "react";

import {
  Box,
  Container,
  Typography,
  Divider,
  Stack,
  useMediaQuery,
} from "@mui/material";

const Choose = () => {
  const isMobile = useMediaQuery("(max-width: 576px");

  return (
    <Container>
      <div style={{ marginTop: "72px" }}>
        <Divider sx={{ marginBottom: "10px", color: "#007373" }}>
          <Typography variant="h5">
            <strong>HOW FREE-CARDS WORKS</strong>
          </Typography>
        </Divider>

        <Typography variant="body1" sx={{ textAlign: "center" }}>
          Send the perfect card right from your computer or phone as if you
          wrote and sent it yourself.
        </Typography>
        <Box sx={{ marginTop: "20px" }}>
          <Stack
            direction={isMobile ? "column" : "row"}
            justifyContent="space-between"
            alignItems="center"
            spacing={3}
          >
            <Stack
              direction="column"
              alignItems="center"
              className="choose-box"
              sx={{
                width: isMobile ? "100%" : "30%",
              }}
            >
              <img
                src="https://www.datocms-assets.com/92667/1696409452-heart-card-teal.svg"
                style={{ height: "50px", marginBottom: "20px" }}
                alt=""
              />
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                CHOOSE YOUR DESIGN
              </Typography>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                Pick from thousands of designs from amazing, independent artists
                from all around the world.
              </Typography>
            </Stack>
            <Stack
              direction="column"
              alignItems="center"
              className="choose-box"
              sx={{
                width: isMobile ? "100%" : "30%",
              }}
            >
              <img
                src="https://www.datocms-assets.com/92667/1696409461-painting.svg"
                style={{ height: "50px", marginBottom: "20px" }}
                alt=""
              />
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                WRITE & DOODLE
              </Typography>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                We take what you type and make it look like real handwriting.
              </Typography>
            </Stack>
            <Stack
              direction="column"
              alignItems="center"
              className="choose-box"
              sx={{
                width: isMobile ? "100%" : "30%",
              }}
            >
              <img
                src="	https://www.datocms-assets.com/92667/1696409469-paper-plane.svg"
                style={{ height: "50px", marginBottom: "20px" }}
                alt=""
              />
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                WE PRINT & SEND
              </Typography>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                Printed on the finest stock, hand stamped and posted from
                Australia, the UK, USA or Canada.
              </Typography>
            </Stack>
          </Stack>
          {/* <div style={{ marginTop: "24px", textAlign: "center" }}>
            <Button
              variant="outlined"
              color="primary"
              style={{
                width: "300px",
                borderRadius: "30px",
                borderWidth: "3px",
                height: "50px",
              }}
            >
              Create a card now
            </Button>
          </div> */}
        </Box>
      </div>
    </Container>
  );
};

export default Choose;
