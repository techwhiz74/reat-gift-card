import React from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Divider,
  Typography,
  Button,
  Stack,
  Box,
  useMediaQuery,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Footer = ({ isLanding }) => {
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width: 816px");

  return (
    <>
      <Box style={{ marginTop: "50px", backgroundColor: "#efeeef" }}>
        <Container>
          {isMobile ? (
            <Stack direction="column" spacing={2} sx={{ padding: "24px" }}>
              <Accordion className="footer-accordion">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="h6">
                    <strong>About Us</strong>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Link
                    underline="hover"
                    color="inherit"
                    onClick={() => history.push("/about")}
                  >
                    <Typography>About Us</Typography>
                  </Link>
                </AccordionDetails>
                <AccordionDetails>
                  <Link underline="hover" color="inherit">
                    <Typography>Contact Us</Typography>
                  </Link>
                </AccordionDetails>
              </Accordion>
              <Accordion className="footer-accordion">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="h6">
                    <strong>Help</strong>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={2}>
                    <Link
                      underline="hover"
                      color="inherit"
                      onClick={() => history.push("/faqs")}
                    >
                      <Typography>FAQs</Typography>
                    </Link>
                    <Link
                      underline="hover"
                      color="inherit"
                      onClick={() => history.push("/faqs")}
                    >
                      <Typography>Cookie Policy</Typography>
                    </Link>
                    <Link
                      underline="hover"
                      color="inherit"
                      onClick={() => history.push("/faqs")}
                    >
                      <Typography>Dispatch & Delivery</Typography>
                    </Link>
                    <Link
                      underline="hover"
                      color="inherit"
                      onClick={() => history.push("/faqs")}
                    >
                      <Typography>Terms & Conditions</Typography>
                    </Link>
                    <Link
                      underline="hover"
                      color="inherit"
                      onClick={() => history.push("/faqs")}
                    >
                      <Typography>Privacy Policy</Typography>
                    </Link>
                  </Stack>
                </AccordionDetails>
              </Accordion>
              <Accordion className="footer-accordion">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="h6">
                    <strong>Payment</strong>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Link underline="hover" color="inherit">
                    <Typography>Visa</Typography>
                  </Link>
                  <Link underline="hover" color="inherit">
                    <Typography>Mastercard</Typography>
                  </Link>
                </AccordionDetails>
              </Accordion>
            </Stack>
          ) : (
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ padding: "24px" }}
            >
              <Stack direction="column" spacing={2}>
                <Typography variant="h6">
                  <strong>About Us</strong>
                </Typography>
                <Link
                  underline="hover"
                  color="inherit"
                  onClick={() => history.push("/about")}
                >
                  <Typography>About Us</Typography>
                </Link>
                <Link underline="hover" color="inherit">
                  <Typography>Contact Us</Typography>
                </Link>
              </Stack>

              <Stack direction="column" spacing={2}>
                <Typography variant="h6">
                  <strong>Help</strong>
                </Typography>
                <Link
                  underline="hover"
                  color="inherit"
                  onClick={() => history.push("/faqs")}
                >
                  <Typography>FAQs</Typography>
                </Link>
                <Link
                  underline="hover"
                  color="inherit"
                  onClick={() => history.push("/cookie")}
                >
                  <Typography>Cookie Policy</Typography>
                </Link>
                <Link
                  underline="hover"
                  color="inherit"
                  onClick={() => history.push("/dispatch")}
                >
                  <Typography>Dispatch & Delivery</Typography>
                </Link>
                <Link
                  underline="hover"
                  color="inherit"
                  onClick={() => history.push("/terms")}
                >
                  <Typography>Terms & Conditions</Typography>
                </Link>
                <Link
                  underline="hover"
                  color="inherit"
                  onClick={() => history.push("/privacy")}
                >
                  <Typography>Privacy Policy</Typography>
                </Link>
              </Stack>

              <Stack direction="column" spacing={2}>
                <Typography variant="h6">
                  <strong>Contact Us</strong>
                </Typography>
                <Link underline="hover" color="inherit">
                  <Typography>support@free-cards.co.uk</Typography>
                </Link>
                <Link underline="none" color="inherit">
                  <Typography>Free-Cards</Typography>
                  <Typography>27 Old Gloucester St</Typography>
                  <Typography>London</Typography>
                  <Typography>WC1N 3AX</Typography>
                </Link>

                {/* <Box
                  sx={{
                    backgroundColor: "#ffffff",
                    borderRadius: "10px",
                    paddingX: 2,
                    paddingY: 1,
                    display: isMobile ? "none" : "block",
                  }}
                >
                  <Stack direction="column" spacing={1}>
                    <Typography variant="h6">
                      <strong>Scan to Download App</strong>
                    </Typography>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <img
                        src="/assets/qr-code.png"
                        style={{ width: "58px" }}
                        alt="QR"
                      />
                      <Button
                        variant="outlined"
                        style={{
                          borderRadius: "25px",
                          borderWidth: "3px",
                          height: "40px",
                        }}
                      >
                        <span>Find out More</span>
                      </Button>
                    </Stack>
                  </Stack>
                </Box> */}
              </Stack>
            </Stack>
          )}

          <Divider />

          <Stack
            direction={isMobile ? "column" : "row"}
            alignItems="center"
            justifyContent="space-between"
            sx={{ paddingY: "12px" }}
            spacing={isMobile ? 2 : 0}
          >
            <Stack
              direction={isMobile ? "column" : "row"}
              alignItems="center"
              spacing={isMobile ? 0 : 4}
            >
              <img
                src="/assets/logo_transparent.png"
                style={{ height: "45px", marginBottom: "10px" }}
                alt="logo"
              />
              <Stack direction="row" spacing={4}>
                <img
                  src="/assets/app-store-download.png"
                  style={{ height: isMobile ? "26px" : "32px" }}
                  alt="App-store"
                />
                <img
                  src="/assets/play-store-download.png"
                  style={{ height: isMobile ? "26px" : "32px" }}
                  alt="Play-store"
                />
              </Stack>
            </Stack>

            <Stack direction="column" alignItems="center">
              <Typography variant="body1">
                <strong>Follow us</strong>
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <i class="bi bi-facebook" style={{ fontSize: "24px" }} />
                <i class="bi bi-instagram" style={{ fontSize: "24px" }} />
                <i class="bi bi-twitter" style={{ fontSize: "24px" }} />
                <i class="bi bi-youtube" style={{ fontSize: "24px" }} />
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container sx={{ display: isLanding && !isMobile ? "block" : "none" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginTop: 2 }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body2">
              <strong>Region - </strong>
            </Typography>
            <img
              src="/assets/uk_round.png"
              style={{ height: "24px" }}
              alt="flag"
            />
          </Stack>
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ float: "right" }}
          >
            &copy; 2024 Free-Cards | All rights reserved.
          </Typography>
        </Stack>
      </Container>
    </>
  );
};

export default Footer;
