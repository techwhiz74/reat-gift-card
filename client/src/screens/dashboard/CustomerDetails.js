import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Grid,
  TextField,
  Button,
  Switch,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import OrderHistoryTable from "../../components/admin/dashboard/OrderHistoryTable";

import {
  getUserDetail,
  updateUser,
  register,
  logout,
} from "../../store/actions/userActions";
import { listOrders } from "../../store/actions/orderActions";

export default function CustomerDetails(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 576px");
  const { id } = useParams();
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    email: "",
    password: "user123",
    isAdmin: false,
    freeCards: "2",
    spent: "0",
    orders: "0",
    createdAt: "",
  });

  const getCustomerDetail = useCallback(
    (id) => {
      dispatch(getUserDetail(id)).then((res) => {
        if (res.data) {
          setFormData({
            _id: res.data._id,
            name: res.data.name,
            email: res.data.email,
            isAdmin: res.data.isAdmin,
            freeCards: res.data.freeCards,
            spent: res.data.spent,
            orders: res.data.orders,
            createdAt: res.data.createdAt,
          });
        } else {
          dispatch(logout());
        }
      });
    },
    [dispatch]
  );

  useEffect(() => {
    if (props.method !== "Add") {
      getCustomerDetail(id);
    }
  }, [id, history, getCustomerDetail, props.method]);

  function onReturn(e) {
    e.preventDefault();
    history.push("/admin/customers");
  }

  const onChange = (e) => {
    const { name, value } = e.target;

    if (
      (name === "spent" || name === "freeCards" || name === "orders") &&
      value >= 0
    ) {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    } else if (name !== "spent" && name !== "freeCards" && name !== "orders") {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSwitch = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      isAdmin: !prevData.isAdmin,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (props.method === "Add") {
      dispatch(
        register(
          formData.name,
          formData.email,
          formData.password,
          formData.freeCards,
          formData.spent,
          formData.orders
        )
      );
    } else {
      dispatch(updateUser(formData));
    }
    history.push("/admin/customers");
  };

  // For Order History
  const { orders } = useSelector((state) => state.orderList);
  const myOrders =
    orders.length > 0
      ? orders.filter((order) => order.user?._id === formData?._id)
      : [];

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

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
            {props.method} Customer {props.method ? "" : "Details"}
          </strong>
        </Typography>
      </Stack>
      <form onSubmit={submitHandler}>
        <Box sx={{ width: "100%", marginTop: "20px" }}>
          <Grid container spacing={4} className="create_panel">
            {isMobile ? null : <Grid item xs={0} sm={0} md={0} lg={1}></Grid>}
            <Grid item xs={12} sm={12} md={5} lg={4}>
              <Stack direction="column" alignItems="center" spacing={5}>
                <TextField
                  label="Customer Name"
                  variant="standard"
                  name="name"
                  type="name"
                  fullWidth
                  required
                  value={formData.name}
                  InputProps={{
                    readOnly: props.method ? false : true,
                  }}
                  placeholder="Customer Name"
                  onChange={(e) => onChange(e)}
                />
                <TextField
                  label="Customer Email"
                  variant="standard"
                  name="email"
                  type="email"
                  fullWidth
                  required
                  value={formData.email}
                  InputProps={{
                    readOnly: props.method ? false : true,
                  }}
                  placeholder="Customer Email"
                  onChange={(e) => onChange(e)}
                />
                {props.method === "Add" ? (
                  <TextField
                    label="Password"
                    variant="standard"
                    name="password"
                    type="text"
                    fullWidth
                    required
                    value={formData.password}
                    placeholder="Customer Email"
                    onChange={(e) => onChange(e)}
                  />
                ) : (
                  <TextField
                    label="Created At"
                    variant="standard"
                    name="createAt"
                    type="type"
                    fullWidth
                    value={moment(formData.createdAt).format(
                      "DD/MM/YYYY hh:mm"
                    )}
                    InputProps={{ readOnly: true }}
                  />
                )}

                <div>
                  <Button
                    variant="outlined"
                    sx={{ borderRadius: "25px" }}
                    color={formData.isAdmin ? "success" : "primary"}
                    startIcon={
                      formData.isAdmin ? (
                        <VerifiedUserIcon color="success" />
                      ) : (
                        <AccountCircleIcon />
                      )
                    }
                  >
                    <span>{formData.isAdmin ? "Admin" : "Customer"}</span>
                  </Button>
                  <Switch checked={formData.isAdmin} onChange={handleSwitch} />
                </div>
              </Stack>
            </Grid>
            <Grid item xs={0} sm={0} md={1} lg={1}></Grid>
            <Grid item xs={12} sm={12} md={5} lg={4}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="stretch"
                spacing={4}
              >
                <TextField
                  label="Free Cards"
                  variant="outlined"
                  name="freeCards"
                  type="number"
                  value={formData.freeCards}
                  InputProps={{
                    readOnly: props.method ? false : true,
                  }}
                  onChange={(e) => onChange(e)}
                />
                <TextField
                  label="Spent"
                  variant="outlined"
                  name="spent"
                  type="number"
                  value={parseFloat(formData.spent).toFixed(2)}
                  InputProps={{
                    readOnly: props.method ? false : true,
                    startAdornment: (
                      <InputAdornment position="start">£</InputAdornment>
                    ),
                  }}
                  onChange={(e) => onChange(e)}
                />
                <TextField
                  label="Orders"
                  variant="outlined"
                  name="orders"
                  type="number"
                  value={formData.orders}
                  InputProps={{
                    readOnly: props.method ? false : true,
                  }}
                  onChange={(e) => onChange(e)}
                />
                {props.method && (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="medium"
                    sx={{ borderRadius: "10px" }}
                    startIcon={<SaveIcon />}
                  >
                    Save
                  </Button>
                )}
              </Stack>
            </Grid>
            <Grid item xs={0} sm={0} md={1} lg={2}></Grid>
          </Grid>

          {myOrders.length > 0 ? (
            <Stack
              alignItems="center"
              spacing={2}
              sx={{ marginTop: 3, paddingX: 10 }}
            >
              <Typography variant="h5">
                <strong>Order History</strong>
              </Typography>
              <OrderHistoryTable orders={myOrders} />
            </Stack>
          ) : null}
        </Box>
      </form>
    </Box>
  );
}
