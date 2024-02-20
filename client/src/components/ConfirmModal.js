import React from "react";
import { useDispatch } from "react-redux";
import { Modal, Box, Button, Typography, Stack } from "@mui/material";

export default function ConfirmModal(props) {
  const dispatch = useDispatch();
  const { open, closeFcn, id, actionFcn, type } = props;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 280,
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    textAlign: "center",
  };

  const confirmHandler = (id) => {
    dispatch(actionFcn(id));
    closeFcn();
  };

  return (
    <Modal
      open={open}
      onClose={closeFcn}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ mb: 3 }}
        >
          Are you sure?
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={closeFcn}
            sx={{ minWidth: "90px" }}
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{ minWidth: "90px" }}
            onClick={type === "Delete" ? () => confirmHandler(id) : actionFcn}
          >
            <span>{type}</span>
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
