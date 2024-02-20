const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const addressSchema = new Schema(
  {
    user: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    street_address: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    zip_code: {
      type: String,
      trim: true,
    },
    googleMapLink: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
