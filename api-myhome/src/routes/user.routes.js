const { Router } = require("express");
const { check } = require("express-validator");
const UserController = require("../controllers/user.controller");
const checkFields = require("../middlewares/validateFields");
const checkJwt = require("../middlewares/jwtValidator");

const router = Router();

//Valida JWT del sessionStorage
router.post("/jwt", checkJwt);

//Devuelve todos los usuarios
router.get("/", UserController.getUsers); //GET USUARIOS

//Crea un usuario
router.post(
  "/",
  [
    check("email").not().isEmpty(),
    check("password").not().isEmpty(),
    checkFields,
  ],
  UserController.createUser
); //POST USUARIOS

//Devuelve un usuario por id
router.get("/:id", UserController.getUserById); //GET USUARIOS BY ID

//Loguea un usuario
router.post(
  "/login",
  [
    check("email").not().isEmpty(),
    check("password").not().isEmpty(),
    checkFields,
  ],
  UserController.login
);

module.exports = router;
