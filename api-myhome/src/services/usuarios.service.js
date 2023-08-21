const UsuariosModel = require("../models/Usuarios");
const bcrypt = require("bcrypt");

class UsuariosService {
  async getUsers() {
    try {
      const users = await UsuariosModel.find();
      return users;
    } catch (err) {
      console.error(err);
      throw new Error("Error en getUsers Service");
    }
  }

  async getUserById(id) {
    try {
      let user = await UsuariosModel.findOne({ _id: id });
      return user;
    } catch (err) {
      console.error(err);
      throw new Error("Error en getUserById Service");
    }
  }

  async getUserByEmail(email) {
    try {
      let user = await UsuariosModel.findOne({ email });
      return user;
    } catch (err) {
      console.error(err);
      throw new Error("Error en getUserById Service");
    }
  }

  async createUser(user) {
    try {
      let isUserRegistered = await UsuariosModel.findOne({ email: user.email });
      if (isUserRegistered) {
        throw new Error("El usuario ya existe");
      } else {
        user.password = await bcrypt.hash(user.password, 10);
        await UsuariosModel.create(user);
        return user;
      }
    } catch (err) {
      console.error(err);
      throw new Error("Error en createUser Service");
    }
  }
}

module.exports = new UsuariosService();
