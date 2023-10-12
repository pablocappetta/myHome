require("dotenv").config();
const bcrypt = require("bcrypt");
const UserModel = require("../models/Users");

class AuthService {
  async hasValidCredentials(email, password) {
    try {
      const user = await UserModel.findOne({ email });

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
