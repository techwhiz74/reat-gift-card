import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  Container,
  Box,
  Grid,
  Stack,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { createAddress } from "../../store/actions/addressActions";

export default function AddressDetails() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { userInfo } = useSelector((state) => state.userLogin);

  const [formData, setFormData] = useState({
    _id: "",
    user: userInfo._id,
    name: "",
    street_address: "",
    city: "",
    state: "",
    zip_code: "",
    googleMapLink: "",
  });
  const autocomplete = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePlaceSelect = useCallback(() => {
    let addressObject = autocomplete.current.getPlace();

    if (addressObject && addressObject.address_components) {
      let address = addressObject.address_components;
      let updatedFormData = { ...formData };

      // updatedFormData.name = recipName;
      updatedFormData.street_address = `${address[0]?.long_name} ${address[1]?.long_name}`;
      updatedFormData.googleMapLink = addressObject.url;

      address.forEach((item) => {
        if (
          item.types[0] === "locality" ||
          item.types[0] === "sublocality_level_1"
        ) {
          updatedFormData.city = item.long_name;
        }
        if (item.types[0] === "country") {
          updatedFormData.state = item.short_name;
        }
        if (item.types[0] === "postal_code") {
          updatedFormData.zip_code = item.long_name;
        }
      });

      setFormData(updatedFormData);
    }
  }, [formData]);

  useEffect(() => {
    autocomplete.current = new window.google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      {}
    );
    autocomplete.current.addListener("place_changed", handlePlaceSelect);
  }, [handlePlaceSelect]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createAddress(formData));
    history.push("/delivery");
    clearForm();
  };

  const toDeliver = (event) => {
    event.preventDefault();
    history.push("/delivery");
  };

  const clearForm = () => {
    setFormData({
      name: "",
      street_address: "",
      city: "",
      state: "",
      zip_code: "",
      googleMapLink: "",
    });
  };

  return (
    <Container className="theme-container">
      <Box>
        <Button
          variant="text"
          color="inherit"
          startIcon={<ChevronLeftIcon />}
          sx={{ borderRadius: "10px" }}
          onClick={toDeliver}
        >
          <Typography variant="h6">
            <strong>Delivery</strong>
          </Typography>
        </Button>

        <Paper sx={{ padding: 3 }}>
          <form onSubmit={handleSubmit}>
            <Stack direction="column" spacing={2}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="h5">Add Address</Typography>
              </Stack>
            </Stack>

            <Grid container className="create_panel" spacing={3}>
              <Grid item xs={0} sm={4}></Grid>
              <Grid item xs={12} sm={4}>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={3}
                >
                  <TextField
                    required
                    name="name"
                    label="Recipient name"
                    value={formData.name}
                    placeholder="Name"
                    size="small"
                    fullWidth
                    onChange={handleChange}
                  />

                  <TextField
                    id="autocomplete"
                    label="Enter a location"
                    size="small"
                    fullWidth
                  />

                  <TextField
                    required
                    name="street_address"
                    label="Street address"
                    value={formData.street_address}
                    placeholder="Street Address"
                    size="small"
                    fullWidth
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    name="city"
                    label="City"
                    value={formData.city}
                    placeholder="City"
                    size="small"
                    fullWidth
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    name="state"
                    label="State"
                    value={formData.state}
                    placeholder="State"
                    size="small"
                    fullWidth
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    name="zip_code"
                    label="Zip code"
                    value={formData.zip_code}
                    placeholder="Zip code"
                    size="small"
                    fullWidth
                    onChange={handleChange}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ borderRadius: "25px" }}
                    startIcon={<SaveIcon />}
                  >
                    <span>Save address</span>
                  </Button>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={4}></Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}
