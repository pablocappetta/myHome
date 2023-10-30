const { Router } = require("express");
const { check } = require("express-validator");
const UserController = require("../controllers/user.controller");
const checkFields = require("../middlewares/validateFields");
const checkJwt = require("../middlewares/jwtValidator");

const router = Router();

//Valida JWT del sessionStorage
router.post("/jwt", checkJwt);

//Devuelve todos los usuarios
router.get("/", UserController.getUsuarios); //GET USUARIOS

//Crea un usuario
router.post(
  "/",
  // [
  //   check("name").not().isEmpty(),
  //   check("last_name").not().isEmpty(),
  //   check("email").not().isEmpty(),
  //   check("password").not().isEmpty(),
  //   check("role").not().isEmpty(),
  //   check("google").not().isEmpty(),
  //   check("phone").not().isEmpty(),
  //   checkFields,
  // ],
  UserController.createUsuario
); //POST USUARIOS

//Devuelve un usuario por id
router.get("/:id", UserController.getUsuarioById); //GET USUARIOS BY ID

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
