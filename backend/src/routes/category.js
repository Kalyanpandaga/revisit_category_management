const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
  validateCategoryData,
  validateEditCategoryData,
} = require("../utils/validate");
const {
  getAllCategories,
  createCategory,
  updateCategory,
} = require("../controllers/categoryController");
const validateRequest = require("../middleware/validateMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getAllCategories);
router.post("/", validateRequest(validateCategoryData), createCategory);
router.put("/:id", validateRequest(validateEditCategoryData), updateCategory);

module.exports = router;
