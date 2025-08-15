const User = require("../models/User");

const isAdmin = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).select("role isAdmin");

    const flag = user?.role === "admin" || user?.isAdmin === true;
    if (!flag) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = isAdmin;










// const isAdimin = (req, res, next) => {
//     if (req.user && req.user.role === 'admin') {
//         next();
//     } else {
//         return res.status(403).json({ message: "Access denied. Admins only." });
//     };
// }

// module.exports = isAdimin;