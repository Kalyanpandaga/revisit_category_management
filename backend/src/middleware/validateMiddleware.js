const errorResponse = require("../utils/errorResponse");

const validateRequest = (validateFn) => {
  return (req, res, next) => {
    try {
      validateFn(req.body);
      next();
    } catch (error) {
      errorResponse(res, 400, error.message);
    }
  };
};

module.exports = validateRequest;
