import React from "react";
import { Container, Typography, Stack, Box } from "@mui/material";

export default function AboutUs() {
  return (
    <Container sx={{ paddingY: 5 }}>
      <Stack direction="column" spacing={3} id="text-component">
        <Typography variant="h4">
          <strong>About Us</strong>
        </Typography>

        <Stack direction="column" spacing={1}>
          <Typography variant="h5">
            <strong>Welcome to Free-Cards - Where Every Moment Matters!</strong>
          </Typography>
          <Typography>
            In the heart of the UK, a unique idea blossomed into what is now
            known as Free-Cards, a haven for those who cherish the timeless
            tradition of sending greeting cards. Founded with the vision of
            keeping the beautiful art of card-giving alive and accessible, we've
            become a beloved destination for anyone looking to add a personal
            touch to their special moments.
          </Typography>
        </Stack>

        <Stack direction="column" spacing={1}>
          <Typography variant="h5">
            <strong>Our journey:</strong>
          </Typography>
          <Typography>
            At Free-Cards, our journey began with a simple yet powerful belief:
            that in our fast-paced, digital world, the personal touch of a
            handpicked greeting card holds more value than ever. We saw the need
            for a service that not only embraces this tradition but also makes
            it effortless and cost-effective. Hence, FreeCards was born – a
            place where selecting and sending the perfect card is not just a
            transaction but a delightful experience.
          </Typography>
        </Stack>

        <Stack direction="column" spacing={1}>
          <Typography variant="h5">
            <strong>Our Unique Selling Proposition (USP):</strong>
          </Typography>
          <Typography>
            What truly sets us apart is our commitment to generosity and
            convenience. As a Free-Cards family member, you are entitled to two
            free greeting cards every month, with postage included, completely
            on us. It's our way of saying thank you and encouraging the
            beautiful custom of card-giving. This isn't just about business;
            it's about fostering connections and celebrating relationships.
          </Typography>
        </Stack>

        <Stack direction="column" spacing={1}>
          <Typography variant="h5">
            <strong>Our Products:</strong>
          </Typography>
          <Typography>
            While we specialise in greeting cards, our vision extends beyond. We
            understand that sometimes words need companions. Therefore, our
            range includes a carefully curated selection of gifts designed to
            pair perfectly with your card. From the sweet simplicity of
            chocolates to the personalised touch of custom gifts, we ensure that
            your gesture of love and thoughtfulness is complete.
          </Typography>
        </Stack>

        <Stack direction="column" spacing={1}>
          <Typography variant="h5">
            <strong>Our Ethos:</strong>
          </Typography>
          <Typography>
            Sustainability: As lovers of nature and proponents of
            sustainability, all our cards and packaging materials are
            eco-friendly, ensuring our planet smiles with every card you send.
          </Typography>
          <Typography>
            Community and Creativity: We're not just a business; we're a
            community. We collaborate with local artists and designers, giving
            life to unique, creative designs that resonate with our diverse
            clientele.
          </Typography>
          <Typography>
            Customer-Centric Approach: Your experience is at the heart of our
            mission. We're dedicated to providing not just products but memories
            that last a lifetime, coupled with customer service that makes you
            feel valued and understood.
          </Typography>
        </Stack>

        <Stack direction="column" spacing={1}>
          <Typography variant="h5">
            <strong>Our Invitation to You:</strong>
          </Typography>
          <Typography>
            Whether you're celebrating a birthday, an anniversary, or just want
            to say a simple 'thank you', FreeCards is your go-to destination. We
            invite you to join our family, explore our diverse range, and take
            part in the beautiful journey of expressing emotions through the
            timeless tradition of greeting cards.
          </Typography>
          <Typography>
            Together, let's keep the personal touch alive in a world that's
            rapidly going digital!
          </Typography>
          <Typography>
            Welcome to Free-Cards – Celebrate Every Moment!
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
}
