const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const supplementSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
    },
    frontUrl: {
      type: String,
    },
    blankUrl: {
      type: String,
    },
    category: {
      type: String,
      trim: true,
    },
    occasion: {
      type: [String],
      trim: true,
    },
    price: {
      type: Number,
    },
    shipping: {
      type: Number,
    },
    description: {
      type: String,
      trim: true,
    },
    sales: {
      type: Number,
    },
    popular: {
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
    reviews: {
      type: Number,
    },
    textPositions: {
      type: [Number],
    },
    subTextPositions: {
      type: [Number],
    },
  },
  { timestamps: true }
);

const Supplement = mongoose.model("Supplement", supplementSchema);

module.exports = Supplement;
