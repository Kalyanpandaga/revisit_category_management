const express = require("express");
const { signup, login } = require("../controllers/authController");
const validateRequest = require("../middleware/validateMiddleware");
const { validateSignupData, validateLoginData } = require("../utils/validate");

const router = express.Router();

router.post("/signup", validateRequest(validateSignupData), signup);
router.post("/login", validateRequest(validateLoginData), login);

module.exports = router;
