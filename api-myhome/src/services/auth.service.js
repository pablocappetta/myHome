require("dotenv").config();
const bcrypt = require("bcrypt");
const RealtorModel = require("../models/Realtor");

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
}

module.exports = new AuthService();
