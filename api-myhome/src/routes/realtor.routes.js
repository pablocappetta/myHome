const { Router } = require("express");
const { check } = require("express-validator");
const RealtorController = require("../controllers/realtor.controller");
const checkFields = require("../middlewares/validateFields");
const checkJwt = require("../middlewares/jwtValidator");
const RealtorService = require("../services/realtor.service");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

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
router.get("/:email", RealtorController.getRealtorByLoginEmail);

//Loguea un usuario
router.post(
  "/login",
  [
    check("email").not().isEmpty(),
    check("password").not().isEmpty(),
    checkFields,
  ],
  RealtorController.login
);

//Restablece la contraseña de un usuario
router.post("/password-reset", async (req, res) => {
  const { email: loginEmail } = req.body;

  const realtor = await RealtorService.getRealtorByLoginEmail(loginEmail);

  if (realtor) {
    const token = jwt.sign({ loginEmail }, process.env.PRIVATE_KEY, {
      expiresIn: "1h",
    });

    const transporter = nodemailer.createTransport({
      service: "Outlook",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: loginEmail,
      subject: "myHome - Solicitud de restablecimiento contraseña",
      html: `
      <p>¡Hola, ${realtor.name}</p>
      <p>Has solicitado restablecer tu contraseña. Para hacerlo, por favor copiá el siguiente código en la aplicación:</p>
      <p><b>${token}</b></p>
      <p>Si no solicitaste este restablecimiento de contraseña, puedes ignorar este mensaje.</p>
      <p>Saludos,</p>
      <b>El equipo de myHome</b>
      `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Error al enviar el email",
        });
      } else {
        console.log(info);
        return res.status(200).json({
          message: "Se ha enviado un email para restablecer la contraseña",
        });
      }
    });

    res.status(200).json({
      message: "Se ha enviado un email para restablecer la contraseña",
    });
  } else {
    res.status(404).json({
      message: "No se ha encontrado el usuario",
    });
  }
});

//Restablece la contraseña de un usuario
router.post("/password-reset/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const { loginEmail } = jwt.verify(token, process.env.PRIVATE_KEY);

    const realtor = await RealtorService.getRealtorByLoginEmail(loginEmail);

    if (realtor) {
      realtor.password = await bcrypt.hash(password, 10);
      await RealtorService.updateRealtor(realtor);
      res.status(200).json({
        message: "Contraseña actualizada correctamente",
      });
    } else {
      res.status(404).json({
        message: "No se ha encontrado el usuario",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error al actualizar la contraseña",
    });
  }
});

module.exports = router;
