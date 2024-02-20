import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function GiftCardTheme({ gift }) {
  return (
    <Card className="theme-Gift">
      <img
        src={gift.imageUrl}
        alt="card-filter"
        width="100%"
        style={{
          aspectRatio: "152/100",
        }}
      />
      <CardContent>
        <Typography variant="body1">
          <span style={{ fontFamily: "sans-serif" }}>
            <strong>£ {gift.price}</strong>
          </span>
        </Typography>
      </CardContent>
    </Card>
  );
}
