const asyncHandler = require("express-async-handler");
const Order = require("../models/order.js");
const Notification = require("../models/notification.js");
const User = require("../models/user.js");

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderId,
    orderItems,
    shippingAddress,
    paymentMethod,
    cardPrice,
    postageFee,
    giftPrice,
    giftShipping,
    giftCardFee,
    delivertFee,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderId,
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      cardPrice,
      postageFee,
      giftPrice,
      giftShipping,
      giftCardFee,
      delivertFee,
      totalPrice,
    });
    const createdOrder = await order.save();

    const user = await User.findById(req.user._id);
    const username = user.name;
    const notification = new Notification({
      title: "New Order",
      description: username + " placed a new order " + order.orderId,
      avatar: null,
      type: "neworder",
      isUnRead: true,
    });
    const createdNotification = await notification.save();

    res.status(201).json(createdOrder);
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate({
    path: "user",
    select: "name email",
  }); //bug fixed :)

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.email_address,
    };
    const updatedOrder = await order.save();

    const user = await User.findById(req.user._id);
    const username = user.name;
    const notification = new Notification({
      title: "New Order",
      description: username + " paid for order " + order.orderId,
      avatar: null,
      type: "payorder",
      isUnRead: true,
    });
    const createdNotification = await notification.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  const newStatus = req.body.status;
  if (order) {
    order.status = newStatus;
    if (newStatus === "Shipped") {
      order.deliveredAt = Date.now();
    }
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// route: GET api/orders/myorders

const getMyOrders = asyncHandler(async (req, res) => {
  const pageSize = 1; // Display one order details per one page
  const page = req.query.pageNumber || 1;

  const orders = await Order.find({ user: req.user._id })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({
      createdAt: -1,
    });

  const count = await Order.find({ user: req.user._id }).countDocuments();

  res.json({ orders, page, pages: Math.ceil(count / pageSize) });
});

// route: GET /api/orders

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate("user", "id name email")
    .sort({ createdAt: -1 });
  res.json(orders);
});

const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    await order.remove();
    res.json({ message: "Order withdrawed successfully" });
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

module.exports = {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderStatus,
  getMyOrders,
  getOrders,
  deleteOrder,
};
