const mongoose = require("mongoose");
const ValidationError = mongoose.Error.ValidationError;
const UserModel = require("../models/User");
const {
  InternalServerError,
  BadRequestError,
} = require("../middlewares/errorHandler");

class UserService {
  async getUsers() {
    try {
      const users = await UserModel.find();
      return users;
    } catch (err) {
      console.error(err);
      throw new InternalServerError("Error en getUsers Service");
    }
  }

  async getUserById(id) {
    try {
      const user = await UserModel.findOne({ _id: id });
      return user;
    } catch (err) {
      console.error(err);
      throw new Error("Error en getUserById Service");
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await UserModel.findOne({ email });
      return user;
    } catch (err) {
      console.error(err);
      throw new Error("Error en getUserById Service");
    }
  }

  async createUser(user) {
    const isUserRegistered = await this.getUserByEmail(user.email);
    if (isUserRegistered) {
      throw new Error("El usuario ya existe");
    }
    try {
      return await UserModel.create(user);
    } catch (err) {
      console.error(err);
      if (err instanceof ValidationError) {
        throw new Error("Invalid input data.");
      }
      throw new Error("Error en createUser Service");
    }
  }

  async getListingsByRealtorId(realtorId) {
    try {
      return await ListingModel.find({ realtorId });
    } catch (err) {
      console.error(err);
      throw new Error("Error en getListingsByRealtorId Service");
    }
  }

  async getUserFavorites(userId) {
    try {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new BadRequestError("User not found");
      }
      return user.favoriteListings;
    } catch (err) {
      console.error(err);
      throw new InternalServerError("Error in getUserFavorites Service");
    }
  }

  async addFavorite(userId, listingId) {
    try {
      console.log("llego al serviec");
      const user = await UserModel.findById(userId);

      if (!user.favoriteListings.includes(listingId)) {
        console.log("llego al if");
        user.favoriteListings.push(listingId);
        user.save();
      }
    } catch (error) {
      console.error(error);
      // Handle specific error types
      if (error.name === "ValidationError") {
        throw new BadRequestError("Mongoose validation error.");
      } else {
        throw new InternalServerError("Error in addFavorite service");
      }
    }
  }

  async removeFavorite(userId, listingId) {
    try {
      const user = await UserModel.findById(userId);

      const index = user.favoriteListings.indexOf(listingId);
      if (index !== -1) {
        user.favoriteListings.splice(index, 1);
        user.save();
      }
    } catch (error) {
      console.error(error);
      if (error.name === "ValidationError") {
        throw new BadRequestError("Mongoose validation error.");
      } else {
        throw new InternalServerError("Error in removeFavorite service");
      }
    }
  }
}

module.exports = new UserService();
