const asyncHandler = require("express-async-handler");
const Category = require("../models/category.js");

const createCategory = asyncHandler(async (req, res) => {
  const category = new Category({
    name: req.body.name || "No category",
    card: req.body.card,
    imageUrl: req.body.imageUrl,
    filters: req.body.filters,
  });

  const createdCategory = await category.save();
  res.status(201).json(createdCategory);
});

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    await category.remove();
    res.json({ message: "Category removed" });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  const { name, card, imageUrl, filters } = req.body;

  const category = await Category.findById(req.params.id);

  if (category) {
    category.name = name;
    category.card = card;
    category.imageUrl = imageUrl;
    category.filters = filters;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  deleteCategory,
  updateCategory,
};
