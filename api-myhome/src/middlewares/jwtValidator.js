require("dotenv").config();
const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJwt = async (req, res = response, next) => {
  try {
    const jwtValidate = jwt.verify(
      req.body.jwt ?? req.headers.authorization.split(" ")[1],
      process.env.PRIVATE_KEY
    );
    if (jwtValidate) {
      res.status(200).json({
        message: "Usuario autorizado",
      });
      next();
    } else {
      return res.status(401).json({
        message: "Usuario no autorizado",
      });
    }
  } catch (err) {
    return res.status(401).json({
      message: "Usuario no autorizado",
    });
  }
};

module.exports = validateJwt;
