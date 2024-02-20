const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const mustacheExpress = require("mustache-express");

const connectDB = require("./config/database.js");
const productRoutes = require("./routes/productRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const uploadRoutes = require("./routes/uploadRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const supplementRoutes = require("./routes/supplementRoutes.js");
const addressRoutes = require("./routes/addressRoutes.js");
const notificationRoutes = require("./routes/notificationRoutes.js");
const stripeRoutes = require("./routes/stripeRoute");

const { errorHandler, notFound } = require("./middleware/errorMiddleware.js");

dotenv.config();

require("./config/passport/facebook.setup");
require("./config/passport/google.setup");
require("./config/passport/jwt.setup");
require("./config/passport/local.setup");

const app = express();

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}
app.engine("html", mustacheExpress());
app.use(express.json()); // body-parser is now deprecated as of Express 4.16+
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/supplements", supplementRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/stripe", stripeRoutes);

app.use("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// const __dirname = path.resolve(); //since we're using es modules syntax
app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Api is running...");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

connectDB(() => {
  app.listen(
    PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
        .bold
    )
  );
});
