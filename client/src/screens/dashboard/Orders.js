import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Box,
  Stack,
  Paper,
  Typography,
  Alert,
  AlertTitle,
} from "@mui/material";

import OrdersTable from "../../components/admin/OrdersTable";

import { listOrders } from "../../store/actions/orderActions";

const Orders = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState();
  const [filterItem, setFilterItem] = useState("All");
  const { orders, error } = useSelector((state) => state.orderList);

  const searchResult = keyword
    ? orders.filter(
        (order) =>
          order.orderId.includes(keyword) || order.user.email.includes(keyword)
      )
    : orders;

  const filteredOrders =
    filterItem !== "All"
      ? searchResult.filter((item) => item.status === filterItem)
      : searchResult;

  const all_No = orders?.length;
  const unpro_No = orders?.filter(
    (item) => item.status === "Unprocessed"
  ).length;

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch, history]);

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
          <Typography variant="h4">
            <strong>Orders</strong>
          </Typography>
          {error ? (
            <Box sx={{ paddingTop: "2%", paddingX: "2%" }}>
              <Alert severity="error">
                <AlertTitle>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Error
                  </Typography>
                </AlertTitle>
                <Typography variant="body1">
                  Excuse me. Your authorized token expired. Please log in again.
                </Typography>
              </Alert>
            </Box>
          ) : (
            <Paper
              sx={{
                width: "100%",
                paddingX: "1%",
                paddingY: "1%",
              }}
            >
              <OrdersTable
                items={filteredOrders}
                keyword={keyword}
                setKeyword={setKeyword}
                filterItem={filterItem}
                setFilterItem={setFilterItem}
                all_No={all_No}
                unpro_No={unpro_No}
              />
            </Paper>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default Orders;
