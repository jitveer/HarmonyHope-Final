const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth.js');
const userRoutes = require('./routes/user.js');
const donationRoutes = require('./routes/donation.js');


const app = express();
app.use(cors());
app.use(express.json());


// USER RESGISTRATION AND AUTH WITH OTP
app.use('/api/auth', authRoutes);

// USER LOGIN & GET USER PROFILE
app.use('/api/user', userRoutes);

// DONATION API
app.use('/api', donationRoutes)




// MONGODB CONNECTION
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected "))
  .catch(err => console.error("MongoDB error", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));