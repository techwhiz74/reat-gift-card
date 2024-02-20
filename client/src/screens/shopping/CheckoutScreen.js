import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Stripe from "react-stripe-checkout";
import {
  Container,
  Button,
  Typography,
  Grid,
  Paper,
  Box,
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import CheckoutTheme from "../../components/shopping/CheckoutTheme";
import WithdrawModal from "../../components/shopping/WithdrawModal";

import {
  getOrderDetails,
  payOrder,
  deleteOrder,
} from "../../store/actions/orderActions";
import { updateUser, getUserDetail } from "../../store/actions/userActions";
import {
  updateProduct,
  listProductDetail,
} from "../../store/actions/productActions";
import {
  updateSupplement,
  listSupplementDetail,
} from "../../store/actions/supplementActions";
import { removeFromCart } from "../../store/actions/cartActions";

export default function CheckoutScreen() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { success: deleteSuccess } = useSelector((state) => state.orderDelete);

  const [paymentStatus, setpaymentStatus] = useState(false);
  const [userData, setUserData] = useState({});
  const [payData, setPayData] = useState({
    id: "",
    status: "",
    email_address: "",
  });

  const {
    orderItems,
    shippingAddress,
    cardPrice,
    postageFee,
    giftPrice,
    giftShipping,
    giftCardFee,
    totalPrice,
    isPaid,
  } = useSelector((state) => state.orderDetails.order);

  const cardsNum = orderItems
    ?.filter((item) => item.extra === false)
    .reduce((total, element) => {
      return total + element.qty;
    }, 0);

  const getUserData = useCallback(
    (id) => {
      dispatch(getUserDetail(id)).then((res) => {
        if (res.data) {
          setUserData(() => ({
            _id: res.data._id,
            freeCards: res.data.freeCards,
            spent: res.data.spent,
          }));
        }
      });
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id, isPaid, deleteSuccess]);

  useEffect(() => {
    if (userInfo) {
      getUserData(userInfo._id);
      setPayData((prevData) => ({
        ...prevData,
        id: userInfo._id,
        email_address: userInfo.email,
      }));
    } else {
      history.push("/login");
    }
  }, [history, userInfo]);

  // Update free-cards details
  const updateUserHandler = () => {
    const updatedFreeCards =
      userData.freeCards > cardsNum ? userData.freeCards - cardsNum : 0;
    const updatedSpent = userData.spent + totalPrice;

    const updatedUserData = {
      ...userData,
      freeCards: updatedFreeCards,
      spent: updatedSpent,
    };

    dispatch(updateUser(updatedUserData));
  };

  // Update products and supplements details
  const updateHandler = () => {
    orderItems.forEach((element) => {
      if (element.extra) {
        dispatch(listSupplementDetail(element.product))
          .then((res) => {
            dispatch(
              updateSupplement({
                _id: res.data._id,
                sales: res.data.sales + element.qty,
              })
            );
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        dispatch(listProductDetail(element.product))
          .then((res) => {
            dispatch(
              updateProduct({
                _id: res.data._id,
                sales: res.data.sales + element.qty,
              })
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  // Only Free Card
  const freePay = () => {
    dispatch(payOrder(id, { ...payData, paymentStatus: true }));
  };

  // Stripe payment integration
  const handleToken = (totalPrice, token) => {
    try {
      axios
        .post("/api/stripe/pay", {
          token: token.id,
          amount: totalPrice,
        })
        .then((response) => {
          if (response.data.success) {
            dispatch(payOrder(id, { ...payData, status: true }));
            setpaymentStatus(true);
            updateUserHandler();
            updateHandler();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const tokenHandler = (token) => {
    handleToken(totalPrice, token);
  };

  // Withdraw confirm modal control
  const [open, setOpen] = useState(false);
  const [selectedID, setSelectedID] = useState();
  const handleOpen = (id) => {
    setOpen(true);
    setSelectedID(id);
  };
  const handleClose = () => setOpen(false);

  const isGreetingCard = orderItems?.filter(
    (item) => item.extra === false
  ).length;
  const isGiftCard = orderItems?.filter(
    (item) => item.category === "Gift Card"
  ).length;

  const backHandler = (e) => {
    e.preventDefault();
    orderItems?.forEach((item) => {
      dispatch(removeFromCart(item.product));
    });
    history.push("/");
  };

  const toCartHandler = (e) => {
    e.preventDefault();
    history.push("/cart");
  };

  const prevHandler = (e) => {
    e.preventDefault();
    history.push("/delivery");
  };

  return (
    <Container className="theme-container">
      <Box>
        <Stack
          direction="row"
          justifyContent="left"
          alignItems="center"
          spacing={1}
          sx={{ marginBottom: "10px" }}
        >
          <Button variant="text" onClick={toCartHandler} color="inherit">
            <Typography variant="h5">
              <strong>Basket</strong>
            </Typography>
          </Button>
          <ChevronRightIcon />
          <Button variant="text" onClick={prevHandler} color="inherit">
            <Typography variant="h5">
              <strong>Delivery</strong>
            </Typography>
          </Button>
          <ChevronRightIcon />
          <Button variant="text" color="primary">
            <Typography variant="h5">
              <strong>Checkout</strong>
            </Typography>
          </Button>
        </Stack>

        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Paper>
              <Typography
                variant="h5"
                sx={{ textAlign: "center", marginBottom: 1 }}
              >
                <strong>Order preview</strong>
              </Typography>
              <Stack direction="column" spacing={2} sx={{ paddingY: 2 }}>
                {orderItems?.map(
                  (item, index) =>
                    !item.extra && (
                      <CheckoutTheme key={index} item={item} extra={false} />
                    )
                )}
                {orderItems?.map(
                  (item, index) =>
                    item.extra && (
                      <CheckoutTheme key={index} item={item} extra={true} />
                    )
                )}
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={5}>
            <Stack direction="column" spacing={3}>
              <Box sx={{ paddingY: 2, paddingX: 3, boxShadow: 2 }}>
                <Stack direction="column">
                  <Typography variant="h6">
                    <strong>Recipient</strong>
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <div className="circleIcon">
                      <PersonOutlineOutlinedIcon />
                    </div>
                    <Stack direction="column">
                      <Typography variant="body1">
                        <strong>{shippingAddress?.name}</strong>
                      </Typography>
                      <Typography variant="body2">
                        {shippingAddress?.street_address},{" "}
                        {shippingAddress?.city}, {shippingAddress?.state}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
              <Box sx={{ paddingY: 2, paddingX: 3, boxShadow: 2 }}>
                <Stack direction="column" spacing={2}>
                  <Typography variant="h6">
                    <strong>Order Summary</strong>
                  </Typography>
                  {isGreetingCard > 0 ? (
                    <>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body1">
                          Greeeting Cards:
                        </Typography>
                        <Typography variant="body1">
                          {postageFee > 0
                            ? `£ ${cardPrice?.toFixed(2)}`
                            : "FREE"}
                        </Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body1">Postage Fee:</Typography>
                        <Typography variant="body1">
                          {postageFee > 0
                            ? `£ ${postageFee?.toFixed(2)}`
                            : "FREE"}
                        </Typography>
                      </Stack>
                    </>
                  ) : null}

                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body1">Suggested Gifts:</Typography>
                    <Typography variant="body1">
                      £ {giftPrice?.toFixed(2)}
                    </Typography>
                  </Stack>

                  {isGiftCard ? (
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body1">Gift-Cards Fee:</Typography>
                      <Typography variant="body1">
                        £ {giftCardFee?.toFixed(2)}
                      </Typography>
                    </Stack>
                  ) : null}
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body1">Delivery Cost:</Typography>
                    <Typography variant="body1">
                      £ {giftShipping?.toFixed(2)}
                    </Typography>
                  </Stack>
                  <Divider />
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      Total Price:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      £ {totalPrice?.toFixed(2)}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
              <Box sx={{ paddingY: 2, paddingX: 3, boxShadow: 2 }}>
                <Stack direction="column" spacing={2}>
                  {totalPrice > 0 ? (
                    <>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="h6">
                          <strong>Payment</strong>
                        </Typography>
                        {isPaid || paymentStatus ? (
                          <Chip label="Paid" color="success" />
                        ) : (
                          <Chip label="Unpaid" color="default" />
                        )}
                      </Stack>
                      {isPaid || paymentStatus ? (
                        <Button
                          variant="contained"
                          onClick={backHandler}
                          sx={{ borderRadius: "10px" }}
                        >
                          <span>To store</span>
                        </Button>
                      ) : (
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-around"
                        >
                          <Button
                            variant="outlined"
                            color="inherit"
                            size="small"
                            onClick={() => handleOpen(id)}
                            sx={{ borderRadius: "25px" }}
                          >
                            <span>Cancel</span>
                          </Button>
                          <Stripe
                            stripeKey="pk_test_51OBq9BDjEJ7n9NzlHgm82zqRwIwD9AxFNkWz4fZmk3tQ28wKn7liE9C3WstD4GFtNoCdLydeK5mMChKZMCiOnR1G003cENyTSN"
                            token={tokenHandler}
                            label={`PAY (£ ${totalPrice})`}
                            name="Stripe Pay"
                            email={userInfo?.email}
                            amount={totalPrice * 100}
                            currency="GBP"
                          />
                        </Stack>
                      )}
                    </>
                  ) : (
                    <>
                      <Stack
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                      >
                        <Typography variant="h6">
                          <strong>Free Cards</strong>
                        </Typography>
                        <Typography>
                          Stiil left <strong>{userData?.freeCards}</strong> this
                          month
                        </Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-around">
                        <Button
                          variant="outlined"
                          color="inherit"
                          onClick={() => handleOpen(id)}
                          sx={{ borderRadius: "25px" }}
                        >
                          <span>Cancel</span>
                        </Button>
                        {isPaid ? (
                          <Button
                            variant="contained"
                            onClick={(e) => {
                              backHandler(e);
                            }}
                            sx={{ borderRadius: "25px" }}
                          >
                            <span>To store</span>
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            onClick={(e) => {
                              updateHandler();
                              updateUserHandler();
                              freePay();
                              backHandler(e);
                            }}
                            sx={{ borderRadius: "25px" }}
                          >
                            <span>Checkout</span>
                          </Button>
                        )}
                      </Stack>
                    </>
                  )}
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <WithdrawModal
        id={selectedID}
        userID={userInfo?._id}
        open={open}
        closeFcn={handleClose}
        deleteFcn={deleteOrder}
      />
    </Container>
  );
}
