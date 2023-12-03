const mongoose = require("mongoose");
const { Schema } = mongoose;

const ListingSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    property: {
      age: Number,
      address: {
        state: String,
        city: String,
        neighborhood: String,
        zipCode: String,
        street: String,
        number: Number,
        floor: Number,
        apartment: String,
      },
      geoLocation: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], default: [0, 0] }, //TODO: sacar default value y hacer required
      },
      type: {
        type: String,
        enum: [
          "Casa",
          "Departamento",
          "PH",
          "Terreno",
          "Local",
          "Oficina",
          "Galpón",
        ],
      },
      sqm: {
        covered: Number,
        uncovered: Number,
      },
      cardinalOrientation: {
        type: String,
        enum: ["N", "NE", "E", "SE", "S", "SO", "O", "NO"],
      },
      relativeOrientation: {
        type: String,
        enum: ["Frente", "Contrafrente", "Lateral"],
      },
      rooms: Number,
      bathrooms: Number,
      garages: Number,
      hasTerrace: Boolean,
      hasBalcony: Boolean,
      hasStorageUnit: Boolean,
      hasGarden: Boolean,
      amenities: [String],
      photos: { type: [String], validate: [validatePhotos, "2 fotos mínimo"] },
      video: String,
      expensesPrice: {
        amount: Number,
        currency: { type: String, enum: ["USD", "ARS"] },
      },
    },
    realtorId: { type: mongoose.Schema.Types.ObjectId, ref: "realtors" },
    type: { type: String, enum: ["venta", "alquiler"] },
    status: {
      type: String,
      enum: ["disponible", "reservada", "vendida", "cancelada"],
      default: "disponible",
    },
    price: {
      amount: Number,
      currency: { type: String, enum: ["USD", "ARS"] },
    },
    creationDate: { type: Date, default: Date.now },
  },
  { versionKey: false }
).index({ "property.geoLocation": "2dsphere" });

function validatePhotos(photos) {
  return photos.length >= 2;
}

const Listings = mongoose.model("Listing", ListingSchema);

module.exports = Listings;
