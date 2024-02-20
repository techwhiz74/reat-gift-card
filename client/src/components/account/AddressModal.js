import React from "react";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import AddressAuto from "./AddressAuto";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(4),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}));

export default function AddressModal(props) {
  const history = useHistory();
  const { open, closeFcn } = props;

  return (
    <BootstrapDialog
      onClose={closeFcn}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Add a new address
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={closeFcn}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers className="address-modal">
        <TextField
          required
          id="name"
          label="Recipient name"
          placeholder="(e.g. John Doe)"
          //   defaultValue="(e.g. John Doe)"
          //   value={formData.name}
          size="small"
          fullWidth
        />
        <AddressAuto />
      </DialogContent>
      <DialogActions>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={2}
        >
          <Button
            variant="outlined"
            color="primary"
            sx={{ borderRadius: "25px" }}
            // onClick={() => addCartHandler(id)}
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: "25px" }}
            // onClick={() => confirmHandler(id)}
          >
            <span>Save</span>
          </Button>
        </Stack>
      </DialogActions>
    </BootstrapDialog>
  );
}
