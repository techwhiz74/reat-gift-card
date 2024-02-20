import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Button,
  Typography,
  Grid,
  Paper,
  Stack,
  Divider,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import CartTheme from "../../components/shopping/CartTheme";
import CheckModal from "../../components/shopping/CheckModal";

import {
  addToCart,
  removeFromCart,
  giftToCart,
} from "../../store/actions/cartActions";
import { getOrderDetails, listOrders } from "../../store/actions/orderActions";
import { getUserDetail } from "../../store/actions/userActions";

const CartScreen = ({ match, location, history }) => {
  const dispatch = useDispatch();
  const [checkOpen, setCheckOpen] = useState(false);
  const [nonFreeCards, setNonFreeCards] = useState([]);
  const [nonFreeIds, setNonFreeIds] = useState([]);

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userLogin);
  const cart = useSelector((state) => state.cart);

  // Get userData to display free-cards number
  const [userData, setUserData] = useState({
    freeCards: userInfo?.freeCards,
  });

  const getUserData = useCallback(
    (id) => {
      dispatch(getUserDetail(id)).then((res) => {
        if (res.data) {
          setUserData((prevData) => ({
            ...prevData,
            _id: res.data._id,
            freeCards: res.data.freeCards,
          }));
        }
      });
    },
    [dispatch]
  );

  useEffect(() => {
    if (userInfo) {
      getUserData(userInfo._id);
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  // Cart summary
  const [cardPrice, setCardPrice] = useState(0);
  const [postageFee, setPostageFee] = useState(0);
  const [giftPrice, setGiftPrice] = useState(0);
  const [giftShipping, setGiftShipping] = useState(0);
  const [giftCardFee, setGiftCardFee] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Update monthly free-cards number
  const { orders } = useSelector((state) => state.orderList);
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // Monthly paid my orders
  const myOrders =
    orders?.length > 0
      ? orders.filter((order) => {
          const createdDate = new Date(order.createdAt);
          return (
            order.user?._id === userInfo._id &&
            createdDate.getMonth() === currentMonth &&
            createdDate.getFullYear() === currentYear
          );
        })
      : [];

  // Sum of the card qty for each myOrder
  const orderedCards = myOrders.map((order) =>
    order.orderItems
      ?.filter((item) => item.extra === false)
      .reduce((subTotal, element) => {
        return subTotal + element.qty;
      }, 0)
  );

  // Total qty which I get this month
  const totalQuantity = orderedCards.reduce((total, subTotal) => {
    return total + subTotal;
  }, 0);

  useEffect(() => {
    const freeCardsLeft = 2 > totalQuantity ? 2 - totalQuantity : 0;
    const extraCards = cartItems
      .filter((item) => item.extra === false)
      .slice(freeCardsLeft);
    setNonFreeCards(extraCards);
    const calculatedPostageFee = extraCards
      .reduce((totalFee, card) => {
        return totalFee + card.postageFee;
      }, 0)
      .toFixed(2);

    const calculatedGiftPrice = cartItems
      .filter((item) => item.extra)
      .reduce((acc, item) => acc + item.qty * item.price, 0)
      .toFixed(2);
    const calculatedGiftShipping = cartItems
      .filter((item) => item.extra && item.category !== "Gift Card")
      .reduce((acc, item) => acc + item.qty * item.shipping, 0)
      .toFixed(2);
    const calculatedGiftCardFee = cartItems
      .filter((item) => item.extra && item.category === "Gift Card")
      .reduce((acc, item) => acc + item.qty * item.fee, 0)
      .toFixed(2);

    const calculatedTotalPrice = (
      parseFloat(calculatedPostageFee) +
      parseFloat(calculatedGiftPrice) +
      parseFloat(calculatedGiftShipping) +
      parseFloat(calculatedGiftCardFee)
    ).toFixed(2);

    setPostageFee(calculatedPostageFee);
    setGiftPrice(calculatedGiftPrice);
    setGiftShipping(calculatedGiftShipping);
    setGiftCardFee(calculatedGiftCardFee);
    setTotalPrice(calculatedTotalPrice);
    cart.cardPrice = 0;
    cart.postageFee = calculatedPostageFee;
    cart.giftPrice = calculatedGiftPrice;
    cart.giftShipping = calculatedGiftShipping;
    cart.giftCardFee = calculatedGiftCardFee;
    cart.totalPrice = calculatedTotalPrice;
  }, [cartItems, userData]);

  const isGreetingCard = cartItems.filter(
    (item) => item.extra === false
  ).length;
  const isGiftCard = cartItems.filter(
    (item) => item.category === "Gift Card"
  ).length;

  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  // Not free cards' _id
  useEffect(() => {
    setNonFreeIds(nonFreeCards.map((item) => item.product));
  }, [nonFreeCards]);

  useEffect(() => {
    if (productId) {
      if (nonFreeIds.includes(productId)) {
        dispatch(addToCart(productId, qty, false));
      } else {
        dispatch(addToCart(productId, qty, true));
      }
    }
  }, [dispatch, productId, qty, nonFreeIds]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const qtyHandler = (e, item) => {
    const quantity = Number(e.target.value);
    if (quantity > 0) {
      dispatch(addToCart(item.product, quantity));
    }
  };

  const giftQtyHandler = (e, item) => {
    const quantity = Number(e.target.value);
    if (quantity > 0) {
      if (item.category === "Gift Card") {
        dispatch(giftToCart(item.product, quantity, item.price, item.fee));
      } else {
        dispatch(giftToCart(item.product, quantity));
      }
    }
  };

  const checkoutHandler = () => {
    userInfo ? history.push(`/delivery`) : setCheckOpen(true);
  };

  function handleClose() {
    setCheckOpen(false);
  }

  return (
    <Container className="theme-container">
      <Stack
        direction="row"
        alignItems="flex-end"
        spacing={2}
        sx={{ marginY: "10px" }}
      >
        <Typography variant="h5">
          <strong>Basket</strong>
        </Typography>
        <Typography variant="body1">
          ({cartItems.reduce((acc, item) => acc + item.qty, 0)} Items)
        </Typography>
      </Stack>

      {cartItems.length === 0 ? (
        <Paper sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ padding: 5 }}>
            Your <ShoppingCartOutlinedIcon /> is empty.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <Stack direction="column" alignItems="center">
              <>
                {cartItems.map(
                  (item, index) =>
                    !item.extra && (
                      <CartTheme
                        key={index}
                        item={item}
                        extra={false}
                        qtyHandler={qtyHandler}
                        removeFcn={removeFromCartHandler}
                      />
                    )
                )}
                {cartItems.map(
                  (item, index) =>
                    item.extra && (
                      <CartTheme
                        key={index}
                        item={item}
                        extra={true}
                        qtyHandler={giftQtyHandler}
                        // removeFcn={removeFromCartHandler}
                      />
                    )
                )}
              </>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ padding: "20px" }}>
              <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                <strong>Basket Summary</strong>
              </Typography>
              <Divider />

              <Stack direction="column" spacing={2} sx={{ marginTop: "10px" }}>
                {isGreetingCard > 0 ? (
                  <>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body1">Greeting Cards:</Typography>
                      <Typography variant="body1">
                        {postageFee > 0 ? `£ ${cardPrice?.toFixed(2)}` : "FREE"}
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body1">Postage Fee:</Typography>
                      <Typography variant="body1">
                        {postageFee > 0 ? `£ ${postageFee}` : "FREE"}
                      </Typography>
                    </Stack>
                  </>
                ) : null}

                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body1">Suggested Gifts:</Typography>
                  <Typography variant="body1">£ {giftPrice}</Typography>
                </Stack>

                {isGiftCard ? (
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body1">Gift-Cards Fee:</Typography>
                    <Typography variant="body1">£ {giftCardFee}</Typography>
                  </Stack>
                ) : null}

                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body1">Delivery Cost:</Typography>
                  <Typography variant="body1">£ {giftShipping}</Typography>
                </Stack>

                <Divider />
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Basket Total :
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    £ {totalPrice}
                  </Typography>
                </Stack>

                <Divider />
                <Button
                  type="button"
                  variant="contained"
                  color="error"
                  onClick={checkoutHandler}
                  sx={{ borderRadius: "10px" }}
                  disabled={cartItems.length === 0}
                >
                  <span>Add Delivery Details</span>
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      )}
      <CheckModal open={checkOpen} closeFcn={handleClose} />
    </Container>
  );
};

export default CartScreen;
