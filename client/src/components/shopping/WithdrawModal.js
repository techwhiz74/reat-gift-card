import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal, Box, Button, Typography, Stack } from "@mui/material";

import { getOrderDetails, listOrders } from "../../store/actions/orderActions";
import {
  listProductDetail,
  updateProduct,
} from "../../store/actions/productActions";
import {
  listSupplementDetail,
  updateSupplement,
} from "../../store/actions/supplementActions";
import { updateUser, getUserDetail } from "../../store/actions/userActions";

export default function ConfirmModal(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { open, closeFcn, id, userID, deleteFcn } = props;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 320,
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    textAlign: "center",
  };

  // Update monthly free-cards number
  const { orders } = useSelector((state) => state.orderList);
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // Monthly paid my orders
  const paidMyOrders =
    orders.length > 0
      ? orders.filter((order) => {
          const createdDate = new Date(order.createdAt);
          return (
            order.user?._id === userID &&
            order.isPaid === true &&
            createdDate.getMonth() === currentMonth &&
            createdDate.getFullYear() === currentYear
          );
        })
      : [];

  // Sum of the card qty for each paidMyOrder
  const paidAllCards = paidMyOrders.map((order) =>
    order.orderItems
      ?.filter((item) => item.extra === false)
      .reduce((subTotal, element) => {
        return subTotal + element.qty;
      }, 0)
  );

  // Total qty which I get this month
  const totalQuantity = paidAllCards.reduce((total, subTotal) => {
    return total + subTotal;
  }, 0);

  // Change product & supplement data after withdraw success
  const returnProductData = useCallback(
    (id) => {
      dispatch(getOrderDetails(id)).then((res) => {
        if (res.data.isPaid) {
          res.data.orderItems.forEach((element) => {
            if (element.extra) {
              dispatch(listSupplementDetail(element.product))
                .then((result) => {
                  dispatch(
                    updateSupplement({
                      _id: result.data._id,
                      sales: result.data.sales - element.qty,
                    })
                  );
                })
                .catch((error) => {
                  console.log(error);
                });
            } else {
              dispatch(listProductDetail(element.product))
                .then((result) => {
                  dispatch(
                    updateProduct({
                      _id: result.data._id,
                      sales: result.data.sales - element.qty,
                    })
                  );
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          });

          // Cards for this order
          const cardsNum = res.data.orderItems
            .filter((item) => item.extra === false)
            .reduce((total, element) => {
              return total + element.qty;
            }, 0);
          const leftQty = totalQuantity - cardsNum;
          returnFreeCards(userID, leftQty);

          returnUserSpent(userID, res.data.totalPrice);
        }
      });
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  const returnFreeCards = useCallback(
    (id, leftQty) => {
      if (leftQty + 2 > 0) {
        dispatch(
          updateUser({
            _id: id,
            freeCards: leftQty + 2,
          })
        );
      } else {
        dispatch(
          updateUser({
            _id: id,
            freeCards: 0,
          })
        );
      }
      // dispatch(getUserDetail(id)).then((res) => {
      //   dispatch(
      //     updateUser({
      //       _id: res.data._id,
      //       freeCards: res.data.freeCards + 1,
      //     })
      //   );
      // });
    },
    [dispatch]
  );

  // Update user spent
  const returnUserSpent = useCallback(
    (id, totalPrice) => {
      dispatch(getUserDetail(id)).then((res) => {
        dispatch(
          updateUser({
            _id: res.data._id,
            spent: res.data.spent - totalPrice,
          })
        );
      });
    },
    [dispatch]
  );

  // Update user orders data after withdraw
  const returnUserOrder = useCallback(
    (id) => {
      dispatch(getUserDetail(id)).then((res) => {
        dispatch(
          updateUser({
            _id: res.data._id,
            orders: res.data.orders - 1,
          })
        );
      });
    },
    [dispatch]
  );

  const confirmHandler = (id) => {
    returnProductData(id);
    returnUserOrder(userID);
    dispatch(deleteFcn(id));
    history.push("/");
    closeFcn();
  };

  return (
    <Modal
      open={open}
      onClose={closeFcn}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ mb: 3 }}
        >
          <strong>Are you sure?</strong>
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button variant="outlined" color="primary" onClick={closeFcn}>
            <span>Cancel</span>
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => confirmHandler(id)}
          >
            <span>Withdraw</span>
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
