const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: String,
    otp: String,
    expiresAt: Date,
    name: String,        // added for registration
    phone: String,       // added for registration
    password: String     // added for registration
})

module.exports = mongoose.model('Otp', otpSchema)