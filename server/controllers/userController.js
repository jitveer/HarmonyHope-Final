const jwt = require("jsonwebtoken");
const User = require('../models/User');
const bcrypt = require("bcrypt");


exports.getUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if verified
    if (!user.isVerified) {
      return res.status(403).json({ message: "User not verified" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

  

    // ✅ Generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || "MY_SECRET_KEY",
      { expiresIn: "8h" }
    );

    // Send response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Error in getUser:", error);
    res.status(500).json({ message: "Server error" });
  }
};





// ID-based profile (GET /api/user/:id)
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id; // route params se
    const user = await User.findById(userId).select('-password -__v -isVerified');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error('getUserById error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};



//UPDATE USER PROFILE DATA
exports.updateUserData = async (req, res) => {

  try {
    const userId = req.params.id;
    const { name, email, phone, password } = req.body;

    if (password != "") {
      const updatedUser = await User.findByIdAndUpdate(userId, { name, email, phone, password }, { new: true }
      );

      if (!updatedUser) return res.status(404).json({ message: "User not found" });

      res.status(200).json({ user: updatedUser });
    } else {
      const updatedUser = await User.findByIdAndUpdate(userId, { name, email, phone }, { new: true }
      );

      if (!updatedUser) return res.status(404).json({ message: "User not found" });

      res.status(200).json({ user: updatedUser });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }

};