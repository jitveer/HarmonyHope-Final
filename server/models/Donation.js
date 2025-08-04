const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
    user_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    donatedAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model("Donation", donationSchema)