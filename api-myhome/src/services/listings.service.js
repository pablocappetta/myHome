const {
  InternalServerError,
  BadRequestError,
  NotFoundError,
  CustomError,
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

  async updateListing(id, listing) {
    try {
      const existingListing = await ListingModel.findOne({
        _id: id,
        realtorId: listing.realtorId,
      });

      if (!existingListing) {
        throw new NotFoundError("No se encontró la publicación");
      }

      const mergedListing = this.mergeDeep(existingListing, listing);

      const updatedListing = await ListingModel.findOneAndUpdate(
        { _id: id, realtorId: listing.realtorId },
        mergedListing,
        {
          new: true,
          runValidators: true,
        }
      );

      return updatedListing;
    } catch (err) {
      console.error(err);
      if (err instanceof ValidationError) {
        throw new BadRequestError("Error en validaciones de Mongoose.");
      }
      if (err instanceof CustomError) {
        throw err;
      }
      throw new InternalServerError("Error en updateListing Service");
    }
  }

  isObject(item) {
    return item && typeof item === "object" && !Array.isArray(item);
  }

  mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (this.isObject(target) && this.isObject(source)) {
      for (const key in source) {
        if (this.isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          this.mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }

    return this.mergeDeep(target, ...sources);
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
      const listings = await ListingModel.find(query);
      return listings;
    } catch (err) {
      console.error(err);
      throw new InternalServerError("Error en getListings Service");
    }
  }

  async getListingsNear(latitude, longitude, meterRadius) {
    try {
      const listings = await ListingModel.find({
        "property.geoLocation": {
          $near: {
            $maxDistance: meterRadius,
            $geometry: {
              type: "Point",
              coordinates: [latitude, longitude],
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

  async deleteListing(id) {
    try {
      return await ListingModel.deleteOne({ _id: id });
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
      return await this.updateListing(listingFromDb._id, listingFromDb);
    } catch (err) {
      console.error(err);
      throw new Error("Error en addImagesToListing Service");
    }
  }

  async markAsReserved(listingId) {
    try {
      const listing = await this.getListingById(listingId);
      listing.status = "reservada";
      listing.save();
    } catch (err) {
      console.error(err);
      throw new InternalServerError("Error en markAsReserved Service");
    }
  }

  async markAsAvailable(listingId) {
    try {
      const listing = await this.getListingById(listingId);
      listing.status = "disponible";
      listing.save();
    } catch (err) {
      console.error(err);
      throw new InternalServerError("Error en markAsReserved Service");
    }
  }
}

module.exports = new ListingService();
