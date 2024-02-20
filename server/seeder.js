import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import users from './data/users.js';
import products from './data/products.js';
import connectDB from './config/database.js';
import Order from './models/order.js';
import Product from './models/product.js';
import User from './models/user.js';

dotenv.config();
connectDB(() => {});

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUser,
    }));
    await Product.insertMany(sampleProducts);

    console.log('Data imported!'.green.inverse);
  } catch (error) {
    console.log(`${error.message}.red.inverse`);
  }
};

const destroytData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
  } catch (error) {
    console.log(`${error.message}.red.inverse`);
  }
};

if (process.argv[2] === '-d') {
  destroytData();
} else {
  importData();
}
