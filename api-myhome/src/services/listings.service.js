const ListingModel = require("../models/listing.model");

class ListingService {
  async createListing(listing) {
    try {
      return await ListingModel.create(listing);
    } catch (err) {
      console.error(err);
      throw new Error("Error en createListing Service");
    }
  }

  async getListingsByPlace(listingType, state, city, neighborhood) {
    let query = {
      listingType: listingType,
      state: state,
      city: city,
    };
    if (neighborhood) {
      query.neighborhood = neighborhood;
    }
    try {
      const listings = await ListingModel.find(query);
      return listings;
    } catch (err) {
      console.error(err);
      throw new Error("Error en getListings Service");
    }
  }

  async getListingsInRadius(latitude, longitude, radius) {
    try {
      return await ListingModel.find({
        location: {
          $near: {
            $maxDistance: radius,
            $geometry: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
          },
        },
      });
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
}
