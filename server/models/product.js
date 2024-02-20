const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
    },
    blankUrl: {
      type: String,
    },
    frontUrl: {
      type: String,
    },
    preSMSUrl: {
      type: String,
    },
    middleUrl: {
      type: String,
    },
    category: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
    },
    postageFee: {
      type: Number,
    },
    description: {
      type: String,
      trim: true,
    },
    sales: {
      type: Number,
    },
    trending: {
      type: Boolean,
    },
    fontName: {
      type: String,
    },
    fontUrl: {
      type: String,
    },
    fontColor: {
      type: String,
    },
    imagePositions: {
      type: [Number],
    },
    filters: {
      type: [String],
    },
    textPositions: {
      type: [Number],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
