const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const NotificationSchema = new Schema(
    {
        userId: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        listingId: {
            type: ObjectId,
            ref: "Listing",
            required: true,
        },
        realtorId: {
            type: ObjectId,
            ref: "Realtor",
            required: true,
        },
        timestamp: { 
            type: Date, 
            default: Date.now 
        },
        type: { 
            type: String, 
            enum: ["Consulta", "Reserva", "Visita"], 
            required: true 
        },
        message: { 
            type: String, 
            required: true 
        },
    },
    { versionKey: false }
);

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
