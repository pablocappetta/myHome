let instance = null;
require("dotenv").config();
const RealtorService = require("../services/realtor.service");
const AuthService = require("../services/auth.service");

class RealtorController {
  static getInstance() {
    if (!instance) {
      return new RealtorController();
    }
    return instance;
  }

  async getRealtors(req, res, next) {
    try {
      const realtors = await RealtorService.getRealtors();
      return res.status(200).json(realtors);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async getRealtorById(req, res, next) {
    try {
      const { realtorId } = req.params;
      const realtor = await RealtorService.getRealtorById(realtorId);
      return res.status(200).json(realtor);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async passwordResetStart(req, res, next) {
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
      <p>¡Hola, ${realtor.name}!</p>
      <p>Has solicitado restablecer tu contraseña. Para hacerlo, por favor copiá el siguiente código en la aplicación:</p>
      <p><b>${token}</b></p>
      <p>Si no solicitaste este restablecimiento de contraseña, podés ignorar este mensaje.</p>
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
  }

  async passwordResetFinish(req, res, next) {
    try {
      const { token } = req.params;
      const { password } = req.body;
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
  }

  async createRealtor(req, res, next) {
    try {
      const { body } = req;
      const realtor = await RealtorService.createRealtor(body);
      return res.status(201).json(realtor);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async deleteRealtor(req, res, next) {
    try {
      const { realtorId } = req.params;
      const existingRealtor = await RealtorService.getRealtorById(realtorId);

      if (!existingRealtor) {
        return res.status(404).json({ error: "La inmobiliaria no existe" });
      }

      await RealtorService.deleteRealtor(realtorId);
      return res.status(200).json();
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async updateRealtor(req, res, next) {
    try {
      const { realtorId } = req.params;
      const realtor = req.body;
      const updatedRealtor = await RealtorService.updateRealtor(
        realtorId,
        realtor
      );
      return res.status(200).json(updatedRealtor);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async changeRealtorLogo(req, res, next) {
    const { id } = req.params;
    const image = req.files;
    try {
      const realtor = await RealtorService.changeRealtorLogo(id, image);
      return res.status(200).json(realtor);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async getRealtorByToken(req, res, next) {
    try {
      const { token } = req;
      const realtor = await RealtorService.getRealtorByToken(token);
      return res.status(200).json(realtor);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const realtor = await RealtorService.login(
        req.body.email,
        req.body.password
      );
      const token = await AuthService.generateLoginToken(
        realtor._id,
        "realtor"
      );
      return res.status(200).json({ token: token, realtor: realtor });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async addReview(req, res, next) {
    try {
      const { realtorId } = req.params;
      const review = req.body;
      const updatedRealtor = await RealtorService.addReview(realtorId, review);
      return res.status(200).json(updatedRealtor);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async addNotification(req, res, next) {
    try {
      const { realtorId } = req.params;
      const notification = req.body;
      const notifications = await RealtorService.addNotification(
        realtorId,
        notification
      );
      return res.status(201).json(notifications);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async deleteNotification(req, res, next) {
    try {
      const { realtorId, notificationId } = req.params;
      const notifications = await RealtorService.deleteNotification(
        realtorId,
        notificationId
      );
      return res.status(200).json(notifications);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}

module.exports = RealtorController.getInstance();
