const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    freeCards: {
      type: Number,
    },
    spent: {
      type: Number,
    },
    orders: {
      type: Number,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    googleId: {
      type: String,
    },
    facebookId: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpired: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    name: this.name,
  };
};

userSchema.methods.toProfileJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    name: this.name,
  };
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
