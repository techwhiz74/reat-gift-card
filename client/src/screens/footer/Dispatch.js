import React from "react";
import { Container, Typography, Stack, Box } from "@mui/material";

export default function AboutUs() {
  return (
    <Container sx={{ paddingY: 5 }}>
      <Stack direction="column" spacing={3} id="text-component">
        <Box>
          <Typography variant="h4">
            <strong>Delivery Policy for Free-Cards</strong>
          </Typography>
          <Typography variant="h5">
            <strong>Effective Date: 01 January 2024</strong>
          </Typography>
        </Box>

        <Stack direction="column" spacing={2}>
          <Typography variant="h6">
            <strong>1. Dispatch and Delivery</strong>
          </Typography>
          <Typography>
            At Free-Cards, we understand the importance of timely delivery when
            it comes to greeting cards and postcards. Our Delivery Policy
            outlines how we manage the dispatch and delivery of your orders to
            ensure you receive your cards promptly and securely.
          </Typography>
        </Stack>

        <Stack direction="column" spacing={2}>
          <Typography variant="h6">
            <strong>2. Dispatch Times</strong>
          </Typography>
          <Typography>
            Greeting Cards and Postcards ordered before 1 PM on business days
            (Monday to Friday) are dispatched on the same day. Orders placed
            after 1 PM or on weekends and public holidays will be processed and
            dispatched on the next business day.
          </Typography>
        </Stack>

        <Stack direction="column" spacing={2}>
          <Typography variant="h6">
            <strong>3. Delivery Options</strong>
          </Typography>
          <Typography>
            We offer the following delivery options to cater to your needs:
          </Typography>
          <Typography>
            <strong>Standard Free Delivery: </strong> Our standard delivery
            service is sent via Royal Mail 2nd Class. This option is available
            free of charge. (Free Delivery for a Limited Time Only)
          </Typography>
          <Typography>
            <strong>Next Day Delivery: </strong> For customers who require
            expedited delivery, we provide a Next Day Delivery service. Pricing
            details for Next Day Delivery
          </Typography>
        </Stack>

        <Stack direction="column" spacing={2}>
          <Typography variant="h6">
            <strong>4. International Delivery</strong>
          </Typography>
          <Typography>
            We're pleased to offer international delivery services to bring our
            exquisite greeting cards and postcards to customers worldwide.
            International delivery is subject to a flat-rate fee and typically
            reaches most destinations within 3-8 business days. Please note that
            delivery times may vary depending on the specific destination and
            any customs regulations.
          </Typography>
        </Stack>

        <Stack direction="column" spacing={2}>
          <Typography variant="h6">
            <strong>5. Order Tracking</strong>
          </Typography>
          <Typography>
            It is not currently possible to track Greeting Cards or Postcards.
            However, some gifts sold by Free-Cards are subject to tracking.
            Subsequently, if your Greeting Card is sent in conjunction with a
            gift then you may be able to track the progress. If your order
            allows tracking you will be informed at checkout.
          </Typography>
        </Stack>

        <Stack direction="column" spacing={2}>
          <Typography variant="h6">
            <strong>6. Delivery Address</strong>
          </Typography>
          <Typography>
            Kindly ensure that you provide accurate and complete delivery
            information when placing your order. Free-Cards cannot be held
            responsible for any delays or non-delivery resulting from inaccurate
            or incomplete address details provided by the customer.
          </Typography>
        </Stack>

        <Stack direction="column" spacing={2}>
          <Typography variant="h6">
            <strong>7. Delivery Delays</strong>
          </Typography>
          <Typography>
            While we make every effort to ensure swift delivery, occasional
            delays may occur due to circumstances beyond our control, such as
            adverse weather conditions, postal strikes, or customs inspections
            for international orders. We appreciate your patience during such
            instances.
          </Typography>
        </Stack>

        <Stack direction="column" spacing={2}>
          <Typography variant="h6">
            <strong>8. Contact Us</strong>
          </Typography>
          <Typography>
            Should you have any questions or concerns regarding our delivery
            policy or require assistance with tracking your order, please do not
            hesitate to get in touch with our dedicated customer support team.
            You can reach us at <strong>help@free-cards.co.uk</strong>.
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
}
