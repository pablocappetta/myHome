let instance = null;
require("dotenv").config();
const jwt = require("jsonwebtoken");
const UserService = require("../services/users.service");
const ListingService = require("../services/listings.service");
const AuthService = require("../services/auth.service");
const { NotFoundError } = require("../middlewares/errorHandler");

class UserController {
  static getInstance() {
    if (!instance) {
      instance = new UserController();
    }
    return instance;
  }

  async getUsers(req, res, next) {
    try {
      const users = await UserService.getUsers();
      return res.status(200).json(users);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async getUserById(req, res, next) {
    try {
      const id = req.params.id;
      let user = await UserService.getUserById(id);
      if (!user) {
        throw new NotFoundError("User not found.");
      }
      return res.status(200).json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const id = req.params.id;
      const user = await UserService.deleteUser(id);
      return res.status(204).json();
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async googleLogin(req, res, next) {
    try {
      const googleData = req.body;
      const user = {
        name: googleData.displayName,
        email: googleData.email,
        avatar: googleData.photoURL,
        phone: googleData.providerData.phoneNumber,
      };

      const existingUser = await UserService.getUserByEmail(user.email);
      if (!existingUser) {
        const newUser = await UserService.createUser(user);
        const token = await AuthService.generateToken(newUser._id, "user");
        return res.status(201).json({ token, user: newUser });
      }
      const token = await AuthService.generateToken(existingUser._id, "user");
      return res.status(200).json({ token, user: existingUser });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async getUserFavorites(req, res, next) {
    try {
      const { id } = req.params;
      const favorites = await UserService.getUserFavorites(id);

      // Fetch listing details for each favorite
      const favoritesDetails = [];
      for (const listingId of favorites) {
        const listing = await ListingService.getListingById(listingId);
        if (!listing) {
          await UserService.removeFavorite(id, listingId);
        } else {
          favoritesDetails.push(await ListingService.getListingById(listingId));
        }
      }
      res.status(200).json(favoritesDetails);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async addFavorite(req, res, next) {
    try {
      console.log("llego al controller");
      const { id, listingId } = req.params;
      await UserService.addFavorite(id, listingId);
      res.status(200).json();
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async removeFavorite(req, res, next) {
    try {
      const { id, listingId } = req.params;
      await UserService.removeFavorite(id, listingId);
      res.status(200).json();
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

module.exports = UserController.getInstance();
