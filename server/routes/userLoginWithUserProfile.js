const express = require("express");
const router = express.Router();
const userTokenChecking = require("../middlewares/authenticateUser");
const { getUserById, getMyProfile } = require("../controllers/userController");

// TOKEN VERIFICATION
router.get("/login", userTokenChecking, (req, res) => {
  res.json({ message: "Welcome! You are logged in.", user: req.user });
});





//
// router.get("/profile", userTokenChecking, getMyProfile);





// GET USER BY ID
router.get("/:id", userTokenChecking, getUserById);

module.exports = router;


//UPDATE USER BY ID
router.get("")



