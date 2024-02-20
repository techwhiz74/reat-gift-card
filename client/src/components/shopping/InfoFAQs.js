import React from "react";
import {
  Container,
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function InfoFAQs() {
  return (
    <Container sx={{ paddingY: 5 }}>
      <Stack direction="column" spacing={2} id="text-component">
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          <strong>Card F.A.Q's</strong>
        </Typography>

        <Accordion className="faq-accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            <Typography variant="body1">
              <strong>1. How long will my order take to print and ship?</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Orders received before 4PM on weekdays will be printed and posted
              on the same day, while those placed after 4PM will be shipped the
              following day. Orders made on weekends and bank holidays will be
              shipped on the next available business day.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className="faq-accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            <Typography variant="body1">
              <strong>2. Can I track my order?</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Currently, tracking is not available for individual card orders
              once they have been shipped. However, orders that include
              additional gifts can be tracked.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className="faq-accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            <Typography variant="body1">
              <strong>3. Can I get the card delivered to me?</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes, you have the option to have the card delivered to your home
              address, allowing you to personally hand it to the intended
              recipient.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className="faq-accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            <Typography variant="body1">
              <strong>4. Why are Free-Cards Free?</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              We believe in the power of meaningful connections and want to make
              it easy for you to send heartfelt greetings to your loved ones.
              That's why our greeting cards are completely free, including
              postage. We sustain our free offering by providing optional
              extras, such as gifts and gift cards, for those looking to enhance
              their gifting experience.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className="faq-accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            <Typography variant="body1">
              <strong>5. Is postage free? </strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes, Free-Cards allows all members to send 2 Free Cards completely
              free each month! This means that we even pay for postage so you
              dont pay a thing. Just pick a card, personalise it and send it,
              we'll handle the rest.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Container>
  );
}
