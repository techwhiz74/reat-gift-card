import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Box, Tab, Tabs, Container } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import { styled } from "@mui/material/styles";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";

// import ProfilePanel from "./account/ProfilePanel";
// import OrderPanel from "./account/OrderPanel";
// import AddressPanel from "./account/AddressPanel";

const AccountScreen = () => {
  const history = useHistory();
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toProfile = (e) => {
    e.preventDefault();
    history.push(`/account/profile`);
  };
  const toMyOrder = (e) => {
    e.preventDefault();
    history.push(`/account/order/page/1`);
  };
  const toAddressBook = (e) => {
    e.preventDefault();
    history.push(`/account/addressbook`);
  };

  const AntTabs = styled(Tabs)({
    borderBottom: "1px solid #e8e8e8",
    "& .MuiTabs-indicator": {
      backgroundColor: "#1890ff",
    },
  });

  const AntTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      spacing: 1,
      textTransform: "none",
      minWidth: 0,
      [theme.breakpoints.up("sm")]: {
        minWidth: 0,
      },
      fontWeight: "bold",
      marginRight: theme.spacing(1),
      color: "rgba(0, 0, 0, 0.85)",
      fontSize: "16px",
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:hover": {
        color: "#40a9ff",
        opacity: 1,
      },
      "&.Mui-selected": {
        color: "#1890ff",
        fontWeight: "bold",
      },
      "&.Mui-focusVisible": {
        backgroundColor: "#d1eaff",
      },
    })
  );

  return (
    <div>
      <Container>
        <AntTabs
          id="profileTabs"
          value={value}
          onChange={handleChange}
          aria-label="ant example"
        >
          <AntTab
            label="Profile"
            icon={<ManageAccountsOutlinedIcon />}
            onClick={toProfile}
            value="1"
          />
          <AntTab
            label="My Orders"
            icon={<ListAltIcon />}
            onClick={toMyOrder}
            value="2"
          />
          <AntTab
            label="Addresses"
            icon={<PermContactCalendarOutlinedIcon />}
            onClick={toAddressBook}
            value="3"
          />
        </AntTabs>
        {/* <TabContext value={value} className="account_panel">
          <Box
            sx={{
              borderBottom: 2,
              borderColor: "divider",
              marginTop: "0px",
              display: "flex",
              overflowX: "auto",
            }}
          >
            <TabList
              id="tablist"
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              <Tab
                icon={<ManageAccountsOutlinedIcon />}
                iconPosition="start"
                label="Profile"
                onClick={toProfile}
                value="1"
              />
              <Tab
                icon={<ListAltIcon />}
                iconPosition="start"
                label="My Orders"
                onClick={toMyOrder}
                value="2"
              />
              <Tab
                icon={<PermContactCalendarOutlinedIcon />}
                iconPosition="start"
                label="Addresses"
                onClick={toAddressBook}
                value="3"
              />
            </TabList>
          </Box>
        </TabContext> */}
      </Container>
    </div>
  );
};

export default AccountScreen;
