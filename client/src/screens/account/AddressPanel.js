import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  Box,
  Stack,
  Typography,
  Button,
  Paper,
  Container,
  Alert,
  AlertTitle,
} from "@mui/material";

import AddressCard from "../../components/account/AddressCard";

import { listAddresses } from "../../store/actions/addressActions";

export default function AddressPanel() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { addresses } = useSelector((state) => state.addressList.addresses);
  const { error: addressListError } = useSelector((state) => state.addressList);

  const { success: successDelete } = useSelector(
    (state) => state.addressDelete
  );
  const { success: successCreate } = useSelector(
    (state) => state.addressCreate
  );

  useEffect(() => {
    if (userInfo) {
      dispatch(listAddresses(userInfo._id));
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete, successCreate]);

  const addHandler = (e) => {
    e.preventDefault();
    history.push("/accounts/address/add");
  };

  return (
    <Container className="account_panel">
      {addressListError ? (
        <Box sx={{ paddingTop: "2%", paddingX: "5%" }}>
          <Alert severity="error">
            <AlertTitle>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Error
              </Typography>
            </AlertTitle>
            <Typography variant="body1">
              Excuse me. Your authorized token expired. Please sign in again.
            </Typography>
          </Alert>
        </Box>
      ) : (
        <Box className="create_panel">
          <Stack direction="column" spacing={2}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Button variant="text" color="inherit">
                <Typography variant="h5">
                  <strong>Address Book</strong>
                </Typography>
              </Button>
              <Button
                variant="outlined"
                color="primary"
                sx={{ borderRadius: "25px" }}
                onClick={addHandler}
              >
                <span>New Address</span>
              </Button>
            </Stack>
            {!addresses || addresses.length === 0 ? (
              <Paper>
                <Typography
                  variant="h6"
                  sx={{ textAlign: "center", padding: 5 }}
                >
                  Your address book is empty.
                </Typography>
              </Paper>
            ) : (
              <Box className="row">
                {addresses?.map((item, index) => (
                  <AddressCard key={index} address={item} crud={true} />
                ))}
              </Box>
            )}
          </Stack>
        </Box>
      )}
    </Container>
  );
}
