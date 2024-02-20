import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  Paper,
  Box,
  Stack,
  Typography,
  IconButton,
  Grid,
  Button,
  Chip,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DoneIcon from "@mui/icons-material/Done";
import SaveIcon from "@mui/icons-material/Save";
import { PDFDownloadLink } from "@react-pdf/renderer";

import CheckoutTheme from "../../components/shopping/CheckoutTheme";
import PdfOrderReport from "./PdfOrderReport";

import {
  getOrderDetails,
  updateOrderStatus,
} from "../../store/actions/orderActions";
import { shippedConfirmMail } from "../../store/actions/userActions";

export default function OrderDetails(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    _id: "",
    user: "",
    shippingAddress: "",
    cardPrice: 0,
    postageFee: 0,
    giftPrice: 0,
    giftShipping: 0,
    giftCardFee: 0,
    deliveryFee: 0,
    totalPrice: 0,
    isPaid: false,
    status: "Unprocessed",
    ordersItems: "[]",
    paymentMethod: "",
    createdAt: "",
  });

  const getOrderDetail = useCallback(
    (id) => {
      dispatch(getOrderDetails(id)).then((res) => {
        if (res.data) {
          setFormData({
            _id: res.data._id,
            orderId: res.data.orderId,
            user: res.data.user,
            shippingAddress: res.data.shippingAddress,
            cardPrice: res.data.cardPrice,
            postageFee: res.data.postageFee,
            giftPrice: res.data.giftPrice,
            giftShipping: res.data.giftShipping,
            giftCardFee: res.data.giftCardFee,
            deliveryFee: res.data.deliveryFee,
            totalPrice: res.data.totalPrice,
            isPaid: res.data.isPaid,
            status: res.data.status,
            orderItems: res.data.orderItems,
            paymentMethod: res.data.paymentMethod,
            createdAt: res.data.createdAt,
          });
        }
      });
    },
    [dispatch]
  );

  useEffect(() => {
    getOrderDetail(id);
  }, [id, history, getOrderDetail]);

  function onReturn(e) {
    e.preventDefault();
    history.goBack();
  }

  const statusHandler = () => {
    if (formData.status === "Unprocessed") {
      setFormData((prevData) => ({
        ...prevData,
        status: "Shipped",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        status: "Unprocessed",
      }));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (props.method === "Edit") {
      dispatch(updateOrderStatus(formData));
      dispatch(shippedConfirmMail(formData.user.email, formData));
    }
    history.push("/admin/orders");
  };

  return (
    <Box className="admin-container">
      <Stack
        direction="row"
        justifyContent="left"
        alignItems="center"
        spacing={2}
        sx={{ marginBottom: "10px" }}
      >
        <IconButton aria-label="goback" onClick={onReturn}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">
          <strong>
            {props.method} Order {props.method ? "Status" : "Details"}
          </strong>
        </Typography>
      </Stack>

      <form onSubmit={submitHandler}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Paper>
              <Stack
                direction="column"
                justifyContent="space-around"
                spacing={2}
                sx={{ paddingX: 5, paddingY: 2 }}
              >
                {formData.orderItems?.map(
                  (item, index) =>
                    !item.extra && (
                      <CheckoutTheme key={index} item={item} extra={false} />
                    )
                )}
                {formData.orderItems?.map(
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
                <Stack direction="column" spacing={2}>
                  <Typography variant="h6">
                    <strong>Customer Info</strong>
                  </Typography>
                  <Typography>Name: {formData.user.name}</Typography>
                  <Typography>Email: {formData.user.email}</Typography>
                </Stack>
              </Box>
              <Box sx={{ paddingY: 2, paddingX: 3, boxShadow: 2 }}>
                <Stack direction="column" spacing={2}>
                  <Typography variant="h6">
                    <strong>Delivery Address</strong>
                  </Typography>
                  <Typography>
                    Recipient: {formData.shippingAddress?.name}
                  </Typography>
                  <Typography>
                    Address: {formData.shippingAddress?.street_address},{" "}
                    {formData.shippingAddress?.city},{" "}
                    {formData.shippingAddress?.state},{" "}
                    {formData.shippingAddress.zip_code}
                  </Typography>
                </Stack>
              </Box>
              <Box sx={{ paddingY: 2, paddingX: 3, boxShadow: 2 }}>
                <Stack direction="column" spacing={2}>
                  <Typography variant="h6">
                    <strong>Order Summary</strong>
                  </Typography>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body1">Greeeting Cards:</Typography>
                    <Typography variant="body1">
                      {formData.postageFee > 0 ? (
                        `£ ${formData.cardPrice?.toFixed(2)}`
                      ) : (
                        <strong>FREE</strong>
                      )}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body1">Postage Fee:</Typography>
                    <Typography variant="body1">
                      £ {formData.postageFee?.toFixed(2)}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body1">Suggested Gifts:</Typography>
                    <Typography variant="body1">
                      £ {formData.giftPrice?.toFixed(2)}
                    </Typography>
                  </Stack>
                  {formData.giftShipping ? (
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body1">
                        Gift Shipping Cost:
                      </Typography>
                      <Typography variant="body1">
                        £ {formData.giftShipping?.toFixed(2)}
                      </Typography>
                    </Stack>
                  ) : null}
                  {formData.giftCardFee ? (
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body1">Gift-Cards Fee:</Typography>
                      <Typography variant="body1">
                        £ {formData.giftCardFee?.toFixed(2)}
                      </Typography>
                    </Stack>
                  ) : null}
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body1">Delivery:</Typography>
                    <Typography variant="body1">
                      {formData.deliveryFee > 0 ? (
                        `£ ${formData.deliveryFee?.toFixed(2)}`
                      ) : (
                        <strong>FREE</strong>
                      )}
                    </Typography>
                  </Stack>
                  <Divider />
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      Total Price:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      £ {formData.totalPrice?.toFixed(2)}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
              <Box
                sx={{
                  paddingY: 2,
                  paddingX: 3,
                  boxShadow: 2,
                  alignItems: "center",
                }}
              >
                <Stack spacing={3}>
                  <Stack
                    direction="row"
                    justifyContent={
                      !props.method && formData.status === "Shipped"
                        ? "space-between"
                        : "flex-start"
                    }
                  >
                    <Stack direction="row" spacing={2}>
                      <Typography variant="h6">
                        <strong>Status: </strong>
                      </Typography>
                      {formData.isPaid ? (
                        formData.totalPrice > 0 ? (
                          <Chip label="Paid" color="success" />
                        ) : (
                          <Chip label="Free" color="secondary" />
                        )
                      ) : (
                        <Chip label="Unpaid" color="default" />
                      )}
                      <Chip
                        label={formData.status}
                        color={
                          formData.status === "Unprocessed"
                            ? "default"
                            : "primary"
                        }
                      />
                    </Stack>

                    {!props.method && formData.status === "Shipped" ? (
                      <PDFDownloadLink
                        document={<PdfOrderReport formData={formData} />}
                        fileName={formData.createdAt + ".pdf"}
                      >
                        <Button
                          variant="contained"
                          startIcon={<PictureAsPdfIcon />}
                        >
                          <Typography variant="span">
                            <strong>Report</strong>
                          </Typography>
                        </Button>
                      </PDFDownloadLink>
                    ) : null}
                  </Stack>

                  {props.method && formData.status === "Unprocessed" ? (
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ display: props.method ? "flex" : "none" }}
                    >
                      <Stack direction="row" spacing={2}>
                        <IconButton
                          variant="outlined"
                          sx={{ borderRadius: "25px", border: "1px solid" }}
                          size="small"
                          onClick={statusHandler}
                          color={
                            formData.status === "Unprocessed"
                              ? "inherit"
                              : "primary"
                          }
                        >
                          <DoneIcon />
                        </IconButton>
                        <Button
                          variant={
                            formData.status === "Unprocessed"
                              ? "outlined"
                              : "contained"
                          }
                          disabled={formData.status === "Unprocessed"}
                          color={
                            formData.status === "Unprocessed"
                              ? "inherit"
                              : "primary"
                          }
                          sx={{ borderRadius: "25px" }}
                          size="small"
                        >
                          <span style={{ fontWeight: "normal" }}>Shipped</span>
                        </Button>
                      </Stack>

                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="medium"
                        fullWidth
                        sx={{ borderRadius: "10px", width: "40%" }}
                        startIcon={<SaveIcon />}
                      >
                        Save
                      </Button>
                    </Stack>
                  ) : null}
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
