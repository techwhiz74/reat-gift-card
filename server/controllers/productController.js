const asyncHandler = require("express-async-handler");
const Product = require("../models/product.js");

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: req.body.name || "Card name",
    imageUrl: req.body.imageUrl,
    blankUrl: req.body.blankUrl,
    preSMSUrl: req.body.preSMSUrl,
    category: req.body.category || "No occasion",
    price: req.body.price || 0,
    postageFee: req.body.postageFee || 0,
    sales: req.body.sales || 0,
    trending: req.body.trending || false,
    fontName: req.body.fontName,
    fontUrl: req.body.fontUrl,
    fontColor: req.body.color,
    filters: req.body.filters || [],
    imagePositions: [
      parseFloat(req.body.imagePositions[0]),
      parseFloat(req.body.imagePositions[1]),
      parseFloat(req.body.imagePositions[2]),
      parseFloat(req.body.imagePositions[3]),
    ],
    textPositions: [
      parseFloat(req.body.textPositions[0]),
      parseFloat(req.body.textPositions[1]),
      parseFloat(req.body.textPositions[2]),
      parseFloat(req.body.textPositions[3]),
    ],
    description: req.body.description || "No description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// For Admin ProductsPage
const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        category: {
          $regex: req.query.keyword,
          $options: "i", //case insensitive
        },
      }
    : {};
  const products = await Product.find({ ...keyword });
  res.json({ products });
});

// For ThemeScreen with pagination
const getAllProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = req.query.pageNumber || 1;

  const keyword = req.query.keyword
    ? {
        // name: {
        //   $regex: req.query.keyword,
        //   $options: "i", //case insensitive
        // },
        category: {
          $regex: req.query.keyword,
          $options: "i", //case insensitive
        },
      }
    : {};
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    postageFee,
    sales,
    category,
    description,
    imageUrl,
    blankUrl,
    frontUrl,
    preSMSUrl,
    middleUrl,
    trending,
    fontName,
    fontUrl,
    fontColor,
    filters,
    imagePositions,
    textPositions,
  } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.postageFee = postageFee || product.postageFee;
    product.sales = sales === undefined ? product.sales : sales;
    product.description = description || product.description;
    product.imageUrl = imageUrl || product.imageUrl;
    product.blankUrl = blankUrl || product.blankUrl;
    product.frontUrl = frontUrl;
    product.preSMSUrl = preSMSUrl || product.preSMSUrl;
    product.middleUrl = middleUrl;
    product.category = category || product.category;
    product.trending = trending === undefined ? product.trending : trending;
    product.fontName = fontName || product.fontName;
    product.fontUrl = fontUrl || product.fontUrl;
    product.fontColor = fontColor || product.fontColor;
    product.filters = filters || product.filters;
    product.imagePositions = imagePositions || product.imagePositions;
    product.textPositions = textPositions || product.textPositions;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ sales: -1 }).limit(5);
  res.json(products);
});

module.exports = {
  getProducts,
  getAllProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
};
