const mongoose = require("mongoose");
const ValidationError = mongoose.Error.ValidationError;
const UserModel = require("../models/User");

class RealtorUserService {
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
    const isUserRegistered = await this.getUserByEmail(user.email);
    if (isUserRegistered) {
      throw new Error("El usuario ya existe");
    }
    try {
      return await UserModel.create(user);
    } catch (err) {
      console.error(err);
      if (err instanceof ValidationError) {
        throw new Error("Invalid input data.");
      }
      throw new Error("Error en createUser Service");
    }
  }
}

module.exports = new RealtorUserService();
