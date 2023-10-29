let instance = null;
require("dotenv").config();
const RealtorService = require("../services/realtor.service");

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

  async getRealtorById(req, res) {
    const { id } = req.params;
    try {
      const realtor = await RealtorService.getRealtorById(id);
      return res.status(200).json(realtor);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getRealtorById",
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
}

module.exports = RealtorController.getInstance();