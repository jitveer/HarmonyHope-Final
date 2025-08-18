const express = require('express');
const router = express.Router();

const User = require("../models/User");
const Otp = require("../models/Otp");
const transporter = require('../config/nodemailer');
const jwt = require("jsonwebtoken");




// function to generate otp
const generateOtp = (length = 6) =>
    Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');






// ================== REGISTER (Send OTP) ==================

router.post('/register', async (req, res) => {
    // Added role to destructure
    const { name, email, phone, password, role } = req.body;

    console.log(req.body);

    // checking empty field
    if (!name || !email || !phone || !password) {
        return res.status(400).json({ message: 'All fields required' });
    }

    try {
        const existingUser = await User.findOne({ email });

        // if already registered & verified
        if (existingUser && existingUser.isVerified) {
            return res.status(400).json({ message: 'User already registered' });
        }

        // generate OTP 
        const otpCode = generateOtp();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await Otp.deleteMany({ email });    // remove old otp

        // Store all signup data inside Otp collection temporarily
        await Otp.create({
            email,
            otp: otpCode,
            expiresAt,
            name,
            phone,
            password,
            role: role || "user"   // if not provided, set default role "user"
        });

        // SEND MAIL
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "HarmonyHope OTP Verification",
            html: `<p>Your OTP is <b>${otpCode}</b>. It is valid for 10 minutes.</p>`
        });

        res.json({ message: 'OTP sent successfully to your email.' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong backend' });
    }
});






// ================== VERIFY OTP ( Create User) ==================
router.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;
    try {
        const existingOtp = await Otp.findOne({ email });

        if (!existingOtp || existingOtp.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        const now = new Date();
        if (now > existingOtp.expiresAt) {
            return res.status(400).json({ message: "OTP expired" });
        }

        // Create user if not exists
        let user = await User.findOne({ email });
        if (!user) {
            // Use data stored in OTP collection
            user = new User({
                name: existingOtp.name,
                email,
                phone: existingOtp.phone,
                password: existingOtp.password,
                role: existingOtp.role || "user",
                isVerified: true
            });
            await user.save();
        } else {
            user.isVerified = true;
            await user.save();
        }

        // Delete OTP after successful verification
        await Otp.deleteOne({ email });

        // Generate JWT with role
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "OTP verified successfully",
            token,
            user: { name: user.name, email: user.email, role: user.role }
        });

    } catch (err) {
        console.error('Error in verifyOtp:', err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});






module.exports = router;
