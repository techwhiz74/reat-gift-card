import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  CardContent,
  Box,
  IconButton,
  Card,
  Stack,
  Button,
  FormControl,
  InputLabel,
  Typography,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { resetPassword } from "../../store/actions/userActions";
import { useParams } from "react-router-dom";

export default function ResetPassScreen() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { token } = useParams();

  const [formData, setFormData] = useState({});

  const [newPass, setNewPass] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const [error, setError] = useState();

  const { success, message } = useSelector((state) => state.userResetPassword);

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const confirmHandler = (e) => {
    setConfirmPass(e.target.value);
    if (newPass === e.target.value) {
      setFormData((prevData) => ({
        ...prevData,
        password: newPass,
        token: token,
      }));
    }
  };

  const passwordSubmit = (e) => {
    e.preventDefault();
    if (newPass === confirmPass) {
      dispatch(resetPassword(formData));
      setError();
      setNewPass();
      setConfirmPass();
      history.push("/login");
    } else setError("Password does not match");
  };

  return (
    <Box className="login_panel">
      <Card sx={{ boxShadow: 3 }}>
        <CardContent>
          <form onSubmit={passwordSubmit}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={4}
            >
              <Typography
                sx={{ fontWeight: "bold", textAlign: "center" }}
                variant="h5"
              >
                Your password
              </Typography>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  New Password *
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="New Password"
                  size="small"
                  fullWidth
                  required
                  value={newPass ? newPass : ""}
                  error={error ? true : false}
                  onChange={(e) => setNewPass(e.target.value)}
                />
              </FormControl>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-confirm-password">
                  Confirm Password *
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-confirm-password"
                  type={showPassword2 ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword2}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword2 ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                  size="small"
                  fullWidth
                  required
                  value={confirmPass ? confirmPass : ""}
                  error={error ? true : false}
                  onChange={(e) => confirmHandler(e)}
                />
                <FormHelperText
                  id="outlined-adornment-confirm-password"
                  sx={{ color: "#d32f2f" }}
                >
                  {error && error}
                </FormHelperText>
              </FormControl>
              <Button type="submit" color="primary" variant="contained">
                <span>Update password</span>
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={success}
        autoHideDuration={3000}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {message?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
