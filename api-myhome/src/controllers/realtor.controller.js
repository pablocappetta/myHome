let instance = null;
require("dotenv").config();
const RealtorService = require("../services/realtor.service");
const AuthService = require("../services/auth.service");
const jwt = require("jsonwebtoken");

class RealtorController {
  static getInstance() {
    if (!instance) {
      return new RealtorController();
    }
    return instance;
  }

  async getRealtors(req, res) {
    try {
      const realtors = await RealtorService.getRealtors();
      return res.status(200).json(realtors);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getRealtors",
        message: err,
      });
    }
  }

  async getRealtorByLoginEmail(req, res) {
    const { email } = req.params;
    try {
      const realtor = await RealtorService.getRealtorByLoginEmail(email);
      return res.status(200).json(realtor);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getRealtorByLoginEmail",
        message: err,
      });
    }
  }

  async createRealtor(req, res) {
    const { body } = req;
    try {
      const realtor = await RealtorService.createRealtor(body);
      return res.status(201).json(realtor);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "createRealtor",
        message: err,
      });
    }
  }

  async deleteRealtor(req, res) {
    const { id } = req.params;
    try {
      await RealtorService.deleteRealtor(id);
      return res.status(204).json();
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "deleteRealtor",
        message: err,
      });
    }
  }

  async updateRealtor(req, res) {
    const { body } = req;
    try {
      const realtor = await RealtorService.updateRealtor(body);
      return res.status(200).json(realtor);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "updateRealtor",
        message: err,
      });
    }
  }

  async getRealtorByToken(req, res) {
    const { token } = req;
    try {
      const realtor = await RealtorService.getRealtorByToken(token);
      return res.status(200).json(realtor);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getRealtorByToken",
        message: err,
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      let isUserRegistered = await AuthService.hasValidCredentials(
        email,
        password
      );
      if (isUserRegistered) {
        const user = await RealtorService.getRealtorByLoginEmail(email);

        const token = jwt.sign(user.toJSON(), process.env.PRIVATE_KEY, {
          expiresIn: "1d",
        });

        return res.status(200).json({
          status: 200,
          token,
          message: "Token created successfully.",
        });
      } else {
        return res.status(401).json({
          message: "Unauthorized.",
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "login",
        message: err.message,
      });
    }
  }
}

module.exports = RealtorController.getInstance();
