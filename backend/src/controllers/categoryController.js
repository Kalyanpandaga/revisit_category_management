const errorResponse = require("../utils/errorResponse");
const Category = require("../models/Category");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().select({
      _id: 1,
      name: 1,
      imageUrl: 1,
      itemsCount: 1,
    });
    res.json({
      success: true,
      message: "Categories fetched successfully",
      categories: categories,
    });
  } catch (error) {
    errorResponse(res, 400, error.message);
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, imageUrl, itemsCount } = req.body;

    const category = new Category({
      name,
      imageUrl,
      itemsCount,
    });

    await category.save();
    res.status(201).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    errorResponse(res, 400, error.message);
  }
};

const updateCategory = async (req, res) => {
  try {
    const editData = req.body;
    const category = await Category.findById(req.params.id);

    if (!category) {
      throw new Error("Category not found");
    }

    Object.keys(editData).forEach((key) => {
      category[key] = editData[key];
    });

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
    });
  } catch (error) {
    errorResponse(res, 400, error.message);
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
};
