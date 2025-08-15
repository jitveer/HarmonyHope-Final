const express = require("express");
const router = express.Router();

const authenticateUser = require("../middlewares/authenticateUser"); // your existing file
const isAdmin = require("../middlewares/isAdmin");


const {
  createRequest,
  getMyRequests,
  getAllRequests,
  updateRequestStatus,
} = require("../controllers/requestController");

// User: create request
router.post("/", authenticateUser, createRequest);

// User: my requests
router.get("/mine", authenticateUser, getMyRequests);

// Admin: all requests (+ optional filter ?status=pending)
router.get("/", authenticateUser, isAdmin, getAllRequests);

// Admin: update status
router.patch("/:id/status", authenticateUser, isAdmin, updateRequestStatus);

module.exports = router;










// const express =  require('express');
// const router = express.Router();

// const authenticateUser = require('../middlewares/authenticateUser');
// const requestController = require('../controllers/requestController');


// // router.post("/requestHelp", authenticateUser, requestController );

// router.post("/requestHelp", requestController );

// module.exports = router;