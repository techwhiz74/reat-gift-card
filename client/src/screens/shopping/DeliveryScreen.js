import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Container,
  Button,
  Typography,
  Box,
  Stack,
  InputBase,
  IconButton,
  Divider,
  Alert,
  AlertTitle,
  Snackbar,
  useMediaQuery,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SearchIcon from "@mui/icons-material/Search";

import DeliveryAddress from "../../components/shopping/DeliveryAddress";

import colors from "../../components/constant/Colors";

import {
  listAddressDetail,
  listAddresses,
} from "../../store/actions/addressActions";
import { createOrder } from "../../store/actions/orderActions";
import { updateUser, getUserDetail } from "../../store/actions/userActions";

export default function DeliveryScreen() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 576px");
  const [open, setOpen] = useState();

  const { userInfo } = useSelector((state) => state.userLogin);

  const [keyword, setKeyword] = useState("");
  const [filteredAddresses, setFilteredAddresses] = useState([]);
  const [addressData, setAddressData] = useState();
  const [userData, setUserData] = useState({});
  const [selectedId, setSelectedId] = useState();

  const { addresses } = useSelector((state) => state.addressList.addresses);
  const { error: addressListError } = useSelector((state) => state.addressList);
  const cart = useSelector((state) => state.cart);
  const { success: successDelete } = useSelector(
    (state) => state.addressDelete
  );
  const { success: successCreate } = useSelector(
    (state) => state.addressCreate
  );

  // Address list and selected delivery address detail
  const getAddressDetail = useCallback(
    (id) => {
      dispatch(listAddressDetail(id)).then((res) => {
        if (res && res.data) {
          setAddressData({
            _id: id,
            name: res.data.name,
            street_address: res.data.street_address,
            city: res.data.city,
            state: res.data.state,
            zip_code: res.data.zip_code,
          });
        }
      });
    },
    [dispatch]
  );
  const selectHandler = (id) => {
    getAddressDetail(id);
    setSelectedId(id);
  };

  // Address search
  const searchHandler = (keyword) => {
    if (keyword) {
      const filtered = addresses.filter((item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredAddresses(filtered);
    } else {
      setFilteredAddresses(addresses);
    }
  };

  // Update user when the order created. (Orders + 1)
  const getUserData = useCallback(
    (id) => {
      dispatch(getUserDetail(id))
        .then((res) => {
          if (res.data) {
            setUserData({
              _id: res.data._id,
              orders: res.data.orders + 1,
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    },
    [dispatch]
  );

  useEffect(() => {
    if (userInfo) {
      getUserData(userInfo._id);
      dispatch(listAddresses(userInfo._id));
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, getUserData]);

  // Create order
  cart.shippingAddress = addressData;
  cart.paymentMethod = "Stripe";

  const placeOrderHandler = async () => {
    if (addressData) {
      const orderResponse = await dispatch(
        createOrder({
          orderId: Date.now().toString(),
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          cardPrice: cart.cardPrice,
          postageFee: cart.postageFee,
          giftPrice: cart.giftPrice,
          giftShipping: cart.giftShipping,
          giftCardFee: cart.giftCardFee,
          deliveryFee: cart.deliveryFee,
          totalPrice: cart.totalPrice,
        })
      );
      if (orderResponse) {
        await dispatch(updateUser(userData));
        history.push(`/checkout/${orderResponse.data._id}`);
      }
    } else {
      setOpen(true);
    }
  };

  const toCartHandler = (e) => {
    e.preventDefault();
    history.push("/cart");
  };

  const addHandler = (e) => {
    e.preventDefault();
    history.push("/newaddress");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Container className="theme-container">
      {addressListError ? (
        <Box sx={{ paddingTop: "2%", paddingX: "5%" }}>
          <Alert severity="error">
            <AlertTitle>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Error
              </Typography>
            </AlertTitle>
            <Typography variant="body1">
              Excuse me. Your authorized token expired. Please sign in again.
            </Typography>
          </Alert>
        </Box>
      ) : (
        <Box>
          <Stack
            direction="row"
            justifyContent="left"
            alignItems="center"
            sx={{ marginBottom: "10px" }}
          >
            <Button
              variant="text"
              color="inherit"
              startIcon={<ChevronLeftIcon />}
              sx={{ borderRadius: "10px" }}
              onClick={toCartHandler}
            >
              <Typography variant="h6">
                <strong>Basket</strong>
              </Typography>
            </Button>
          </Stack>

          <Box
            sx={{
              paddingY: 1,
              width: isMobile ? "100%" : "55%",
              margin: "auto",
            }}
          >
            <Typography variant="h5">
              <strong>Delivery Address</strong>
            </Typography>

            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                searchHandler(keyword);
              }}
              className="searchPanel"
              style={{
                borderRadius: "25px",
                backgroundColor: colors.lightblue,
                color: colors.blue,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search address..."
                size="small"
                onChange={(e) => {
                  setKeyword(e.target.value);
                  searchHandler(e.target.value);
                }}
                inputProps={{ "aria-label": "search google maps" }}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton
                type="submit"
                sx={{ p: "10px", color: colors.primarygreen }}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </Box>

            <Button
              variant="outlined"
              fullWidth
              size={isMobile ? "small" : "medium"}
              onClick={(e) => addHandler(e)}
              sx={{ borderRadius: "25px", width: "100%", marginBottom: 2 }}
            >
              <span>Add Address</span>
            </Button>

            <Box
              sx={{
                overflowY: "auto",
                height: `${240 * addresses?.length}px`,
                maxHeight: isMobile ? "240px" : "360px",
              }}
            >
              {keyword
                ? filteredAddresses.map((item, index) => (
                    <DeliveryAddress
                      key={index}
                      selectHandler={selectHandler}
                      address={item}
                      selectedId={selectedId}
                    />
                  ))
                : addresses?.map((item, index) => (
                    <DeliveryAddress
                      key={index}
                      selectHandler={selectHandler}
                      address={item}
                      selectedId={selectedId}
                    />
                  ))}
            </Box>

            <Stack alignItems="center" spacing={2} sx={{ marginTop: 3 }}>
              <Button
                variant="contained"
                fullWidth
                size={isMobile ? "small" : "medium"}
                sx={{ borderRadius: "25px", width: "100%" }}
                onClick={placeOrderHandler}
              >
                <span>Place Order</span>
              </Button>
            </Stack>
          </Box>

          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "350px" }}
            >
              Select delivery address.
            </Alert>
          </Snackbar>
        </Box>
      )}
    </Container>
  );
}
