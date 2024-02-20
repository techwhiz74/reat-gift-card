import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  Container,
  Box,
  Stack,
  Typography,
  Alert,
  AlertTitle,
  Divider,
  Chip,
  useMediaQuery,
} from "@mui/material";

import MyOrderTheme from "../../components/account/MyOrderTheme";
import Paginate from "../../components/Paginate";

import { listMyOrders } from "../../store/actions/orderActions";
import { getUserDetail } from "../../store/actions/userActions";

const OrderPanel = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 576px");

  const keyword = match ? match.params.keyword : "";
  const pageNumber = match ? match.params.pageNumber : 1;

  const { pages, page } = useSelector((state) => state.orderListMy.orders);
  const { loading, error } = useSelector((state) => state.orderListMy);
  const { success: deleteSuccess } = useSelector((state) => state.orderDelete);
  const { userInfo } = useSelector((state) => state.userLogin);

  const [formData, setFormData] = useState([]);

  const getOrderDetail = useCallback(() => {
    dispatch(listMyOrders(keyword, pageNumber))
      .then((res) => {
        setFormData(res.data.orders);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch, keyword, pageNumber]);

  useEffect(() => {
    getOrderDetail();
  }, [history, getOrderDetail, deleteSuccess]);

  const [userData, setUserData] = useState({});

  const getUserData = useCallback(
    (id) => {
      dispatch(getUserDetail(id))
        .then((res) => {
          if (res.data) {
            setUserData((prevData) => ({
              ...prevData,
              _id: res.data._id,
              freeCards: res.data.freeCards,
              orders: res.data.orders,
            }));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [dispatch]
  );

  useEffect(() => {
    if (userInfo) {
      getUserData(userInfo._id);
    } else {
      history.push("/login");
    }
  }, [userInfo, getUserData]);

  return (
    <Container className="account_panel">
      {error ? (
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
        <Box className="create_panel">
          {formData && formData.length > 0 ? (
            <>
              {formData.map((orderData, index) => (
                <Box
                  key={index}
                  sx={{ boxShadow: 2, paddingX: "3%", paddingY: "2%" }}
                >
                  <Stack
                    direction={isMobile ? "column" : "row"}
                    justifyContent="space-between"
                    alignItems={isMobile ? "stretch" : "flex-end"}
                    spacing={1}
                  >
                    <div>
                      <Typography variant="h5">
                        <strong>
                          Greeting Cards to {orderData.shippingAddress.name}
                        </strong>
                      </Typography>
                      <Typography variant="body1">
                        {orderData.shippingAddress?.street_address},{" "}
                        {orderData.shippingAddress?.city},{" "}
                        {orderData.shippingAddress?.state}
                      </Typography>
                    </div>

                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      spacing={2}
                    >
                      {orderData.isPaid ? (
                        orderData.totalPrice > 0 ? (
                          <Chip label="Paid" color="success" />
                        ) : (
                          <Chip label="Free" color="secondary" />
                        )
                      ) : (
                        <Chip label="Unpaid" color="default" />
                      )}

                      <Chip
                        label={orderData.status}
                        color={
                          orderData.status === "Unprocessed"
                            ? "default"
                            : "success"
                        }
                      />
                    </Stack>
                  </Stack>

                  <Divider sx={{ marginTop: 2 }} />
                  <MyOrderTheme
                    key={index}
                    items={orderData.orderItems}
                    orderData={orderData}
                  />
                </Box>
              ))}
              <Paginate
                pages={pages}
                page={parseInt(page)}
                type="myorder"
                keyword={keyword ? keyword : ""}
              />
            </>
          ) : loading ? null : (
            <Box sx={{ paddingTop: "2%", paddingX: "5%" }}>
              <Alert severity="info">
                <Typography variant="body1">
                  No order placed yet. Please buy your first FREE-CARD!
                </Typography>
              </Alert>
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
};

export default OrderPanel;
