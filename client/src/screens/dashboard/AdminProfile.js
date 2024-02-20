import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  Button,
  Box,
  Stack,
  Paper,
  Typography,
  Grid,
  TextField,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import {
  updateUserProfile,
  getUserDetail,
} from "../../store/actions/userActions";

export default function AdminProfile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [account, setAccount] = useState({
    _id: "",
    name: "",
    email: "",
    password: "",
  });

  const [newPass, setNewPass] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const [error, setError] = useState();
  const [open, setOpen] = useState();
  const [title, setTitle] = useState();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { success } = useSelector((state) => state.userUpdateProfile);

  const [userData, setUserData] = useState({});

  const getUserData = useCallback(
    (id) => {
      dispatch(getUserDetail(id))
        .then((res) => {
          if (res.data) {
            setUserData((prevData) => ({
              ...prevData,
              _id: res.data._id,
              freeCards: res.data.freeCards,
              createdAt: res.data.createdAt,
            }));
          } else {
            history.push("/login");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    },
    [dispatch]
  );

  useEffect(() => {
    if (userInfo) {
      getUserData(userInfo._id);
    } else {
      history.push("/login");
    }
  }, [userInfo]);

  const getUserAccount = () => {
    setAccount({
      _id: userInfo?._id,
      name: userInfo?.name,
      email: userInfo?.email,
    });
  };

  useEffect(() => {
    getUserAccount();
  }, [dispatch, success]);

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setAccount((prevData) => ({ ...prevData, [name]: value }));
  };

  const confirmHandler = (e) => {
    setConfirmPass(e.target.value);
    if (newPass === e.target.value) {
      setAccount((prevData) => ({ ...prevData, password: newPass }));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(account)).then((res) => {
      setAccount((prevData) => ({
        ...prevData,
        name: res.data.name,
        email: res.data.email,
      }));
      setTitle("profile");
      setOpen(true);
    });
  };

  const passwordSubmit = (e) => {
    e.preventDefault();
    setTitle("password");
    if (newPass === confirmPass) {
      dispatch(updateUserProfile(account));
      setError();
      setNewPass();
      setConfirmPass();
      setOpen(true);
    } else setError("Password does not match");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Box className="admin-container">
      <Stack
        direction="row"
        justifyContent="left"
        alignItems="center"
        spacing={2}
        sx={{ marginBottom: "20px" }}
      >
        <Typography variant="h4">
          <strong>Profile Details</strong>
        </Typography>
      </Stack>
      <Paper
        sx={{
          width: "100%",
          paddingX: "5%",
          paddingTop: "1%",
          paddingBottom: "2%",
        }}
      >
        <Grid container spacing={4} className="create_panel">
          <Grid item xs={0} sm={0} md={0} lg={1}></Grid>
          <Grid item xs={12} sm={12} md={5} lg={4}>
            <Typography
              sx={{ fontWeight: "bold", textAlign: "center" }}
              variant="h6"
              gutterBottom
            >
              Admin account details
            </Typography>
            <form onSubmit={submitHandler}>
              <Stack direction="column" alignItems="center" spacing={5}>
                <TextField
                  variant="outlined"
                  label="Admin Name"
                  type="name"
                  name="name"
                  size="small"
                  placeholder="Username"
                  defaultValue={userInfo?.name}
                  fullWidth
                  onChange={(e) => onChange(e)}
                />
                <TextField
                  variant="outlined"
                  label="Admin Email"
                  type="email"
                  name="email"
                  size="small"
                  placeholder="Email"
                  defaultValue={userInfo?.email}
                  fullWidth
                  onChange={(e) => onChange(e)}
                />
                <Button
                  type="submit"
                  color="primary"
                  sx={{
                    marginTop: "20px",
                    fontSize: "1.0rem",
                    borderRadius: "10px",
                    minWidth: "225px",
                  }}
                  variant="outlined"
                >
                  <span>Update account details</span>
                </Button>
              </Stack>
            </form>
          </Grid>
          <Grid item xs={0} sm={0} md={1} lg={1}></Grid>
          <Grid item xs={12} sm={12} md={5} lg={4}>
            <Typography
              sx={{ fontWeight: "bold", textAlign: "center" }}
              variant="h6"
              gutterBottom
            >
              Your password
            </Typography>
            <form onSubmit={passwordSubmit}>
              <Stack direction="column" alignItems="center" spacing={5}>
                <TextField
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
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
                    ),
                  }}
                  label="New Password"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                  value={newPass ? newPass : ""}
                  error={error ? true : false}
                  onChange={(e) => setNewPass(e.target.value)}
                />
                <FormControl fullWidth variant="outlined">
                  <TextField
                    id="outlined-adornment-confirm-password"
                    type={showPassword2 ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
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
                      ),
                    }}
                    label="Confirm Password"
                    variant="outlined"
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
                <Button
                  type="submit"
                  color="primary"
                  sx={{
                    marginTop: "20px",
                    fontSize: "1.0rem",
                    borderRadius: "10px",
                    minWidth: "225px",
                  }}
                  variant="outlined"
                >
                  <span>Update password</span>
                </Button>
              </Stack>
            </form>
          </Grid>
          <Grid item xs={0} sm={0} md={1} lg={2}></Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Your {title} successfully changed!
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
}
