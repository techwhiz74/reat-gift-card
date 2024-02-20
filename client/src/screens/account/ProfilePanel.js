import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";

import {
  Button,
  Box,
  Stack,
  Typography,
  TextField,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
  Container,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import Footer from "../../components/Footer";
import colors from "../../components/constant/Colors";

import {
  updateUserProfile,
  getUserDetail,
} from "../../store/actions/userActions";

export default function ProfilePage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [newPass, setNewPass] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const [error, setError] = useState();
  const [open, setOpen] = useState();
  const [title, setTitle] = useState();
  const [account, setAccount] = useState({
    _id: "",
    name: "",
    email: "",
    password: "",
  });

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

  const showName = userInfo?.name;
  const showEmail = userInfo?.email;

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

  const freeCardsLeft = [];
  for (let i = 0; i < userData.freeCards; i++) {
    freeCardsLeft.push(
      <img
        key={i}
        alt=""
        src="/favicon-16x16.png"
        width="20px"
        style={{ marginLeft: "5px" }}
      />
    );
  }

  // Next free-cards reset time
  const [resetDate, setResetDate] = useState();
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const regDate = new Date(userData.createdAt);
  const regDay = regDate.getDate();

  useEffect(() => {
    if (regDay <= 28) {
      if (currentDay < regDay) {
        setResetDate(
          moment(currentDate).set("date", regDay).format("DD/MM/YYYY")
        );
      } else if (currentDay >= regDay) {
        setResetDate(
          moment(currentDate)
            .add(1, "months")
            .set("date", regDay)
            .format("DD/MM/YYYY")
        );
      }
    } else {
      if (currentDay < regDay) {
        setResetDate(moment(currentDate).set("date", 28).format("DD/MM/YYYY"));
      } else if (currentDay >= regDay) {
        setResetDate(
          moment(currentDate)
            .add(1, "months")
            .set("date", 28)
            .format("DD/MM/YYYY")
        );
      }
    }
  }, [regDay, currentDay]);

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
    <>
      <Container>
        <Box className="profile_panel">
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ paddingX: 3 }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: colors.primarygreen,
                fontFamily: "cursive",
              }}
              variant="h5"
            >
              <strong>Welcome {showName}!</strong>
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={5}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="subtitle1">
                  <strong>Monthly Free Cards:</strong>
                </Typography>
                <Typography variant="subtitle1">
                  <strong>{userData.freeCards}</strong>
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="subtitle1">
                  <strong>Next Reset:</strong>
                </Typography>
                <Typography variant="subtitle1">
                  <strong>{resetDate}</strong>
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

          <form onSubmit={submitHandler}>
            <Stack
              direction="column"
              // alignItems="center"
              spacing={3}
              sx={{ paddingX: 5 }}
            >
              <Typography variant="h6">
                <strong>Account Details</strong>
              </Typography>

              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="body1">Customer name: </Typography>
                <Typography>
                  <span>{showName}</span>
                </Typography>
              </Stack>
              <TextField
                variant="outlined"
                name="name"
                type="name"
                size="small"
                label="Full name"
                value={account.name}
                fullWidth
                onChange={(e) => onChange(e)}
              />
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="body1">Email address: </Typography>
                <Typography>
                  <span>{showEmail}</span>
                </Typography>
              </Stack>
              <TextField
                variant="outlined"
                name="email"
                type="email"
                size="small"
                label="Email address"
                value={account.email}
                fullWidth
                onChange={(e) => onChange(e)}
              />
              <Button
                type="submit"
                color="inherit"
                variant="outlined"
                sx={{ borderRadius: 5, minWidth: "70%" }}
              >
                <span>Update profile</span>
              </Button>
            </Stack>
          </form>

          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

          <form onSubmit={passwordSubmit}>
            <Stack direction="column" spacing={3} sx={{ paddingX: 5 }}>
              <Typography variant="h6">
                <strong>Reset Password</strong>
              </Typography>
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
                color="inherit"
                variant="outlined"
                sx={{ borderRadius: 5, minWidth: "70%" }}
              >
                <span>Update password</span>
              </Button>
            </Stack>
          </form>

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
        </Box>
      </Container>
      <Footer />
    </>
  );
}
