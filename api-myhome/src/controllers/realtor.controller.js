let instance = null;
require("dotenv").config();
const RealtorService = require("../services/realtor.service");
const jwt = require("jsonwebtoken");

class RealtorController {
  static getInstance() {
    if (!instance) {
      return new RealtorController();
    }
    return instance;
  }

  async getRealtors(req, res, next) {
    try {
      const realtors = await RealtorService.getRealtors();
      return res.status(200).json(realtors);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async getRealtorById(req, res, next) {
    const { realtorId } = req.params;
    try {
      const realtor = await RealtorService.getRealtorById(realtorId);
      return res.status(200).json(realtor);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async createRealtor(req, res, next) {
    const { body } = req;
    try {
      const realtor = await RealtorService.createRealtor(body);
      return res.status(201).json(realtor);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async deleteRealtor(req, res, next) {
    const { id } = req.params;
    try {
      await RealtorService.deleteRealtor(id);
      return res.status(204).json();
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async updateRealtor(req, res, next) {
    const { realtorId } = req.params;
    const realtor = req.body;
    try {
      const updatedRealtor = await RealtorService.updateRealtor(
        realtorId,
        realtor
      );
      return res.status(200).json(updatedRealtor);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async getRealtorByToken(req, res, next) {
    const { token } = req;
    try {
      const realtor = await RealtorService.getRealtorByToken(token);
      return res.status(200).json(realtor);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const realtor = await RealtorService.login(
        req.body.email,
        req.body.password
      );
      const token = jwt.sign(realtor.toJSON(), process.env.PRIVATE_KEY, {
        expiresIn: "1d",
      });
      return res.status(200).json({ token: token, data: realtor });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async addReview(req, res, next) {
    const { realtorId } = req.params;
    const review = req.body;

    try {
      const updatedRealtor = await RealtorService.addReview(realtorId, review);
      return res.status(200).json(updatedRealtor);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}

module.exports = RealtorController.getInstance();
