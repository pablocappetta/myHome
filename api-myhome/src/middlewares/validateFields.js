const { validationResult } = require("express-validator");
const { BadRequestError } = require("./errorHandler");

const checkFields = (req, res, next) => {
  const errorsOcurred = validationResult(req);
  if (!errorsOcurred.isEmpty()) {
    next(new BadRequestError("Error en checkFields middleware"));
  } else {
    next();
  }
};

module.exports = checkFields;
