import React from "react";
import { useHistory } from "react-router-dom";
import { Modal, Box, Button, Typography, Stack } from "@mui/material";

export default function CheckModal(props) {
  const history = useHistory();
  const { open, closeFcn } = props;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    textAlign: "center",
  };

  const toLogin = () => {
    history.push("/login/fromcart");
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
          <strong>Sign In or Create an Account</strong>
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-around"
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
            variant="contained"
            color="primary"
            onClick={() => toLogin()}
            sx={{ minWidth: "90px" }}
          >
            <span>Login</span>
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
