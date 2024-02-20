const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const User = require("../models/user.js");
const Notification = require("../models/notification.js");
const generateToken = require("../util/generateToken.js");

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  // const isPasswordValid = await bcrypt.compare(password, user.password);

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      freeCards: user.freeCards,
      spent: user.spent,
      orders: user.orders,
      token: generateToken(user._id),
    });
    // throw new Error("");
  } else {
    res.status(401); //unauthorized access
    if (!email) {
      throw new Error("Please enter your email address");
    } else if (!user) {
      throw new Error("Invalid email");
    } else if (!password) {
      throw new Error("Please enter your password");
    } else {
      throw new Error("Incorrect password");
    }
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, freeCards, spent, orders } = req.body;

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400); //Bad request
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    isAdmin: false,
    freeCards: freeCards || 2,
    spent: spent || 0,
    orders: orders || 0,
  });

  if (user) {
    // Create a new notification
    const notification = new Notification({
      title: "New customer",
      description: user.name + " is registered",
      avatar: null,
      type: "signup",
      isUnRead: true,
    });

    // Save the notification to the database
    const createdNotification = await notification.save();

    // Send the response with the user data and token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      freeCards: user.freeCards,
      spent: user.spent,
      orders: user.orders,
      token: generateToken(user._id),
    });

    // Email sent to the admin
    const token = generateToken(user.email);
    const transporter = nodemailer.createTransport({
      host: "Free-cards.co.uk",
      service: "smtp",
      port: 465,
      secure: true,
      auth: {
        user: "Support@free-cards.co.uk",
        pass: "FreeCards@123",
      },
    });

    const admins = await User.find({ isAdmin: true });
    try {
      for (const admin of admins) {
        const to = admin.email;
        await transporter.sendMail({
          from: "support@free-cards.co.uk",
          to,
          subject: "New Customer Signed Up",
          html: `<div style="padding: 5% 25% 5% 25%; font-size: 1.0rem">        
          <img alt="logo" src="http://77.68.33.83/assets/logo.jpg" style="display: flex; margin: auto; width: 250px;"/>
          <h1 style="text-align: center;">New Customer signed up on Free-Cards Website</h1>
          <p>We are thrilled to inform you that a new customer has signed up on Free-Cards, your amazing website dedicated to bringing joy through personalized cards!</p>
          <p>Here are the details of the new customer:</p>
          <p>Name: ${user.name}</p>
          <p>Emali: ${user.email}</p>
          <p>Signup Date: ${user.createdAt}</p>
          <p>Let's continue spreading happiness through thoughtful gestures with Free-Cards!</p>
          <p>Best regards,</p>
          <p>The Free-Cards Team</p>
          </div>`,
        });
      }
      res.json({ message: "Mail sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json();
    }
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//private route

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin =
      req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;
    user.freeCards =
      req.body.freeCards !== undefined ? req.body.freeCards : user.freeCards;
    user.orders = req.body.orders !== undefined ? req.body.orders : user.orders;
    user.spent = req.body.spent !== undefined ? req.body.spent : user.spent;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      freeCards: updatedUser.freeCards,
      spent: updatedUser.spent,
      orders: updatedUser.orders,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const sendRequestMail = asyncHandler(async (req, res) => {
  const token = generateToken(req.body.mailAddress);
  const user = await User.findOne({ email: req.body.mailAddress });

  if (user) {
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    const updatedUser = await user.save();

    const transporter = nodemailer.createTransport({
      host: "Free-cards.co.uk",
      service: "smtp",
      port: 465,
      secure: true,
      auth: {
        user: "Support@free-cards.co.uk",
        pass: "FreeCards@123",
      },
    });

    try {
      const to = req.body.mailAddress;
      await transporter.sendMail({
        from: "support@free-cards.co.uk",
        to,
        subject: "Password Reset",
        html: `<div style="padding: 5% 25% 5% 25%; font-size: 1.0rem">
          <img alt="logo" src="http://77.68.33.83/assets/logo.jpg" style="display: flex; margin: auto; width: 250px;"/>
          <h1 style="text-align: center;">You have requested to reset your 
          password</h1>
          <h3>Hi, ${user.name}</h3>
          <p>We received a request that you want to update your password. You can do this by selecting the button below.</p>
          <a href="http://77.68.33.83/passwordreset/${token}/" style="text-decoration: none; display: block; width: fit-content; margin: 20px auto; padding: 10px; color: white; background-color: #04AA6D; font-size: 14px; border-radius: 25px; box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19); text-align: center;">Update Password</a>
          <p>If you didn't make this request, you don't need to do anything.</p>
          <p>Best regards,</p>    
          <p>The Free-Cards Team</p>   
        </div>`,
        //  href="http://localhost:3000/passwordreset/${token}/" for localhost
      });
      res.json({
        message:
          "We have sent an email to your email address. Follow the steps provided in the email to update your password.",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json();
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ resetPasswordToken: req.body.token });
  if (user) {
    user.password = req.body.password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    const updatedUser = await user.save();
    res.json({
      message: "Password was successfully reset.",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Reset monthly free-cards on the registered day
const resetFreeCards = async () => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();

  const usersToReset = await User.find({
    $expr: {
      $or: [
        {
          $and: [
            { $eq: [{ $dayOfMonth: "$createdAt" }, currentDay] },
            { $lt: [currentDay, 28] },
          ],
        },
        {
          $and: [
            { $gt: [{ $dayOfMonth: "$createdAt" }, 27] },
            { $eq: [currentDay, 28] },
          ],
        },
      ],
    },
  });

  for (const user of usersToReset) {
    user.freeCards = 2;
    await user.save();
  }
};
// Reset Free-Cards every midnight
cron.schedule("0 0 * * *", resetFreeCards);

//  Confirmation email when the order is shipped
const shippedConfirmMail = asyncHandler(async (req, res) => {
  const token = generateToken(req.body.mailAddress);
  const user = await User.findOne({ email: req.body.mailAddress });
  const order = req.body.order;

  if (user) {
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    const updatedUser = await user.save();

    const transporter = nodemailer.createTransport({
      host: "Free-cards.co.uk",
      service: "smtp",
      port: 465,
      secure: true,
      auth: {
        user: "support@free-cards.co.uk",
        pass: "FreeCards@123",
      },
    });

    try {
      const to = req.body.mailAddress;
      await transporter.sendMail({
        from: "support@free-cards.co.uk",
        to,
        subject: "Your order has been shipped",
        html: `<div style="padding: 5% 25% 5% 25%; font-size: 1.0rem">        
          <img alt="logo" src="http://77.68.33.83/assets/logo.jpg" style="display: flex; margin: auto; width: 250px;"/>
          <h1 style="text-align: center;">Your order has been shipped!</h1>
          <img alt="logo" src="http://localhost:4000/logo.png"/>
          <h3>Dear, ${user.name}</h3>
          <p>We're happy to inform you that your order from Free-Cards has been successfully shipped! </p>   
          <p>OrderId: ${order.orderId}</p>                             
          <p>Thank you for using Free-Cards. We hope the cards bring joy and smiles to your loved ones. </p>   
          <p>Best regards,</p>    
          <p>The Free-Cards Team</p>   
        </div>`,
        // href="${req.headers.origin}/api/users/${token}/"
      });
      res.json({
        message:
          "We have sent an email to your email address. Follow the steps provided in the email to update your password.",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json();
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUser,
  getUserById,
  sendRequestMail,
  resetPassword,
  shippedConfirmMail,
};
