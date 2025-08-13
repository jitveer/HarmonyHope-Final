const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userRegistrationWtihOtp = require('./routes/userRegistrationWtihOtp.js');
const userLoginWithUserProfile = require('./routes/userLoginWithUserProfile.js');
const donationRoutes = require('./routes/donation.js');
const requestHelp = require('./routes/requestHelp')


const app = express();
app.use(cors());
app.use(express.json());


// USER RESGISTRATION AND OTP VERIFICATION
app.use('/api/auth', userRegistrationWtihOtp);

// USER LOGIN & GET USER PROFILE
app.use('/api/user', userLoginWithUserProfile);

// DONATION API
app.use('/api', donationRoutes);

//REQUEST API
// app.use('/api', requestHelp);




// MONGODB CONNECTION
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected "))
  .catch(err => console.error("MongoDB error", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));