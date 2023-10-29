let instance = null;
require("dotenv").config();
const ListingService = require("../services/listings.service");

class ListingController {
  static getInstance() {
    if (!instance) {
      return new ListingController();
    }
    return instance;
  }

  async getListings(req, res) {
    try {
      const listings = await ListingService.getListings();
      return res.status(200).json(listings);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getListings",
        message: err,
      });
    }
  }

  async getListingById(req, res) {
    const { id } = req.params;
    try {
      const listing = await ListingService.getListingById(id);
      return res.status(200).json(listing);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getListingById",
        message: err,
      });
    }
  }

  async createListing(req, res) {
    const { body } = req;
    try {
      const listing = await ListingService.createListing(body);
      return res.status(201).json(listing);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "createListing",
        message: err,
      });
    }
  }

  async updateListing(req, res) {
    const { body } = req;
    try {
      const listing = await ListingService.updateListing(body);
      return res.status(200).json(listing);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "updateListing",
        message: err,
      });
    }
  }

  async deleteListing(req, res) {
    const { id } = req.params;
    try {
      await ListingService.deleteListing(id);
      return res.status(204).json();
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "deleteListing",
        message: err,
      });
    }
  }
}

module.exports = ListingController.getInstance();