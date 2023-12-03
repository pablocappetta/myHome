let instance = null;
require("dotenv").config();
const ListingService = require("../services/listings.service");
const ImgurStorage = require("multer-storage-imgur");
const multer = require("multer");

const upload = multer({
  storage: ImgurStorage({ clientId: process.env.IMGUR_CLIENT_ID }),
});

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

  async getListingsNear(req, res, next) {
    try {
      const listings = await ListingService.getListingsNear(
        req.query.latitude,
        req.query.longitude,
        req.query.radius
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
      const listing = req.body;
      const images = req.files;
      if (typeof listing.property == "string")
        listing.property = JSON.parse(listing.property);
      if (typeof listing.price == "string")
        listing.price = JSON.parse(listing.price);
      listing.property.photos = images.map((image) => image.link);
      const newListing = await ListingService.createListing(listing);
      return res.status(201).json(newListing);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async updateListing(req, res, next) {
    try {
      const { id } = req.params;
      const listing = req.body;
      const images = req.files;

      if (typeof listing.property == "string")
        listing.property = JSON.parse(listing.property);
      if (typeof listing.price == "string")
        listing.price = JSON.parse(listing.price);
      listing.property.photos = images.map((image) => image.link);

      const updatedListing = await ListingService.updateListing(id, listing);
      return res.status(200).json(updatedListing);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async deleteListing(req, res, next) {
    const { id } = req.params;

    try {
      const existingListing = await ListingService.getListingById(id);

      if (!existingListing) {
        return res.status(404).json({ error: "La publicación no existe" });
      }

      await ListingService.deleteListing(id);
      return res.status(204).json();
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async getListingsByRealtorId(req, res) {
    const realtorId = req.params.realtorId;
    try {
      const listings = await ListingService.getListingsByRealtorId(realtorId);
      return res.status(200).json(listings);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}


module.exports = ListingController.getInstance();
