const ListingModel = require("../models/Listing");

class ListingService {
  async createListing(listing) {
    try {
      return await ListingModel.create(listing);
    } catch (err) {
      console.error(err);
      throw new Error("Error en createListing Service");
    }
  }

  async getListings() {
    try {
      const listings = await ListingModel.find();
      return listings;
    } catch (err) {
      console.error(err);
      throw new Error("Error en getListings Service");
    }
  }

  async getListingById(id) {
    try {
      return await ListingModel.findOne({ _id: id });
    } catch (err) {
      console.error(err);
      throw new Error("Error en getListingById Service");
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
      throw new Error("Error en updateListing Service");
    }
  }

  async deleteListing(listing) {
    try {
      return await ListingModel.deleteOne({ _id: listing._id });
    } catch (err) {
      console.error(err);
      throw new Error("Error en deleteListing Service");
    }
  }
}

module.exports = new ListingService();
