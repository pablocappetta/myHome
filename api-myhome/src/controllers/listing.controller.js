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

  async getListings(req, res, next) {
    try {
      const listings = await ListingService.getListings();
      return res.status(200).json(listings);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async getListingsByPlace(req, res, next) {
    try {
      const listings = await ListingService.getListingsByPlace(
        req.query.listingType,
        req.query.state,
        req.query.city,
        req.query.neighborhood
      );
      return res.status(200).json(listings);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async getListingById(req, res, next) {
    const { id } = req.params;
    try {
      const listing = await ListingService.getListingById(id);
      return res.status(200).json(listing);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async createListing(req, res, next) {
    try {
      const listing = await ListingService.createListing(req.body);
      return res.status(201).json(listing);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async updateListing(req, res, next) {
    const { body } = req;
    try {
      const listing = await ListingService.updateListing(body);
      return res.status(200).json(listing);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async deleteListing(req, res, next) {
    const { id } = req.params;
    try {
      await ListingService.deleteListing(id);
      return res.status(204).json();
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async addImages(req, res, next) {
    const { id } = req.params;
    const images = req.files;
    try {
      const listing = await ListingService.addImages(id, images);
      return res.status(200).json(listing);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}

module.exports = ListingController.getInstance();
