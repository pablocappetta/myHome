const { Router } = require("express");
const { check } = require("express-validator");
const RealtorController = require("../controllers/realtor.controller");
const checkFields = require("../middlewares/validateFields");
const checkJwt = require("../middlewares/jwtValidator");

const router = Router();

//Valida JWT del sessionStorage
router.post("/jwt", checkJwt);

//Crea un usuario
router.post(
  "/",
  [
    check("name").not().isEmpty(),
    check("loginEmail").not().isEmpty(),
    check("password").not().isEmpty(),
    check("contactEmail").not().isEmpty(),
    checkFields,
  ],
  RealtorController.createRealtor
); //POST USUARIOS

//Obtiene un usuario por su loginEmail
router.get("/:email", RealtorController.getRealtorByLoginEmail); //GET USUARIOS

module.exports = router;
