const mongoose = require("mongoose");
const { Schema } = mongoose;

const ListingSchema = new Schema({
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
      latitude: mongoose.Schema.Types.Decimal128,
      longitude: mongoose.Schema.Types.Decimal128,
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
    photos: [String],
    video: String,
    expensesPrice: {
      amount: mongoose.Schema.Types.Decimal128,
      currency: { type: String, enum: ["USD", "ARS"] },
    },
  },
  realtorId: { type: mongoose.Schema.Types.ObjectId, ref: "realtors" },
  type: { type: String, enum: ["venta", "alquiler"] },
  status: {
    type: String,
    enum: ["disponible", "reservada", "vendida", "cancelada"],
  },
  price: {
    amount: mongoose.Schema.Types.Decimal128,
    currency: { type: String, enum: ["USD", "ARS"] },
  },
  creationDate: { type: Date, default: Date.now },
});

const Listings = mongoose.model("Listing", ListingSchema);

module.exports = Listings;
