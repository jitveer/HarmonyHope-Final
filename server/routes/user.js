const express = require("express");
const router = express.Router();
const authenticateUser = require("../middlewares/authenticateUser");
const User = require("../models/User");
const { route } = require("./auth");
const getUserProfile = require("../controllers/userController");

//check throuth token
// router.get("/profile", authenticateUser, async (req, res) => {
//     res.json({ message: "Welcome! You are logged in.", user: req.user });
// })

router.get("/profile", authenticateUser, getUserProfile);


module.exports = router;