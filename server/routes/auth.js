const express = require('express');
const router = express.Router();

const { registerUser, verifyOtp } = require("../controllers/authController");



// SENDING USER SINGN IN DATA TO DATABASE 
router.post('/register', registerUser);


// VERIFY OTP AFTER SENDING USER SINGN IN DATA
router.post("/verify-otp", verifyOtp)




module.exports = router;