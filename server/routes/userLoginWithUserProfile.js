const express = require("express");
const router = express.Router();
const userTokenChecking = require("../middlewares/authenticateUser");
const { getUserById, getMyProfile, updateUserData, getUser } = require("../controllers/userController");



// TOKEN VERIFICATION
router.get("/verify", userTokenChecking, (req, res) => {
  res.json({ message: "Welcome! You are logged in.", user: req.user.id, role: req.user.role });
});


// GET USER BY EMAIL/PASSWORD
router.post("/login", getUser)


// GET USER BY ID
router.get("/:id", userTokenChecking, getUserById);


//UPDATE USER BY ID
router.put("/:id", userTokenChecking, updateUserData);


module.exports = router;