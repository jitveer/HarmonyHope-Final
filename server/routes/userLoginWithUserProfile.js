const express = require("express");
const router = express.Router();
const userTokenChecking = require("../middlewares/authenticateUser");
const User = require("../models/User");
const { route } = require("./userRegistrationWtihOtp");
const getUserProfile = require("../controllers/userController");

// Login using token
router.get("/login", userTokenChecking, async (req, res) => {
    res.json({ message: "Welcome! You are logged in.", user: req.user });
})

router.get("/profile/getUserProfile", userTokenChecking, getUserProfile);


module.exports = router;