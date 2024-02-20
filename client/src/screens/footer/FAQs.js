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

export default function FAQs({ info }) {
  return (
    <Container sx={{ paddingY: 5 }}>
      <Stack direction="column" spacing={info ? 2 : 4} id="text-component">
        <Typography variant={info ? "h5" : "h4"}>
          <strong>
            {info ? "FAQ" : "Frequently Asked Questions (FAQs) for Free-Cards"}
          </strong>
        </Typography>

        <Accordion className="faq-accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            <Typography variant={info ? "body1" : "h6"}>
              <strong>1. What is Free-Cards?</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Free-Cards is an online business based in the UK, we specialise in
              greeting cards and postcards. We offer a unique service where
              customers can choose from a wide range of cards and gifts. Our
              unique selling point (USP) is providing customers with two free
              cards each month, including free postage.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className="faq-accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            <Typography variant={info ? "body1" : "h6"}>
              <strong>2. How can I get my two free cards each month?</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              As a valued customer, you're automatically entitled to two free
              cards per month. Simply sign-up and log in to your account, select
              your cards, and we'll take care of the postage. There are no
              hidden fees or charges! You can easily keep track of how many
              Free-Cards you have left in your members area.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className="faq-accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            <Typography variant={info ? "body1" : "h6"}>
              <strong>
                3. What is the cost for sending more than two free cards per
                month?
              </strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              If you choose to send more than your allotted two free cards per
              month, each additional card will incur a postage fee of £1.99.
              Remember, the card itself is still free!
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className="faq-accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            <Typography variant={info ? "body1" : "h6"}>
              <strong>4. Can I personalise my greeting cards?</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes, personalisation is at the heart of what we do. You can add
              personal messages, choose designs, and even add photos to make
              your card as unique as your message.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className="faq-accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            <Typography variant={info ? "body1" : "h6"}>
              <strong>5. What types of gifts do you offer?</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Our gift range includes Personalised Gift Cards, Chocolates, Wine,
              Soft Toys, and more. We carefully select items that complement our
              greeting cards, perfect for any occasion.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className="faq-accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            <Typography variant={info ? "body1" : "h6"}>
              <strong>6. Can I purchase additional cards and gifts?</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Absolutely! Besides your two free cards per month, you can
              purchase as many cards and gifts as you like. We have a diverse
              range of gifts perfect for pairing with your cards for any
              occasion.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className="faq-accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            <Typography variant={info ? "body1" : "h6"}>
              <strong>7. Do you offer international shipping?</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes, we offer international shipping. While our free card offer
              and standard deliveries are limited to the UK, we can arrange
              international shipping for purchased items. Please note that
              postage for international items is not free, please check our{" "}
              <strong>Deliveries & Returns</strong> section for more
              information.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className="faq-accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            <Typography variant={info ? "body1" : "h6"}>
              <strong>8. How eco-friendly are your cards and packaging?</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              We are committed to sustainability. All our cards and packaging
              materials are eco-friendly, ensuring minimal environmental impact.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className="faq-accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            <Typography variant={info ? "body1" : "h6"}>
              <strong>9. What is your returns policy?</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              If you're not completely satisfied with your purchase, please get
              in touch with us within 14 days of receiving your order. We gladly
              accept returns for most items, as long as they are in their
              original condition and packaging. However, it's important to note
              that personalised greeting cards and postcards are exempt from our
              return policy due to their customised nature. These items can only
              be returned if they are found to be faulty.
            </Typography>
            <Typography>
              We understand that sometimes your expectations may not be met, and
              we want to make your shopping experience as smooth as possible.
              Please don't hesitate to contact us if you have any further
              questions or concerns. At Free-Cards, we're committed to ensuring
              your experience with us is enjoyable and hassle-free!
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Container>
  );
}
