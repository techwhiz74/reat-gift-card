import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CardContent,
  Grid,
  IconButton,
  Link,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Typography,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  Stack,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { login } from "../../store/actions/userActions";

export default function MailLog(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { error } = useSelector((state) => state.userLogin);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <CardContent>
      <form onSubmit={loginHandler}>
        <Stack direction="column" spacing={3}>
          <Stack
            direction="row"
            alignItems="start"
            justifyContent="space-between"
            spacing={1}
          >
            <IconButton color="primary" onClick={props.backFcn}>
              <KeyboardArrowLeftIcon />
            </IconButton>
            <Stack direction="column">
              <Typography sx={{ fontWeight: "bold" }} variant="h5">
                Welcome to Free-Cards
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Login to continue
              </Typography>
            </Stack>
            <IconButton></IconButton>
          </Stack>

          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            type="email"
            size="small"
            required
            placeholder="Enter email"
            value={email || ""}
            error={error === "Invalid email" ? true : false}
            helperText={error === "Invalid email" && error}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormControl fullWidth variant="outlined">
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
              label="Password"
              variant="outlined"
              size="small"
              fullWidth
              required
              error={error === "Incorrect password" ? true : false}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormHelperText
              id="outlined-adornment-password"
              sx={{ color: "#d32f2f" }}
            >
              {error === "Incorrect password" && error}
            </FormHelperText>
          </FormControl>

          <Button type="submit" variant="contained" fullWidth>
            <Typography variant="body1">
              <span>Log In</span>
            </Typography>
          </Button>
        </Stack>
      </form>
      <Grid container justifyContent="space-between" className="mt-3">
        <Grid item>
          <Typography>
            <Link onClick={props.forgotFcn}>
              <span>Forgot password?</span>
            </Link>
          </Typography>
        </Grid>
        <Grid item>
          <Typography align="right">
            <span>New Customer? </span>
            <Link onClick={props.registerFcn}>
              <span>Register</span>
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  );
}
