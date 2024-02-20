import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CardContent,
  Stack,
  IconButton,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";

import { resetRequest } from "../../store/actions/userActions";

export default function MailLog(props) {
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const { loading, message } = useSelector((state) => state.userRequestMail);

  const resetRequestHandler = (e) => {
    e.preventDefault();
    dispatch(resetRequest(email)).then((res) => {
      if (res) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    });
  };

  return (
    <>
      {success ? (
        <Alert
          severity="success"
          icon={false}
          sx={{ paddingY: "10%", paddingX: "5%" }}
        >
          <Typography variant="body1">{message.message}</Typography>
          <Button
            variant="contained"
            sx={{ marginTop: "30px", width: "40%" }}
            onClick={() => {
              setSuccess(false);
              props.backFcn();
            }}
          >
            <Typography variant="body1">
              <span>Log in</span>
            </Typography>
          </Button>
        </Alert>
      ) : (
        <CardContent>
          <form onSubmit={resetRequestHandler}>
            <Stack direction="column" spacing={3}>
              <Stack direction="column" spacing={0}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <IconButton
                    color="primary"
                    className="backBtn"
                    onClick={props.backFcn}
                  >
                    <KeyboardArrowLeftRoundedIcon />
                  </IconButton>
                  <Typography sx={{ fontWeight: "bold" }} variant="h5">
                    Forgot Password?
                  </Typography>
                  <IconButton></IconButton>
                </Stack>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Add your email address below to reset it.
                </Typography>
              </Stack>

              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                type="email"
                size="small"
                required
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <LoadingButton
                size="small"
                fullWidth
                type="submit"
                endIcon={<SendIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
              >
                <Typography variant="body1">
                  <span>Send</span>
                </Typography>
              </LoadingButton>
            </Stack>
          </form>
        </CardContent>
      )}
    </>
  );
}
