const {
  InternalServerError,
  BadRequestError,
} = require("../middlewares/errorHandler");
const ListingModel = require("../models/Listing");
const mongoose = require("mongoose");
const ValidationError = mongoose.Error.ValidationError;

class ListingService {
  async createListing(listing) {
    try {
      return await ListingModel.create(listing);
    } catch (err) {
      console.error(err);
      if (err instanceof ValidationError) {
        throw new BadRequestError("Error en validaciones de Mongoose.");
      }
      throw new InternalServerError("Error en createUser Service");
    }
  }

  async getListings() {
    try {
      const listings = await ListingModel.find();
      return listings;
    } catch (err) {
      console.error(err);
      throw new InternalServerError("Error en getListings Service");
    }
  }

  async getListingsByPlace(listingType, state, city, neighborhood) {
    let query = {
      type: listingType,
      "property.address.state": state,
      "property.address.city": city,
    };
    if (neighborhood) {
      query["property.address.neighborhood"] = neighborhood;
    }
    try {
      console.log(query);
      const listings = await ListingModel.find(query);
      return listings;
    } catch (err) {
      console.error(err);
      throw new InternalServerError("Error en getListings Service");
    }
  }

  async getListingsNear(latitude, longitude, maxMeterDistance) {
    try {
      const listings = await ListingModel.find({
        "property.geoLocation": {
          $near: {
            $maxDistance: maxMeterDistance,
            $geometry: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
          },
        },
      });
      return listings;
    } catch (err) {
      console.error(err);
      throw new InternalServerError("Error en getListingsNearby Service");
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

  async getListingsNear(latitude, longitude, maxMeterDistance) {
    try {
      const listings = await ListingModel.find({
        "property.geoLocation": {
          $near: {
            $maxDistance: maxMeterDistance,
            $geometry: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
          },
        },
      });
      return listings;
    } catch (err) {
      console.error(err);
      throw new InternalServerError("Error en getListingsNearby Service");
    }
  }

  async getListingsByRealtorId(realtorId) {
    try {
      return await ListingModel.find({ realtorId });
    } catch (err) {
      console.error(err);
      throw new InternalServerError("Error en getListingsByRealtorId Service");
    }
  }

  async getListingById(id) {
    try {
      return await ListingModel.findOne({ _id: id });
    } catch (err) {
      console.error(err);
      throw new InternalServerError("Error en getListingById Service");
    }
  }

  async updateListing(listing) {
    try {
      return await ListingModel.findOneAndUpdate(
        { _id: listing._id },
        listing,
        {
          new: true,
        }
      );
    } catch (err) {
      console.error(err);
      if (err instanceof ValidationError) {
        throw new BadRequestError("Error en validaciones de Mongoose.");
      }
      throw new InternalServerError("Error en createUser Service");
    }
  }

  async deleteListing(listing) {
    try {
      return await ListingModel.deleteOne({ _id: listing._id });
    } catch (err) {
      console.error(err);
      throw new InternalServerError("Error en deleteListing Service");
    }
  }

  async addImages(listing, images) {
    const listingFromDb = await this.getListingById(listing);
    const imageLinks = images.map((image) => image.link);
    try {
      listingFromDb.property.photos =
        listingFromDb.property.photos.concat(imageLinks);
      return await this.updateListing(listingFromDb);
    } catch (err) {
      console.error(err);
      throw new Error("Error en addImagesToListing Service");
    }
  }
}

module.exports = new ListingService();
