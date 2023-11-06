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
      throw err;
    }
  }

  async getRealtorByLoginEmail(req, res) {
    const { email } = req.params || req.body;
    try {
      const realtor = await RealtorService.getRealtorByLoginEmail(email);
      return res.status(200).json(realtor);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getRealtorById(req, res) {
    const { id } = req.params;
    try {
      const realtor = await RealtorService.getRealtorById(id);
      return res.status(200).json(realtor);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async createRealtor(req, res) {
    const { body } = req;
    try {
      const realtor = await RealtorService.createRealtor(body);
      return res.status(201).json(realtor);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async deleteRealtor(req, res) {
    const { id } = req.params;
    try {
      await RealtorService.deleteRealtor(id);
      return res.status(204).json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async updateRealtor(req, res) {
    const { body } = req;
    try {
      const realtor = await RealtorService.updateRealtor(body);
      return res.status(200).json(realtor);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getRealtorByToken(req, res) {
    const { token } = req;
    try {
      const realtor = await RealtorService.getRealtorByToken(token);
      return res.status(200).json(realtor);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async login(req, res) {
    try {
      const realtor = await RealtorService.login(
        req.body.email,
        req.body.password
      );
      const token = jwt.sign(realtor.toJSON(), process.env.PRIVATE_KEY, {
        expiresIn: "1d",
      });
      const user = await RealtorService.getRealtorByLoginEmail(req.body.email);
      const data = {
        _id: user._id,
        name: user.name,
        loginEmail: user.loginEmail,
        phone: user.phone,
        logo: user?.logo,
        reviews: user?.reviews,
        creationDate: user.creationDate,
      };
      return res.status(200).json({ token: token, data: data });
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = RealtorController.getInstance();
