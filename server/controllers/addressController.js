const asyncHandler = require("express-async-handler");
const Address = require("../models/address.js");

const createAddress = asyncHandler(async (req, res) => {
  const address = new Address({
    user: req.body.user,
    name: req.body.name,
    street_address: req.body.street_address,
    city: req.body.city,
    state: req.body.state,
    zip_code: req.body.zip_code,
    googleMapLink: req.body.googleMapLink,
  });

  const createdAddress = await address.save();
  res.status(201).json(createdAddress);
});

const getAddresses = asyncHandler(async (req, res) => {
  const user = req.params.user;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i", //case insensitive
        },
      }
    : {};
  const addresses = await Address.find({ user: user }).find({ ...keyword });
  res.json({ addresses });
});

const getAddressById = asyncHandler(async (req, res) => {
  const address = await Address.findById(req.params.id);
  if (address) {
    res.json(address);
  } else {
    res.status(404);
    throw new Error("Address not found");
  }
});

const deleteAddress = asyncHandler(async (req, res) => {
  const address = await Address.findById(req.params.id);
  if (address) {
    await address.remove();
    res.json({ message: "Address removed" });
  } else {
    res.status(404);
    throw new Error("Address not found");
  }
});

const updateAddress = asyncHandler(async (req, res) => {
  const { name, street_address, city, state, zip_code, googleMapLink } =
    req.body;

  const address = await Address.findById(req.params.id);

  if (address) {
    address.name = name;
    address.street_address = street_address;
    address.city = city;
    address.state = state;
    address.zip_code = zip_code;
    address.googleMapLink = googleMapLink;

    const updatedAddress = await address.save();
    res.json(updatedAddress);
  } else {
    res.status(404);
    throw new Error("Address not found");
  }
});

module.exports = {
  getAddresses,
  getAddressById,
  deleteAddress,
  createAddress,
  updateAddress,
};
