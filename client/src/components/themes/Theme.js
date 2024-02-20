import React from "react";
import { useHistory } from "react-router-dom";
import { Card } from "@mui/material";

export default function Theme({ product, forGift }) {
  const history = useHistory();

  const handleClick = (id) => {
    if (forGift) {
      history.push(`/cardinfo/${id}/forGift`);
    } else {
      history.push(`/cardinfo/${id}`);
    }
  };

  return (
    <>
      <Card className="theme-Card" onClick={() => handleClick(product._id)}>
        <img
          src={product.imageUrl}
          alt="card-theme"
          className="img-thumbnail"
        />
      </Card>
    </>
  );
}
