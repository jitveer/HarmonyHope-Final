const User = require('../models/User');

// Token-based profile (GET /api/user/profile)
exports.getMyProfile = async (req, res) => {
  try {
    // middleware ne jo set kiya us se id nikalo
    const userId = req.user?._id || req.user?.id || req.user;
    if (!userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const user = await User.findById(userId).select('-password -__v');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error('getMyProfile error:', err.message);
    res.status(500).json({ message: 'Server error' });
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

