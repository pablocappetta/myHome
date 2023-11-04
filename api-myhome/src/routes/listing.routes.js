const { Router } = require("express");
const { check } = require("express-validator");
const ListingController = require("../controllers/listing.controller");
const checkFields = require("../middlewares/validateFields");
const checkJwt = require("../middlewares/jwtValidator");

const router = Router();

//Valida JWT del sessionStorage
router.post("/jwt", checkJwt);

//Crea una listing
router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").not().isEmpty(),
    check("property").not().isEmpty(),
    check("cardinalOrientation").not().isEmpty(),
    check("relativeOrientation").not().isEmpty(),
    check("rooms").not().isEmpty(),
    check("bathrooms").not().isEmpty(),
    check("parking").not().isEmpty(),
    check("hasGarden").not().isEmpty(),
    check("hasTerrace").not().isEmpty(),
    check("hasBalcony").not().isEmpty(),
    check("hasStorageUnit").not().isEmpty(),
    check("amenities").not().isEmpty(),
    check("photos").not().isEmpty(),
    check("expensesPrice").not().isEmpty(),
    check("realtorId").not().isEmpty(),
    check("type").not().isEmpty(),
    check("price").not().isEmpty(),
    checkFields,
  ],
  ListingController.createListing
); //POST USUARIOS

module.exports = router;
