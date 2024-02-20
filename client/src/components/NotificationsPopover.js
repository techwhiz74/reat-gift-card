import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Badge,
  IconButton,
  Popover,
  Tooltip,
  Divider,
  Box,
  Typography,
  List,
  ListSubheader,
  Button,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
  Avatar,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import { fToNow } from "../utils/format-time";
import Scrollbar from "./scrollbar";
import Iconify from "./iconify";

import {
  listNotifications,
  updateNotification,
} from "../store/actions/notificationActions";

export default function NotificationPopover() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [displayCount, setDisplayCount] = useState(5);
  const [notificationItems, setNotificationItems] = useState([]);

  const { notifications } = useSelector((state) => state.notificationList);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(listNotifications());
    }, 10000); // 10 seconds in milliseconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [dispatch]);

  useEffect(() => {
    setNotificationItems(notifications);
  }, [notifications]);

  const [totalUnRead, setTotalUnRead] = useState(0);

  useEffect(() => {
    setTotalUnRead(
      notifications.filter((item) => item.isUnRead === true).length
    );
  }, [notifications]);

  const handleShowMore = () => {
    setDisplayCount(totalUnRead);
  };
  const handleShowLess = () => {
    setDisplayCount(5);
  };

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      isUnRead: false,
    }));

    setNotificationItems(updatedNotifications);

    updatedNotifications.forEach((item) => {
      dispatch(updateNotification(item));
    });

    const newTotalUnRead = updatedNotifications.filter(
      (item) => item.isUnRead === true
    ).length;

    setTotalUnRead(newTotalUnRead);
  };

  return (
    <>
      <IconButton color="primary" onClick={handleOpen}>
        <Badge
          badgeContent={totalUnRead}
          color="error"
          sx={{
            "& .MuiBadge-badge": {
              fontSize: 9,
              height: 15,
              minWidth: 15,
            },
          }}
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2">
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <IconButton color="primary" onClick={handleMarkAllAsRead}>
              <Tooltip title=" Mark all as read">
                <Iconify icon="eva:done-all-fill" />
                {/* <NotificationsIcon /> */}
              </Tooltip>
            </IconButton>
          )}
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Scrollbar
          sx={{
            height: { xs: 340, sm: "auto" },
          }}
        >
          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: "overline" }}
              >
                New
              </ListSubheader>
            }
          >
            {totalUnRead > 0
              ? notificationItems
                  .slice(0, displayCount)
                  .map((notification, index) => (
                    <NotificationItem
                      key={index}
                      notification={{
                        ...notification,
                        createdAt: new Date(notification.createdAt),
                      }}
                    />
                  ))
              : null}
            {totalUnRead > 0 ? (
              totalUnRead > displayCount ? (
                <Button
                  fullWidth
                  size="small"
                  sx={{ alignItems: "center" }}
                  onClick={handleShowMore}
                >
                  <ArrowDropDownIcon />
                </Button>
              ) : (
                <Button
                  fullWidth
                  size="small"
                  sx={{ alignItems: "center" }}
                  onClick={handleShowLess}
                >
                  <ArrowDropUpIcon />
                </Button>
              )
            ) : null}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: "overline" }}
              >
                Before that
              </ListSubheader>
            }
          >
            {notificationItems
              .slice(totalUnRead, totalUnRead + 5)
              .map((notification, index) => (
                <NotificationItem
                  key={index}
                  notification={{
                    ...notification,
                    createdAt: new Date(notification.createdAt),
                  }}
                />
              ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: "dashed" }} />

        {/* <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box> */}
      </Popover>
    </>
  );
}

//---------------------------------------------------------------------------------------------
NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.instanceOf(Date),
    id: PropTypes.string,
    isUnRead: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    avatar: PropTypes.any,
  }),
};

function NotificationItem({ notification }) {
  const { avatar, title } = renderContent(notification);

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: "1px",
        ...(notification.isUnRead && {
          bgcolor: "action.selected",
        }),
      }}
    >
      {/* <ListItemAvatar>
        <Avatar alt="customer" />
      </ListItemAvatar> */}
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: "flex",
              alignItems: "center",
              color: "text.disabled",
            }}
          >
            <Iconify
              icon="eva:clock-outline"
              sx={{ mr: 0.5, width: 16, height: 16 }}
            />
            {fToNow(notification.createdAt)}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------
function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography
        component="span"
        variant="body2"
        sx={{ color: "text.secondary" }}
      >
        &nbsp; {notification.description}
      </Typography>
    </Typography>
  );

  if (notification.type === "order_placed") {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="/assets/icons/ic_notification_package.svg"
        />
      ),
      title,
    };
  }
  if (notification.type === "order_shipped") {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="/assets/icons/ic_notification_shipping.svg"
        />
      ),
      title,
    };
  }
  if (notification.type === "mail") {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="/assets/icons/ic_notification_mail.svg"
        />
      ),
      title,
    };
  }
  if (notification.type === "chat_message") {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="/assets/icons/ic_notification_chat.svg"
        />
      ),
      title,
    };
  }
  return {
    avatar: notification.avatar ? (
      <img alt={notification.title} src={notification.avatar} />
    ) : null,
    title,
  };
}
