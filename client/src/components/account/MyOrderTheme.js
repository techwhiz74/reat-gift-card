import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

import {
  useMediaQuery,
  CardMedia,
  Stack,
  Step,
  Stepper,
  StepLabel,
  Button,
  Card,
  Box,
} from "@mui/material";
import colors from "../../components/constant/Colors";
import WithdrawModal from "../../components/shopping/WithdrawModal";

import { deleteOrder } from "../../store/actions/orderActions";

export default function MyOrderTheme({ items, orderData }) {
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width: 576px");

  const [selectedUrls, setSelectedUrls] = useState(
    Array(items.length).fill("")
  );

  const selectHandler = (imgUrl, index) => {
    const newSelectedUrls = [...selectedUrls];
    newSelectedUrls[index] = imgUrl;
    setSelectedUrls(newSelectedUrls);
  };

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  // For Stepper
  var activeStep = 1;
  if (orderData.paidAt) {
    activeStep = 2;
  }
  if (orderData.deliveredAt) {
    activeStep = 3;
  }

  const createdDate = moment(orderData.createdAt).format("DD/MM/YYYY");
  const paidDate = orderData.paidAt
    ? moment(orderData.paidAt).format("DD/MM/YYYY")
    : "";
  const shippedDate = orderData.deliveredAt
    ? moment(orderData.deliveredAt).format("DD/MM/YYYY")
    : "";
  const expectedDate = orderData.deliveredAt
    ? moment(orderData.deliveredAt).add(1, "days").format("DD/MM/YYYY")
    : "";
  const steps = [
    `Created ${createdDate}`,
    `Paid At ${paidDate}`,
    `Shipped ${shippedDate}`,
    `Expected ${expectedDate}`,
  ];
  const toCheckHandler = (e, id) => {
    e.preventDefault();
    history.push(`/checkout/${id}`);
  };

  // Withdraw modal
  const [open, setOpen] = useState(false);
  const [selectedID, setSelectedID] = useState();
  const handleOpen = (id) => {
    setOpen(true);
    setSelectedID(id);
  };

  const handleClose = () => setOpen(false);

  const cardNumber = items.filter((item) => item.extra === false).length;

  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      sx={{ display: "flex", justifyContent: "center" }}
      spacing={isMobile ? 0 : 5}
    >
      <Stack direction="column" sx={{ width: isMobile ? "100%" : "50%" }}>
        {items.map((item, index) =>
          item.extra ? null : (
            <Stack
              key={index}
              direction={isMobile ? "column" : "row"}
              alignItems="center"
            >
              <CardMedia
                sx={{
                  width: "90%",
                  margin: "5%",
                  aspectRatio: "100/140",
                  border: "solid",
                  borderWidth: "5px",
                  borderColor: "white",
                  boxShadow: 2,
                }}
                image={
                  selectedUrls[index]
                    ? selectedUrls[index]
                    : item.frontUrl
                    ? item.frontUrl
                    : item.imageUrl
                }
                title="orderItem"
              />
              <Stack
                direction={isMobile ? "row" : "column"}
                sx={{ width: isMobile ? "40%" : "20%", marginBottom: "5%" }}
                spacing={5}
              >
                <CardMedia
                  sx={{
                    width: "100%",
                    aspectRatio: "100/140",
                    border: "solid",
                    borderWidth: "1px",
                    borderColor:
                      selectedUrls[index] === item.frontUrl ||
                      selectedUrls[index] === item.imageUrl ||
                      !selectedUrls[index]
                        ? "#007373"
                        : "white",
                    boxShadow: 2,
                  }}
                  image={item.frontUrl ? item.frontUrl : item.imageUrl}
                  onClick={() =>
                    selectHandler(
                      item.frontUrl ? item.frontUrl : item.imageUrl,
                      index
                    )
                  }
                />
                <CardMedia
                  sx={{
                    width: "100%",
                    aspectRatio: "100/140",
                    border: "solid",
                    borderWidth: "1px",
                    borderColor:
                      (selectedUrls[index] &&
                        selectedUrls[index] === item.middleUrl) ||
                      selectedUrls[index] === item.preSMSUrl
                        ? "#007373"
                        : "white",
                    boxShadow: 2,
                  }}
                  image={item.middleUrl || item.preSMSUrl}
                  onClick={() =>
                    selectHandler(
                      item.middleUrl ? item.middleUrl : item.preSMSUrl,
                      index
                    )
                  }
                />
              </Stack>
            </Stack>
          )
        )}
        {isMobile || cardNumber === 0 ? null : (
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        )}
      </Stack>
      <Stack
        direction="column"
        alignItems="center"
        spacing={2}
        sx={{ width: isMobile ? "100%" : "50%", paddingY: 2 }}
      >
        <Stack direction="row" alignItems="center">
          {items.map((item, index) =>
            !item.extra ? null : (
              <Card
                key={index}
                sx={{ margin: "5%", width: "90%", maxWidth: "220px" }}
              >
                <Box
                  sx={{
                    aspectRatio: "100/100",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#F5F5F5",
                  }}
                >
                  <img
                    src={item.frontUrl || item.imageUrl}
                    alt="card-filter"
                    style={{
                      width: "100%",
                      height: item.category === "Gift Card" ? "auto" : "100%",
                      borderRadius: "10px",
                    }}
                  />
                </Box>
              </Card>
            )
          )}
        </Stack>

        {isMobile || cardNumber === 0 ? (
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={index} sx={{ color: "red" }}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        ) : null}

        {orderData.status === "Unprocessed" ? (
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => handleOpen(orderData._id)}
            size="small"
            sx={{ borderRadius: "25px", width: "90%", margin: "5%" }}
          >
            <span>Withdraw</span>
          </Button>
        ) : null}
        <Button
          variant="outlined"
          onClick={(e) => toCheckHandler(e, orderData._id)}
          size="small"
          sx={{ borderRadius: "25px", width: "90%", marginBottom: 5 }}
        >
          <span>To Checkout</span>
        </Button>
      </Stack>

      <WithdrawModal
        id={selectedID}
        open={open}
        userID={userInfo?._id}
        closeFcn={handleClose}
        deleteFcn={deleteOrder}
      />
    </Stack>
  );
}
