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
    checkJwt,
    check("id", "El id de la publicación es obligatorio")
      .not()
      .isEmpty(),
    checkFields,
  ],
  ListingController.updateListing
);

//Agregar imagenes a un listing
router.post(
  "/:id/images",
  upload.array("images", 10),
  ListingController.addImages
);


// Borrar un listing
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedListing = await ListingService.deleteListing(id);

    if (!deletedListing) {
      return res.status(404).json({ message: "No se encontró esa propiedad." });
    }

    return res.status(204).json();
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
