const MensajesModel = require("../models/Mensajes");

class MensajesService {
  async getMessages() {
    try {
      const messages = await MensajesModel.find();
      return messages;
    } catch (err) {
      console.error(err);
      throw new Error("Error en getMessages Service");
    }
  }

  async getMessageById(id) {
    try {
      const message = await MensajesModel.findOne({ _id: id });
      return message;
    } catch (err) {
      console.error(err);
      throw new Error("Error en getMessageById Service");
    }
  }

  async createMessage(message) {
    try {
      const sentMessage = await MensajesModel.create(message);
      return sentMessage;
    } catch (err) {
      console.error(err);
      throw new Error("Error en createMessage Service", err);
    }
  }

  async deleteMessage(id) {
    try {
      await MensajesModel.findOneAndDelete({ _id: id });
    } catch (err) {
      console.error(err);
      throw new Error("Error en deleteMessage Service");
    }
  }
}

module.exports = new MensajesService();
