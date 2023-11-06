const { Router } = require("express");
const { check } = require("express-validator");
const ListingController = require("../controllers/listing.controller");
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
router.post("/", ListingController.createListing); //POST REALTORS

//Obtener todos los listing
router.get(
  "/",
  [
    check("listingType").not().isEmpty(),
    check("state").not().isEmpty(),
    check("city").not().isEmpty(),
    checkFields,
  ],
  ListingController.getListingsByPlace
);

//Obtener listing por id
router.get("/:id", ListingController.getListingById);

//Obtener listing por realtor
router.get("/realtor/:realtorId", ListingController.getListingsByRealtorId);

//Actualizar listing
router.put("/", ListingController.updateListing);

//Agregar imagenes a un listing
router.post(
  "/:id/images",
  upload.array("images", 10),
  ListingController.addImages
);

module.exports = router;
