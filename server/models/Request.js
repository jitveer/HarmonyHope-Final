// const mongoose = require('mongoose');

// const RequestSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     reasonForRequest: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     amountRequested: {
//         type: Number,
//         default: 0
//     },
//     category: {
//         type: String,
//         enum: ['Medical', 'Education', 'Emergency', 'Food', 'Other'],
//         default: 'Other'
//     },
//     status: {
//         type: String, enum: ['Pending', 'Approved', 'Rejected'],
//         default: 'Pending'
//     },

// }, { timestamps: true });


// module.exports = mongoose.model("Request", RequestSchema);