import React from "react";
import { Container, Typography, Stack, Box } from "@mui/material";

export default function CookiePolicy() {
  return (
    <Container sx={{ paddingY: 5 }}>
      <Stack direction="column" spacing={3} id="text-component">
        <Box>
          <Typography variant="h4">
            <strong>Cookie Policy for Free-Cards</strong>
          </Typography>
          <Typography variant="h5">
            <strong>Last Updated: 01 January 2024</strong>
          </Typography>
        </Box>

        <Stack direction="column" spacing={2}>
          <Typography variant="h6">
            <strong>1. Introduction</strong>
          </Typography>
          <Typography>
            Welcome to Free-Cards ("we," "us," or "our"). This Cookie Policy
            explains how we use cookies and similar technologies on our website
            ("Website"). By accessing and using our website, you consent to the
            use of cookies in accordance with this policy.
          </Typography>
        </Stack>

        <Stack direction="column" spacing={2}>
          <Typography variant="h6">
            <strong>2. What Are Cookies?</strong>
          </Typography>
          <Typography>
            Cookies are small text files that are stored on your device
            (computer, tablet, smartphone, etc.) when you visit a website. They
            are widely used to make websites work efficiently, provide a better
            user experience, and gather information about how users interact
            with websites.
          </Typography>
        </Stack>

        <Stack direction="column" spacing={2}>
          <Typography variant="h6">
            <strong>3. How We Use Cookies</strong>
          </Typography>
          <Typography>
            At Free-Cards, we use Google Analytics to analyse the use of our
            website. Google Analytics uses cookies to collect and analyse
            information about how visitors use our website. This information
            helps us improve the Website's content, functionality, and user
            experience.
          </Typography>
          <Typography>
            Google Analytics collects information such as:
          </Typography>
          <Typography>The pages you visit on our website.</Typography>
          <Typography>The time you spend on each page.</Typography>
          <Typography>Your location (based on your IP address).</Typography>
          <Typography>The type of device and browser you use.</Typography>
          <Typography>
            How you arrived at our website (e.g. through a search engine or
            referral link).
          </Typography>
          <Typography>
            This data is anonymised and does not personally identify you. We do
            not use cookies to collect personally identifiable information
            unless you voluntarily provide it to us through forms or other
            means.
          </Typography>
        </Stack>

        <Stack direction="column" spacing={2}>
          <Typography variant="h6">
            <strong>4. Types of Cookies We Use</strong>
          </Typography>
          <Typography>We use the following types of cookies:</Typography>
          <Typography>
            Analytical/Performance Cookies: These cookies allow us to recognise
            and count the number of visitors and see how visitors move around
            our website. This helps us improve the way our website works.
          </Typography>
          <Typography>
            Functionality Cookies: These cookies are used to recognise you when
            you return to our website. They enable us to personalise content for
            you, greet you by name, and remember your preferences.
          </Typography>
        </Stack>

        <Stack direction="column" spacing={2}>
          <Typography variant="h6">
            <strong>5. Managing Cookies</strong>
          </Typography>
          <Typography>
            You can control and manage cookies in your browser settings. Most
            web browsers allow you to block or delete cookies, limit their use
            to specific websites, or notify you when a cookie is placed on your
            device. Please consult your browser's help documentation for more
            information on how to manage cookies.
          </Typography>
          <Typography>
            Please note that if you disable cookies, some features of our
            website may not function correctly, and your user experience may be
            affected.
          </Typography>
        </Stack>

        <Stack direction="column" spacing={2}>
          <Typography variant="h6">
            <strong>6. Changes to This Policy</strong>
          </Typography>
          <Typography>
            We may update this Cookie Policy from time to time to reflect
            changes in technology or legal requirements. When we make changes,
            we will update the "Last Updated" date at the beginning of this
            policy. We encourage you to review this policy periodically to stay
            informed about how we use cookies.
          </Typography>
        </Stack>

        <Stack direction="column" spacing={2}>
          <Typography variant="h6">
            <strong>7. Contact Us</strong>
          </Typography>
          <Typography>
            If you have any questions or concerns about our use of cookies,
            please contact us at <strong>help@free-cards.co.uk</strong>.
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
}
