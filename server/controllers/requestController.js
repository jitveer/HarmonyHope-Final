const Request = require("../models/Request");
const User = require("../models/User");


// Create new Request (User)

exports.createRequest = async (req, res) => {
  try {
    const { amount, requestCategorie, reasonForRequest, daysToReturn } = req.body;
    const userId = req.user.userId; 

    if (!amount ||!requestCategorie || !reasonForRequest || !daysToReturn) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (amount <= 0 || daysToReturn <= 0) {
      return res.status(400).json({ message: "Invalid amount or daysToReturn" });
    }

    const doc = await Request.create({user:userId, amount, requestCategorie, reasonForRequest, daysToReturn }); 
    res.status(201).json({ message: "Request submitted", request: doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// Get my requests (User)

exports.getMyRequests = async (req, res) => {
  try {
    const userId = req.user.userId;
    const list = await Request.find({ userId }).sort({ createdAt: -1 });
    res.json({ requests: list });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin: Get all requests (with optional ?status=pending/approved/rejected)
exports.getAllRequests = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const list = await Request.find(filter)
      .populate("userId", "name email")
      .populate("reviewedBy", "name email")
      .sort({ createdAt: -1 });

    res.json({ requests: list });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin: Update status (approve/reject)
exports.updateRequestStatus = async (req, res) => {
  try {
    const adminId = req.user.userId;
    const { id } = req.params;
    const { status } = req.body; // "approved" | "rejected"

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const update = {
      status,
      reviewedBy: adminId,
      approvedAt: status === "approved" ? new Date() : undefined,
    };

    const doc = await Request.findByIdAndUpdate(id, update, { new: true });
    if (!doc) return res.status(404).json({ message: "Request not found" });

    res.json({ message: "Status updated", request: doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};












// // USER HELP REQUEST SENT 

// const submitRequest = async (req, res) => {

//     try {
//         const { reasonForRequest, amountRequested, category } = req.body;
//         if (!reasonForRequest) {
//             return res.status(400).json({ message: 'reason for request is required' })
//         }

//         const newReq = new Request({
//             user: req.user.id, reasonForRequest, amountRequested, category
//         });

//         await newReq.save();
//         alert("Sucessful")
//         return res.status(201).json({ sucess: true, data: newReq });

//     } catch (error) {
//         console.error(err);
//         return res.status(500).json({ message: "Server error" })
//     }
// }





// module.exports = { submitRequest };