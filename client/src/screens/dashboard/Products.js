import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, Paper, Stack, Typography, Button } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

import ProductsTable from "../../components/admin/ProductsTable";
import SupplementsTable from "../../components/admin/SupplementsTable";

import { listProducts } from "../../store/actions/productActions";
import { listSupplements } from "../../store/actions/supplementActions";

export default function Products() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [cardKeyword, setCardKeyword] = useState("");
  const [giftKeyword, setGiftKeyword] = useState("");
  const { products } = useSelector((state) => state.productList);
  const { supplements } = useSelector((state) => state.supplementList);

  const searchedCards = cardKeyword
    ? products.filter((product) =>
        product.name.toLowerCase().includes(cardKeyword.toLowerCase())
      )
    : products;

  const searchedGifts = giftKeyword
    ? supplements.filter(
        (gift) =>
          gift.name.toLowerCase().includes(giftKeyword.toLowerCase()) ||
          gift.category.toLowerCase().includes(giftKeyword.toLowerCase())
      )
    : supplements;

  const { success: successDelete } = useSelector(
    (state) => state.productDelete
  );
  const { success: successCreate } = useSelector(
    (state) => state.productCreate
  );
  const { success: successUpdate } = useSelector(
    (state) => state.productUpdate
  );
  const { success: successGiftDelete } = useSelector(
    (state) => state.supplementDelete
  );
  const { success: successGiftCreate } = useSelector(
    (state) => state.supplementCreate
  );
  const { success: successGiftUpdate } = useSelector(
    (state) => state.supplementUpdate
  );

  React.useEffect(() => {
    dispatch(listProducts());
    dispatch(listSupplements());
  }, [
    dispatch,
    history,
    successDelete,
    successCreate,
    successUpdate,
    successGiftDelete,
    successGiftCreate,
    successGiftUpdate,
  ]);

  const addHandler = (e) => {
    e.preventDefault();
    history.push("/admin/product/add");
  };
  const addGiftHandler = (e) => {
    e.preventDefault();
    history.push("/admin/supplement/add");
  };

  return (
    <Box className="admin-container">
      <Box
        sx={{
          width: "100%",
          paddingX: "1%",
          paddingY: "1%",
        }}
      >
        <Stack direction="column" spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="h4">
              <strong>Products</strong>
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={addHandler}
              sx={{ borderRadius: "10px" }}
              startIcon={<AddBoxOutlinedIcon />}
            >
              New Card
            </Button>
          </Stack>
          <Paper
            sx={{
              width: "100%",
              paddingX: "1%",
              paddingY: "1%",
            }}
          >
            <ProductsTable
              items={searchedCards}
              keyword={cardKeyword}
              setKeyword={setCardKeyword}
            />
          </Paper>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="h4">
              <strong>Suggested Gifts</strong>
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={addGiftHandler}
              sx={{ borderRadius: "10px" }}
              startIcon={<AddBoxOutlinedIcon />}
            >
              New Gift
            </Button>
          </Stack>
          <Paper
            sx={{
              width: "100%",
              paddingX: "1%",
              paddingY: "1%",
            }}
          >
            <SupplementsTable
              items={searchedGifts}
              keyword={giftKeyword}
              setKeyword={setGiftKeyword}
            />
          </Paper>
        </Stack>
      </Box>
    </Box>
  );
}
