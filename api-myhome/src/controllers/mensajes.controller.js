const MensajesService = require("../services/mensajes.service");
let instance = null;

class MensajesController {
  static getInstance() {
    if (!instance) {
      return new MensajesController();
    }
    return instance;
  }

  async getMessages(req, res) {
    try {
      const messages = await MensajesService.getMessages();
      return res.status(200).json(messages);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getMessages",
        message: err,
      });
    }
  }

  async getMessageById(req, res) {
    try {
      const id = req.params.id;
      let message = await MensajesService.getMessageById(id);
      if (!message) {
        return res.status(404).json({
          method: "getMessageById",
          message: "Not Found",
        });
      }
      return res.status(200).json(message);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getMessageById",
        message: err,
      });
    }
  }

  async createMessage(req, res) {
    try {
      const message = req.body;
      const newMessage = await MensajesService.createMessage(message);

      return res.status(201).json({
        message: newMessage,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "createMessage",
        message: err.message,
      });
    }
  }

  async deleteMessage(req, res) {
    try {
      let isMessage = await MensajesService.getMessageById(req.params.id);
      if (isMessage) {
        await MensajesService.deleteMessage(req.params.id);
        return res.status(204).json({ message: "No Content" });
      }
      return res.status(404).json({ message: "Not Found" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "deleteMessage",
        message: err,
      });
    }
  }
}

module.exports = new MensajesController();
