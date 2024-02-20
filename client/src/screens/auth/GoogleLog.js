import React from "react";

import { CardContent, Button, Divider, Stack, Typography } from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";

export default function GoogleLogIn(props) {
  return (
    <CardContent>
      <Stack direction="column" spacing={3}>
        <Typography sx={{ fontWeight: "bold" }} variant="h5" gutterBottom>
          {/* {props.method ? "Sign Up" : "Welcome to Free-Cards"} */}
          Signup / Login to Continue
        </Typography>
        <Button
          type="submit"
          name="apple"
          fullWidth
          variant="outlined"
          color="inherit"
          startIcon={<AppleIcon />}
          // onClick={(e) => props.googleHandler(e)}
        >
          <span>Continue With Apple</span>
        </Button>
        <Button
          type="submit"
          name="google"
          fullWidth
          variant="outlined"
          color="inherit"
          startIcon={<GoogleIcon color="primary" />}
          onClick={(e) => props.googleHandler(e)}
        >
          <span>Continue With Google</span>
        </Button>
        <Button
          name="facebook"
          type="button"
          fullWidth
          variant="outlined"
          color="inherit"
          startIcon={<FacebookRoundedIcon color="primary" />}
          onClick={(e) => props.facebookHandler(e)}
        >
          <span>Continue with Facebook</span>
        </Button>
        <Divider>or</Divider>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={props.toMailFcn}
          fullWidth
        >
          <Typography variant="body1">
            <span>Continue with email</span>
          </Typography>
        </Button>
      </Stack>
    </CardContent>
  );
}
