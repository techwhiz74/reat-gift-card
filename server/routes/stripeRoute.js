const express = require("express");

const stripe = require("stripe")(
  "sk_test_51OBq9BDjEJ7n9NzlZni5HCpBmduQnFmVD4orqitLsr5uJil4E4YEbN0sMM2cKIpFxsamqe1lIfa1JNpBUakXAmr000pb3MsHzp"
);
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("GET response from Researcher");
  res.json({
    message: "It works",
  });
});

router.post("/pay", (req, res, next) => {
  const { token, amount } = req.body;
  const idempotencyKey = uuidv4();

  return stripe.customers
    .create({
      email: token.email,
      source: token,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: amount * 100,
          currency: "gbp",
          customer: customer.id,
          receip_email: token.email,
        },
        { idempotencyKey }
      );
    })
    .then((result) => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false });
    });
});

module.exports = router;
