const User = require('../models/User');


const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-__v");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
        
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = getUserProfile;