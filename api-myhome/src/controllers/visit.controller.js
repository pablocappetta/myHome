let instance = null;
require("dotenv").config();
const VisitService = require("../services/visit.service");

class VisitController {
  static getInstance() {
    if (!instance) {
      return new VisitController();
    }
    return instance;
  }

  async createVisit(req, res, next) {
    try {
      const listingId = req.params.listingId;
      const { body } = req;
      body.listingId = listingId;
      const visit = await VisitService.createVisit(body);
      return res.status(201).json(visit);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async getVisitsByListingId(req, res) {
    try {
      const { listingId } = req.params;
      const visit = await VisitService.getVisitsByListingId(listingId);
      if (!visit) {
        res.status(404).json({ error: "Visit not found" });
      } else {
        res.status(200).json(visit);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateVisit(req, res) {
    try {
      const visitId = req.params.visitId;
      const visit = await VisitService.updateVisit(visitId, req.body);
      if (!visit) {
        res.status(404).json({ error: "Visit not found" });
      } else {
        res.status(200).json(visit);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteVisit(req, res) {
    try {
      const visitId = req.params.visitId;
      console.log(visitId);
      const visit = await VisitService.deleteVisit(visitId);
      if (!visit) {
        res.status(404).json({ error: "Visit not found" });
      } else {
        res.status(200).json({ message: "Visit deleted successfully" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = VisitController.getInstance();
