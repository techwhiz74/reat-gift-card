const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        qty: { type: Number, required: true },
        imageUrl: { type: String, required: true },
        blankUrl: { type: String },
        frontUrl: { type: String },
        preSMSUrl: { type: String },
        middleUrl: { type: String },
        price: { type: Number, required: true },
        extra: { type: Boolean },
        isFree: { type: Boolean },
        category: { type: String },
        trending: { type: Boolean },
        popular: { type: Boolean },
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      name: { type: String, required: true },
      street_address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip_code: { type: String, required: true },
    },
    cardPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    postageFee: {
      type: Number,
      required: true,
      default: 0.0,
    },
    giftPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    giftShipping: {
      type: Number,
      required: true,
      default: 0.0,
    },
    giftCardFee: {
      type: Number,
      required: true,
      default: 0.0,
    },
    deliveryFee: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      email_address: { type: String },
    },
    status: {
      type: String,
      required: true,
      default: "Unprocessed",
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
