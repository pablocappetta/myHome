const { Router } = require("express");
const { check } = require("express-validator");
const ListingController = require("../controllers/listing.controller");
const VisitController = require("../controllers/visit.controller");
const checkFields = require("../middlewares/validateFields");
const checkJwt = require("../middlewares/jwtValidator");
const ImgurStorage = require("multer-storage-imgur");
const multer = require("multer");

const upload = multer({
  storage: ImgurStorage({ clientId: process.env.IMGUR_CLIENT_ID }),
});

const router = Router();

//Valida JWT del sessionStorage
router.post("/jwt", checkJwt);

//Crea una listing
router.post("/", upload.array("images", 10), ListingController.createListing); //POST REALTORS

//Obtener todos los listing
router.get(
  "/place",
  [
    check("listingType").not().isEmpty(),
    check("state").not().isEmpty(),
    check("city").not().isEmpty(),
    checkFields,
  ],
  ListingController.getListingsByPlace
);

//Obtener listings cercanos
router.get(
  "/nearby",
  [
    check("latitude").not().isEmpty(),
    check("longitude").not().isEmpty(),
    check("radius").not().isEmpty(),
    checkFields,
  ],
  ListingController.getListingsNear
);

//Obtener todos los listing
router.get("/", ListingController.getListings);

//Obtener listing por realtor
router.get("/realtor/:realtorId", ListingController.getListingsByRealtorId);



//Obtener listing por id
router.get("/:id", ListingController.getListingById);

//Actualiza un listing
router.put(
  "/:id",
  [
    check("id", "El id de la publicación es obligatorio").not().isEmpty(),
    checkFields,
  ],
  upload.array("images", 10),
  ListingController.updateListing
);

// Borrar un listing
router.delete(
  "/:id",
  [
    check("id", "El id de la publicación es obligatorio").not().isEmpty(),
    checkFields,
  ],
  ListingController.deleteListing
);

router.get("/:listingId/visits/", VisitController.getVisitsByListingId);
router.post("/:listingId/visits/", VisitController.createVisit);
router.put("/:listingId/visits/:visitId", VisitController.updateVisit);
router.delete("/:listingId/visits/:visitId", VisitController.deleteVisit);

module.exports = router;
