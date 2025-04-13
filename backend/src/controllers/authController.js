const User = require("../models/User");
const errorResponse = require("../utils/errorResponse");

const signup = async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;

    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return errorResponse(res, 400, "Email already registered");
    }

    const user = new User({ firstName, lastName, emailId, password });
    await user.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    errorResponse(res, 400, error.message);
  }
};

const login = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });
    if (!user) return errorResponse(res, 401, "Invalid credentials");

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) return errorResponse(res, 401, "Invalid credentials");

    const token = await user.getJwt();

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        emailId: user.emailId,
      },
    });
  } catch (error) {
    errorResponse(res, 400, error.message);
  }
};

module.exports = {
  signup,
  login,
};
