const validator = require("validator");

const validateSignupData = (userData) => {
  const { firstName, lastName, emailId, password } = userData;

  if (!firstName || firstName.length < 3) {
    throw new Error("firstName is required with minumum 3 characters");
  }

  if (!lastName || lastName.length < 3) {
    throw new Error("lastName is required with minumum 3 characters");
  }

  if (!emailId || !validator.isEmail(emailId.toLowerCase().trim())) {
    throw new Error("A valid email is required");
  }

  if (!password || !validator.isStrongPassword(password)) {
    throw new Error(
      "A strong password is required, password contains (min 8 chars, with letters, numbers & symbols)"
    );
  }
};

const validateLoginData = (userData) => {
  const { emailId, password } = userData;

  if (!emailId || !validator.isEmail(emailId.toLowerCase().trim())) {
    throw new Error("A valid email is required");
  }

  if (!password) {
    throw new Error("Password is required");
  }
};

const validateCategoryData = (data) => {
  const { name, imageUrl, itemsCount } = data;

  if (!name || name.trim().length < 3 || name.trim().length > 50) {
    throw new Error(
      "Category name is required with minimum 3 characters and maximum 50 characters"
    );
  }

  if (!imageUrl || !validator.isURL(imageUrl)) {
    throw new Error("A valid image URL is required");
  }

  if (itemsCount === undefined || typeof itemsCount !== "number") {
    throw new Error("itemsCount is required and must be a number");
  }
};

const validateEditCategoryData = (data) => {
  const allowedFields = ["name", "imageUrl", "itemsCount"];
  const inputFields = Object.keys(data);

  inputFields.forEach((field) => {
    if (!allowedFields.includes(field)) {
      throw new Error(`Unexpected field: ${field}`);
    }
  });

  const { name, imageUrl, itemsCount } = data;

  if (name && (name.trim().length < 3 || name.trim().length > 50)) {
    throw new Error(
      "Category name is required with minimum 3 characters and maximum 50 characters"
    );
  }

  if (imageUrl && !validator.isURL(imageUrl)) {
    throw new Error("A valid image URL is required");
  }

  if (data.hasOwnProperty("itemsCount") && typeof itemsCount !== "number") {
    throw new Error("itemsCount must be a number");
  }
};

module.exports = {
  validateSignupData,
  validateLoginData,
  validateCategoryData,
  validateEditCategoryData,
};
