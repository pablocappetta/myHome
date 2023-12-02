const { Router } = require("express");
const VisitController = require("../controllers/visit.controller");

const router = Router();

// Add routes for VisitController
router.get("/:id", VisitController.getVisitById);
router.post("/", VisitController.createVisit);
router.put("/:id", VisitController.updateVisit);
router.delete("/:id", VisitController.deleteVisit);

module.exports = router;
