import React, { useState } from "react";
import { useDispatch } from "react-redux";

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
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { register } from "../../store/actions/userActions";

export default function MailLog(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const signUpHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password does not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <CardContent>
      <form onSubmit={signUpHandler}>
        <Stack direction="column" spacing={3}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            <IconButton color="primary" onClick={props.backFcn}>
              <KeyboardArrowLeftRoundedIcon />
            </IconButton>
            <Typography sx={{ fontWeight: "bold" }} variant="h5">
              Sign Up with Email
            </Typography>
            <IconButton></IconButton>
          </Stack>
          <TextField
            fullWidth
            label="Enter Name"
            variant="outlined"
            type="name"
            size="small"
            required
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            error={message ? true : false}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <FormControl fullWidth variant="outlined">
            <InputLabel
              htmlFor="outlined-adornment-password"
              error={message ? true : false}
            >
              Password *
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
              label="Password"
              size="small"
              fullWidth
              required
              error={message ? true : false}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl> */}
          <TextField
            id="outlined-adornment-confirm-password"
            type={showPassword ? "text" : "password"}
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
            error={message ? true : false}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {/* <FormControl fullWidth variant="outlined">
            <InputLabel
              htmlFor="outlined-adornment-confirm-password"
              error={message ? true : false}
            >
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
              error={message ? true : false}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl> */}
          <FormHelperText sx={{ color: "#d32f2f" }}>{message}</FormHelperText>

          <Button type="submit" variant="contained" fullWidth>
            <Typography variant="body1">
              <span>Register</span>
            </Typography>
          </Button>
        </Stack>
      </form>
      <Grid container justifyContent="right" className="mt-3">
        <Grid item>
          <Typography variant="body2">
            Have an account?{" "}
            <Link onClick={props.loginFcn}>
              <span>Log In</span>
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  );
}
