const UserModel = require("../models/Users");
const bcrypt = require("bcrypt");

class UserService {
  async getUsers() {
    try {
      const users = await UserModel.find();
      return users;
    } catch (err) {
      console.error(err);
      throw new Error("Error en getUsers Service");
    }
  }

  async getUserById(id) {
    try {
      const user = await UserModel.findOne({ _id: id });
      return user;
    } catch (err) {
      console.error(err);
      throw new Error("Error en getUserById Service");
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await UserModel.findOne({ email });
      return user;
    } catch (err) {
      console.error(err);
      throw new Error("Error en getUserById Service");
    }
  }

  async createUser(user) {
    try {
      const isUserRegistered = await UserModel.findOne({ email: user.email });
      if (isUserRegistered) {
        throw new Error("El usuario ya existe");
      } else {
        user.password = await bcrypt.hash(user.password, 10);
        await UserModel.create(user);
        return user;
      }
    } catch (err) {
      console.error(err);
      throw new Error("Error en createUser Service");
    }
  }
}

module.exports = new UserService();
