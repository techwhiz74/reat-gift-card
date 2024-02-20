const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      trim: true,
    },
    isUnRead: {
      type: Boolean,
      trim: true,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
