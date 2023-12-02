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

    async createVisit(req, res) {
        try {
            const visit = await VisitService.createVisit(req.body);
            res.status(201).json(visit);
        } catch (error) {
            res.status(500).json({ error: error.message });
            next(error);
        }
    }

    async getVisitById(req, res) {
        try {
            const { id } = req.params;
            const visit = await VisitService.getVisit(id);
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
            const { id } = req.params;
            const visit = await VisitService.updateVisit(id, req.body);
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
            const { id } = req.params;
            const visit = await VisitService.deleteVisit(id);
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
