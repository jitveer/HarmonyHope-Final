const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userRegistrationWtihOtp = require('./routes/userRegistrationWtihOtp.js');
const userLoginWithUserProfile = require('./routes/userLoginWithUserProfile.js');
const requestRoutes = require('./routes/requestRoutes.js')


const app = express();
app.use(cors());
app.use(express.json());


// USER RESGISTRATION AND OTP VERIFICATION
app.use('/api/auth', userRegistrationWtihOtp);

// USER LOGIN & GET USER PROFILE
app.use('/api/user', userLoginWithUserProfile);

// REQUEST API
app.use('/api/requests', requestRoutes);


// DONATION API
// app.use('/api', donationRoutes);



// MONGODB CONNECTION
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected "))
  .catch(err => console.error("MongoDB error", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));