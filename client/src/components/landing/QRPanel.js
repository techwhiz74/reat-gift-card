import React from "react";
import {
  Container,
  useMediaQuery,
  Typography,
  Stack,
  Grid,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

export default function QRPanel() {
  const isMobile = useMediaQuery("(max-width: 675px");

  return (
    <div className="QRPanel" style={{ marginTop: "50px" }}>
      <Container>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={7}
            md={6}
            lg={4}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack
              direction="column"
              spacing={2}
              sx={{ marginBottom: "25px", marginRight: "10px" }}
            >
              <Typography variant="h5">
                <strong>Download our app!</strong>
              </Typography>

              <Typography>
                <DoneIcon fontSize="small" /> Upload photos from your phone
              </Typography>
              <Typography>
                <DoneIcon fontSize="small" /> Set event reminders
              </Typography>
              <Typography>
                <DoneIcon fontSize="small" /> Easily track your order
              </Typography>

              {isMobile ? null : (
                <Stack
                  direction="row"
                  alignItems="center"
                  sx={{
                    backgroundColor: "#ffffff",
                    padding: 2,
                    maxWidth: "427px",
                  }}
                  spacing={2}
                >
                  <img
                    src="/assets/qr-code.png"
                    style={{ width: "65px", height: "65px" }}
                    alt="QR"
                  />
                  <Typography>
                    Use your phone's camera to scan and download the Free-Cards
                    app. <br />
                    <strong>Available on iOS and Android devices.</strong>
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Grid>
          <Grid item xs={0} sm={1} md={2} lg={5}></Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            lg={3}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              alt="app-image"
              src="/assets/landing/banner/app-image.png"
              style={{
                maxWidth: isMobile ? "80%" : "270px",
                width: "100%",
                borderRadius: "20px 20px 0px 0px",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
