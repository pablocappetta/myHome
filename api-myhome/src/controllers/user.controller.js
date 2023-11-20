let instance = null;
require("dotenv").config();
const jwt = require("jsonwebtoken");
const UserService = require("../services/users.service");
const AuthService = require("../services/auth.service");
const { NotFoundError } = require("../middlewares/errorHandler");

class UserController {
  static getInstance() {
    if (!instance) {
      instance = new UserController();
    }
    return instance;
  }

  async getUsers(req, res, next) {
    try {
      const users = await UserService.getUsers();
      return res.status(200).json(users);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async getUserById(req, res, next) {
    try {
      const id = req.params.id;
      let user = await UserService.getUserById(id);
      if (!user) {
        throw new NotFoundError("User not found.");
      }
      return res.status(200).json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async createUser(req, res, next) {
    try {
      const newUser = await UserService.createUser(req.body);
      return res.status(201).json(newUser);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async login(req, res, next) {
    //TODO: implementar login con google
  }
}

module.exports = UserController.getInstance();
