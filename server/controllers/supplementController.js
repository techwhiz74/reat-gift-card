const asyncHandler = require("express-async-handler");
const Supplement = require("../models/supplement.js");

const createSupplement = asyncHandler(async (req, res) => {
  const supplement = new Supplement({
    name: req.body.name || "Suggested product",
    imageUrl: req.body.imageUrl,
    blankUrl: req.body.blankUrl,
    category: req.body.category || "Default category",
    occasion: req.body.occasion || [],
    price: req.body.price || 0,
    shipping: req.body.shipping || 0,
    sales: req.body.sales || 0,
    description: req.body.description || "No description",
    popular: req.body.popular || false,
    fontName: req.body.fontName,
    fontUrl: req.body.fontUrl,
    fontColor: req.body.color,
    reviews: req.body.reviews || 0,
    textPositions: [
      parseFloat(req.body.textPositions[0]),
      parseFloat(req.body.textPositions[1]),
      parseFloat(req.body.textPositions[2]),
      parseFloat(req.body.textPositions[3]),
    ],
    subTextPositions: [
      parseFloat(req.body.subTextPositions[0]),
      parseFloat(req.body.subTextPositions[1]),
      parseFloat(req.body.subTextPositions[2]),
      parseFloat(req.body.subTextPositions[3]),
    ],
  });

  const createdSupplement = await supplement.save();
  res.status(201).json(createdSupplement);
});

const getSupplements = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        category: {
          $regex: req.query.keyword,
          $options: "i", //case insensitive
        },
      }
    : {};
  const supplements = await Supplement.find({ ...keyword });
  res.json({ supplements });
});

const getAllSupplements = asyncHandler(async (req, res) => {
  const pageSize = 5;
  const page = req.query.pageNumber || 1;

  const keyword = req.query.keyword
    ? {
        category: {
          $regex: req.query.keyword,
          $options: "i", //case insensitive
        },
      }
    : {};
  const count = await Supplement.countDocuments({ ...keyword });
  const supplements = await Supplement.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ supplements, page, pages: Math.ceil(count / pageSize) });
});

const getSupplementById = asyncHandler(async (req, res) => {
  const supplement = await Supplement.findById(req.params.id);
  if (supplement) {
    res.json(supplement);
  } else {
    res.status(404);
    throw new Error("Supplement not found");
  }
});

const deleteSupplement = asyncHandler(async (req, res) => {
  const supplement = await Supplement.findById(req.params.id);
  if (supplement) {
    await supplement.remove();
    res.json({ message: "Supplement removed" });
  } else {
    res.status(404);
    throw new Error("Supplement not found");
  }
});

const updateSupplement = asyncHandler(async (req, res) => {
  const {
    name,
    imageUrl,
    blankUrl,
    frontUrl,
    category,
    occasion,
    price,
    shipping,
    description,
    popular,
    sales,
    fontName,
    fontUrl,
    fontColor,
    reviews,
    textPositions,
    subTextPositions,
  } = req.body;

  const supplement = await Supplement.findById(req.params.id);

  if (supplement) {
    supplement.name = name || supplement.name;
    supplement.price = price || supplement.price;
    supplement.shipping = shipping || supplement.shipping;
    supplement.sales = sales === undefined ? supplement.sales : sales;
    supplement.description = description || supplement.description;
    supplement.imageUrl = imageUrl || supplement.imageUrl;
    supplement.blankUrl = blankUrl || supplement.blankUrl;
    supplement.frontUrl = frontUrl;
    supplement.category = category || supplement.category;
    supplement.occasion = occasion || supplement.occasion;
    supplement.popular = popular === undefined ? supplement.popular : popular;
    supplement.fontName = fontName || supplement.fontName;
    supplement.fontUrl = fontUrl || supplement.fontUrl;
    supplement.fontColor = fontColor || supplement.fontColor;
    supplement.reviews = reviews || supplement.reviews;
    supplement.textPositions = textPositions || supplement.textPositions;
    supplement.subTextPositions =
      subTextPositions || supplement.subTextPositions;

    const updatedSupplement = await supplement.save();
    res.json(updatedSupplement);
  } else {
    res.status(404);
    throw new Error("Supplement not found");
  }
});

module.exports = {
  getSupplements,
  getAllSupplements,
  getSupplementById,
  deleteSupplement,
  createSupplement,
  updateSupplement,
};
