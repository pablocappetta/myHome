require("dotenv").config();
const bcrypt = require("bcrypt");
const RealtorModel = require("../models/Realtor");
const { InternalServerError } = require("../middlewares/errorHandler");
const jwt = require("jsonwebtoken");

class AuthService {
  async hasValidCredentials(loginEmail, password) {
    try {
      const user = await RealtorModel.findOne({ loginEmail });

      const passwordMatch = bcrypt.compareSync(password, user.password);

      if (user && passwordMatch) {
        return true;
      }

      return false;
    } catch (err) {
      console.error(err);
      throw new Error("Error al validar credenciales");
    }
  }

  async generateLoginToken(id, type) {
    try {
      const token = jwt.sign(
        {
          id: id,
          type: type,
        },
        process.env.PRIVATE_KEY,
        { expiresIn: "1d" }
      );
      return token;
    } catch (err) {
      console.error(err);
      throw new InternalServerError("Error al generar token");
    }
  }

  async generatePasswordResetToken(loginEmail) {
    try {
      const token = jwt.sign(
        {
          loginEmail: loginEmail,
        },
        process.env.PRIVATE_KEY,
        { expiresIn: "1h" }
      );
      return token;
    } catch (err) {
      console.error(err);
      throw new InternalServerError("Error al generar token");
    }
  }

  async getLoginEmailFromPasswordResetToken(token) {
    try {
      const { loginEmail } = jwt.verify(token, process.env.PRIVATE_KEY);
      return loginEmail;
    } catch (err) {
      console.error(err);
      throw new InternalServerError("Error al obtener loginEmail");
    }
  }
}

module.exports = new AuthService();
