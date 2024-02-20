import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Box,
  useMediaQuery,
  Grid,
  Typography,
  Alert,
  AlertTitle,
  Stack,
} from "@mui/material";

import NewCustomers from "../../components/admin/dashboard/NewCustomers";
import AllFreeCards from "../../components/admin/dashboard/AllFreeCards";
import MonthlyRevenue from "../../components/admin/dashboard/MonthlyRevenue";
import AllOrders from "../../components/admin/dashboard/AllOrders";
import DataTable from "../../components/admin/dashboard/DataTable";
import { month_names } from "../../components/constant/CalendarMonth";

import { listUsers } from "../../store/actions/userActions";
import { listProducts } from "../../store/actions/productActions";
import { listSupplements } from "../../store/actions/supplementActions";
import { listOrders } from "../../store/actions/orderActions";

export default function Dashboard() {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 576px");

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const [newCustomers, setNewCustomers] = useState("0");
  const [totalFree, setTotalFree] = useState("0");
  const [revenue, setRevenue] = useState("0");
  const [totalOrder, setTotalOrder] = useState("0");

  const { users, error } = useSelector((state) => state.userList);
  const { orders } = useSelector((state) => state.orderList);
  const { products } = useSelector((state) => state.productList);
  const { supplements } = useSelector((state) => state.supplementList);

  const [productsList, setProductsList] = useState(products);
  const [giftsList, setGiftsList] = useState(supplements);

  const getNewCustomers = () => {
    const newUsers = getMonthlyNewUser(currentMonth, currentYear);
    setNewCustomers(newUsers);
  };

  const getAllFreeCards = () => {
    const total = users.reduce((acc, user) => {
      if (typeof user.freeCards === "number") {
        return acc + user.freeCards;
      }
      return acc;
    }, 0);

    setTotalFree(total);
  };

  const getMonthlyRevenue = () => {
    let earning = 0;
    const paidOrders = monthlyPaidOrder(currentMonth, currentYear);
    earning = paidOrders
      .reduce((total, order) => total + order.totalPrice, 0)
      .toFixed(2);
    setRevenue(earning);
  };

  const getAllOrders = () => {
    const allOrders = users.reduce((acc, user) => {
      if (typeof user.orders === "number") {
        return acc + user.orders;
      }
      return acc;
    }, 0);

    if (allOrders !== 0) {
      setTotalOrder(allOrders);
    }
  };

  // For Usage Data
  const getMonthlyNewUser = (month, year) => {
    const newUsers = users.filter((user) => {
      const registrationDate = new Date(user.createdAt);
      return (
        registrationDate.getMonth() === month &&
        registrationDate.getFullYear() === year
      );
    });
    return newUsers.length;
  };

  const monthlyPaidOrder = (month, year) =>
    orders.filter((order) => {
      const paidDate = new Date(order.paidAt);
      return paidDate.getMonth() === month && paidDate.getFullYear() === year;
    });

  const getMonthlyOrderItems = (month, year) => {
    const orderItems = monthlyPaidOrder(month, year).flatMap(
      (order) => order.orderItems
    );
    return orderItems;
  };

  const getMonthlyPaidCards = (month, year) => {
    const allPaidCards = getMonthlyOrderItems(month, year).filter(
      (item) => item.extra !== true && item.isFree === false
    );
    const paidCards = allPaidCards.length;
    return paidCards;
  };
  const getMonthlyFreeCards = (month, year) => {
    const allFreeCards = getMonthlyOrderItems(month, year).filter(
      (item) => item.extra !== true && item.isFree === true
    );
    const freeCards = allFreeCards.length;
    return freeCards;
  };
  const getTopCardsSold = () => {
    const topCardNames = productsList
      .slice(0, 10)
      .map((product) => product.name)
      .concat(<strong>Total</strong>);
    const topCardSales = productsList
      .slice(0, 10)
      .map((product) => product.sales);
    const sumOfTopCardSales = topCardSales.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    topCardSales.push(<strong>{sumOfTopCardSales}</strong>);
    return { name: topCardNames, sales: topCardSales };
  };
  const getMonthlyGiftSold = (month, year) => {
    const giftSold = getMonthlyOrderItems(month, year)
      .filter((item) => item.extra === true && item.category !== "Gift Card")
      .reduce((total, item) => total + item.qty, 0);
    return giftSold;
  };
  const getMonthlyGiftRevenue = (month, year) => {
    const giftRevenue = monthlyPaidOrder(month, year)
      .map((order) => order.giftPrice)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const revenueInPound = "£ " + giftRevenue.toFixed(2);
    return revenueInPound;
  };
  const getTopPopularGifts = () => {
    const topGiftNames = giftsList
      .slice(0, 10)
      .map((gift) => gift.name)
      .concat(<strong>Total</strong>);
    const topGiftSales = giftsList.slice(0, 10).map((gift) => gift.sales);
    const sumOfTopGIftSales = topGiftSales.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    topGiftSales.push(<strong>{sumOfTopGIftSales}</strong>);
    return { name: topGiftNames, sales: topGiftSales };
  };
  const getMonthlyGiftCardSold = (month, year) => {
    const giftCardSold = getMonthlyOrderItems(month, year)
      .filter((item) => item.extra === true && item.category === "Gift Card")
      .reduce((total, item) => total + item.qty, 0);
    return giftCardSold;
  };
  const getMonthlyGiftCardFee = (month, year) => {
    const giftCardFee = monthlyPaidOrder(month, year)
      .map((order) => order.giftCardFee)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const feeInPound = "£" + giftCardFee.toFixed(2);
    return feeInPound;
  };

  const monthlyNewUsers = [];
  const monthlyFreeCards = [];
  const monthlyPaidCards = [];
  const monthlyGiftSold = [];
  const monthlyGiftRevenue = [];
  const monthlyGiftCardSold = [];
  const monthlyGiftCardFee = [];
  for (let month = 0; month < 12; month++) {
    monthlyNewUsers.push(getMonthlyNewUser(month, currentYear));
    monthlyFreeCards.push(getMonthlyFreeCards(month, currentYear));
    monthlyPaidCards.push(getMonthlyPaidCards(month, currentYear));
    monthlyGiftSold.push(getMonthlyGiftSold(month, currentYear));
    monthlyGiftRevenue.push(getMonthlyGiftRevenue(month, currentYear));
    monthlyGiftCardSold.push(getMonthlyGiftCardSold(month, currentYear));
    monthlyGiftCardFee.push(getMonthlyGiftCardFee(month, currentYear));
  }
  const topCardsSold = getTopCardsSold();
  const topPopularGiftSold = getTopPopularGifts();

  useEffect(() => {
    const updateData = () => {
      dispatch(listUsers());
      dispatch(listProducts());
      dispatch(listOrders());
      dispatch(listSupplements());
    };
    // Initial data fetch
    updateData();
    const interval = setInterval(updateData, 60000); // 1 minute in milliseconds
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [dispatch]);

  useEffect(() => {
    getNewCustomers();
    getAllFreeCards();
    getMonthlyRevenue();
    getAllOrders();
    const sortedProducts = [...products].sort((a, b) => b.sales - a.sales);
    setProductsList(sortedProducts);
    const sortedGifts = [...supplements].sort((a, b) => b.sales - a.sales);
    setGiftsList(sortedGifts);
  }, [users, products, supplements, orders]);

  return (
    <Box className="admin-container">
      <Box
        sx={{
          width: "100%",
          paddingX: "1%",
          paddingY: "1%",
        }}
      >
        <Typography variant="h4">
          <strong>Dashboard</strong>
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
          <Box sx={{ width: "100%", marginTop: "20px" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} lg={3}>
                <NewCustomers value={newCustomers} />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <AllFreeCards value={totalFree} />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <MonthlyRevenue value={revenue} />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <AllOrders value={totalOrder} />
              </Grid>
            </Grid>

            <Stack spacing={2} direction="column" sx={{ marginTop: "20px" }}>
              <Typography variant="h4">
                <strong>Usage Data</strong>
              </Typography>
              <Stack direction={isMobile ? "column" : "row"} spacing={3}>
                <DataTable
                  title="New Customers Monthly"
                  name={month_names}
                  value={monthlyNewUsers}
                />
                <DataTable
                  title="Free Cards Sent Per Month"
                  name={month_names}
                  value={monthlyFreeCards}
                />
                <DataTable
                  title="Paid Cards Sent Per Month"
                  name={month_names}
                  value={monthlyPaidCards}
                />
                <DataTable
                  title="Top 10 Cards Sold"
                  name={topCardsSold.name}
                  value={topCardsSold.sales}
                />
              </Stack>

              <Typography variant="h4">
                <strong>Recommended Gifts Data</strong>
              </Typography>
              <Stack
                direction={isMobile ? "column" : "row"}
                spacing={3}
                sx={{ width: isMobile ? "100%" : "75%" }}
              >
                <DataTable
                  title="Number of Gifts Sold"
                  name={month_names}
                  value={monthlyGiftSold}
                />
                <DataTable
                  title="Gifts Monthly Revenue in £"
                  name={month_names}
                  value={monthlyGiftRevenue}
                />
                <DataTable
                  title="Most Popular Gifts"
                  name={topPopularGiftSold.name}
                  value={topPopularGiftSold.sales}
                />
              </Stack>

              <Typography variant="h4">
                <strong>Gift-Card Data</strong>
              </Typography>
              <Stack
                direction={isMobile ? "column" : "row"}
                spacing={3}
                sx={{ width: isMobile ? "100%" : "50%" }}
              >
                <DataTable
                  title="Number of Gift-Cards Sold"
                  name={month_names}
                  value={monthlyGiftCardSold}
                />
                <DataTable
                  title="Gift Card Fees Total in £"
                  name={month_names}
                  value={monthlyGiftCardFee}
                />
              </Stack>
            </Stack>
          </Box>
        )}
      </Box>
    </Box>
  );
}
