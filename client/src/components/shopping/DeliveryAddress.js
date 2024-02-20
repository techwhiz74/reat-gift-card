import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Stack,
  Card,
  // IconButton,
  // Menu,
  // MenuItem,
  useMediaQuery,
  Divider,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import ConfirmModal from "../ConfirmModal";
import colors from "../../components/constant/Colors";

import { deleteAddress } from "../../store/actions/addressActions";

export default function DeliveryAddress({
  address,
  selectHandler,
  selectedId,
}) {
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width: 576px");
  const chooseHandler = (id) => {
    selectHandler(id);
  };
  const editHandler = (id) => {
    history.push(`/accounts/address/${id}/edit/fromdelivery`);
  };

  // Delete Confirm Modal
  const [open, setOpen] = useState(false);
  const handleOpen = (id) => {
    setOpen(true);
    setAnchorEl(null);
  };
  const handleClose = () => setOpen(false);

  // Control menu
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Card
        className="delivery-address"
        onClick={() => chooseHandler(address._id)}
        sx={{ minHeight: isMobile ? "60px" : "100px", boxShadow: 0 }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            onClick={() => selectHandler(address._id)}
          >
            {selectedId === address._id ? (
              <PersonPinIcon
                sx={{
                  fontSize: isMobile ? "2.5rem" : "3rem",
                  color: colors.primarygreen,
                }}
              />
            ) : (
              <AccountCircleIcon
                sx={{
                  fontSize: isMobile ? "2.3rem" : "2.8rem",
                  color: colors.muted,
                }}
              />
            )}
            <Stack
              direction="column"
              alignItems="flex-start"
              sx={{
                color:
                  selectedId === address._id
                    ? colors.primarygreen
                    : colors.muted,
              }}
            >
              <span style={{ fontWeight: "bold" }}>{address.name}</span>
              <span>{address.street_address}</span>
              <span>
                {address.city}, {address.state}
              </span>
            </Stack>
          </Stack>

          <Stack direction="row">
            <EditOutlinedIcon
              onClick={() => editHandler(address._id)}
              sx={{
                color:
                  selectedId === address._id
                    ? colors.primarygreen
                    : colors.muted,
              }}
            />
            <DeleteOutlinedIcon
              onClick={() => handleOpen(address._id)}
              sx={{
                color:
                  selectedId === address._id
                    ? colors.primarygreen
                    : colors.muted,
              }}
            />
          </Stack>
          {/* <IconButton
            aria-controls={anchorEl ? "control-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl) ? "true" : undefined}
            onClick={handleMenuOpen}
          >
            <MoreVertIcon sx={{ fontSize: 20 }} />
          </IconButton> */}
          {/* <Menu
            id="control-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => editHandler(address._id)}>
              <span>Edit</span>
            </MenuItem>
            <MenuItem onClick={() => handleOpen(address._id)}>
              <span>Delete</span>
            </MenuItem>
          </Menu> */}
        </Stack>

        <ConfirmModal
          id={address._id}
          open={open}
          closeFcn={handleClose}
          actionFcn={deleteAddress}
          type="Delete"
        />
      </Card>

      <Divider />
    </>
  );
}
