import React from "react";
import { Container, Grid, Button, Divider } from "@mui/material";

const Banner = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/assets/banner.png') no-repeat",
        objectFit: "cover",
      }}
    >
      <Container style={{ margin: "36px 0px" }}>
        <Grid container spacing={3} style={{ padding: "5%" }}>
          <Grid
            item
            xs={5}
            style={{ textAlign: "center", padding: "24px", margin: "auto" }}
          >
            <div>
              <h1
                style={{
                  color: "white",
                  marginBottom: "5%",
                  lineHeight: "2",
                }}
              >
                Join Our membership
              </h1>
              <Button
                variant="outlined"
                style={{
                  borderRadius: "30px",
                  borderWidth: "3px",
                  height: "50px",
                  width: "200px",
                  borderColor: "white",
                  color: "white",
                }}
              >
                Learn More
              </Button>
            </div>
          </Grid>
          <Grid item xs style={{ padding: "16px" }}>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "5px",
                padding: "16px",
                minWidth: "300px",
              }}
            >
              <div>
                <img
                  src="https://www.datocms-assets.com/92667/1683279957-coin.png"
                  style={{ width: "24px" }}
                  alt=""
                />
              </div>
              <div>
                <span
                  style={{
                    color: "#37b1bf",
                    fontSize: "26px",
                    fontWeight: "800",
                  }}
                >
                  Plus
                </span>
                <img
                  src="/assets/sale-tag.png"
                  style={{
                    width: "120px",
                    float: "right",
                    position: "relative",
                    right: "0",
                    zIndex: "1",
                  }}
                  alt=""
                />
              </div>
              <p>
                <span style={{ fontWeight: "800" }}>€3.99/month</span> (€47.88
                per annum)
              </p>
              <Divider />
              <div style={{ margin: "10px 0px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <img
                      src="https://www.datocms-assets.com/92667/1683279957-coin.png"
                      style={{ width: "24px" }}
                      alt=""
                    />
                  </Grid>
                  <Grid item xs>
                    <p>2 credits per month</p>
                  </Grid>
                </Grid>
              </div>
              <div style={{ margin: "10px 0px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <img
                      src="https://www.datocms-assets.com/92667/1683279974-calendar.png"
                      style={{ width: "24px" }}
                      alt=""
                    />
                  </Grid>
                  <Grid item xs>
                    <p>6 month credit rollover</p>
                  </Grid>
                </Grid>
              </div>
              <div style={{ margin: "10px 0px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <img
                      src="https://www.datocms-assets.com/92667/1683280007-van.png"
                      style={{ width: "24px" }}
                      alt=""
                    />
                  </Grid>
                  <Grid item xs>
                    <p>Free delivery</p>
                  </Grid>
                </Grid>
              </div>
              <div style={{ margin: "10px 0px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <img
                      src="https://www.datocms-assets.com/92667/1683280020-christmas-tree.png"
                      style={{ width: "24px" }}
                      alt=""
                    />
                  </Grid>
                  <Grid item xs>
                    <p>Access to fun features</p>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
          <Grid item xs style={{ padding: "16px" }}>
            <div>sdf</div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Banner;
