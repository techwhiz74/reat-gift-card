import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Stack, Card, IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { green } from "@mui/material/colors";
import PersonPinIcon from "@mui/icons-material/PersonPin";

import ConfirmModal from "../ConfirmModal";

import { deleteAddress } from "../../store/actions/addressActions";

export default function AddressCard({ address }) {
  const history = useHistory();
  const editHandler = (id) => {
    history.push(`/accounts/address/${id}/edit`);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <Card className="address-Card" sx={{ boxShadow: 3, borderRadius: 5 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <PersonPinIcon sx={{ fontSize: 55, color: green[500] }} />
          <Stack direction="column" alignItems="flex-start">
            <span>
              <strong>{address.name}</strong>
            </span>
            <span>{address.street_address}</span>
            <span>
              {address.city}, {address.state}
            </span>
          </Stack>
        </Stack>
        <Stack direction="row">
          <IconButton
            size="small"
            color="primary"
            onClick={() => editHandler(address._id)}
          >
            <EditOutlinedIcon />
          </IconButton>
          <IconButton size="small" color="primary" onClick={handleOpen}>
            <DeleteOutlinedIcon />
          </IconButton>
        </Stack>
      </Stack>
      <ConfirmModal
        id={address._id}
        open={open}
        closeFcn={handleClose}
        actionFcn={deleteAddress}
        type="Delete"
      />
    </Card>
  );
}
