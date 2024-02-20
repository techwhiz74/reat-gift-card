const asyncHandler = require("express-async-handler");
const Notification = require("../models/notification.js");

const createNotification = asyncHandler(async (req, res) => {
  const notification = new Notification({
    title: req.body.title,
    description: req.body.description,
    avatar: req.body.avatar,
    type: req.body.type,
    isUnRead: req.body.isUnRead || true,
  });

  const createdNotification = await notification.save();
  res.status(201).json(createdNotification);
});

const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({}).sort({
    createdAt: -1,
  });
  res.json(notifications);
});

const deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  if (notification) {
    await notification.remove();
    res.json({ message: "Notification removed" });
  } else {
    res.status(404);
    throw new Error("Notification not found");
  }
});

const updateNotification = asyncHandler(async (req, res) => {
  const { title, description, avatar, type, isUnRead } = req.body;

  const notification = await Notification.findById(req.params.id);

  if (notification) {
    notification.title = title;
    notification.description = description;
    notification.avatar = avatar;
    notification.type = type;
    notification.isUnRead = isUnRead;

    const updatedNotification = await notification.save();
    res.json(updatedNotification);
  } else {
    res.status(404);
    throw new Error("Notification not found");
  }
});

module.exports = {
  getNotifications,
  deleteNotification,
  createNotification,
  updateNotification,
};
