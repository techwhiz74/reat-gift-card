import React, { useState, useEffect, useRef } from "react";

const ParlorForm = () => {
  const [parlor, setParlor] = useState({
    name: "",
    street_address: "",
    city: "",
    state: "",
    zip_code: "",
    googleMapLink: "",
  });
  const autocomplete = useRef(null);

  useEffect(() => {
    autocomplete.current = new window.google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      {}
    );
    autocomplete.current.addListener("place_changed", handlePlaceSelect);
  }, []);

  const handleChange = (event) => {
    setParlor({ ...parlor, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    clearForm();
  };

  const handlePlaceSelect = () => {
    let addressObject = autocomplete.current.getPlace();
    let address = addressObject.address_components;
    setParlor({
      ...parlor,
      name: addressObject.name,
      street_address: `${address[0]?.long_name} ${address[1]?.long_name}`,
      city: address[4]?.long_name,
      state: address[6]?.short_name,
      zip_code: address[8]?.short_name,
      googleMapLink: addressObject.url,
    });
  };

  const clearForm = () => {
    setParlor({
      name: "",
      street_address: "",
      city: "",
      state: "",
      zip_code: "",
      googleMapLink: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input id="autocomplete" className="input-field" type="text" />
        <input
          name={"name"}
          value={parlor.name}
          placeholder={"Name"}
          onChange={handleChange}
        />
        <input
          name={"street_address"}
          value={parlor.street_address}
          placeholder={"Street Address"}
          onChange={handleChange}
        />
        <input
          name={"city"}
          value={parlor.city}
          placeholder={"City"}
          onChange={handleChange}
        />
        <input
          name={"state"}
          value={parlor.state}
          placeholder={"State"}
          onChange={handleChange}
        />
        <input
          name={"zip_code"}
          value={parlor.zip_code}
          placeholder={"Zipcode"}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ParlorForm;
