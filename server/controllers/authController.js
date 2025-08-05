const User = require("../models/User");
const Otp = require("../models/Otp");
const transporter = require('../config/nodemailer');
const jwt = require("jsonwebtoken");

// FUNCTION TO GENERATE 6 DIGIT OTP
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const registerUser = async (req, res) => {
    // Added password to destructure from req.body
    const { name, email, phone, password } = req.body;

    // checking empty field, now includes password
    if (!name || !email || !phone || !password) {
        return res.status(400).json({ message: 'All fields required' });
    }

    try {
        const existingUser = await User.findOne({ email });

        //checking Existing User on Database
        if (existingUser && existingUser.isVerified) {
            return res.status(400).json({ message: 'User already registered' });
        }

        // Call function to generate OTP 
        const otpCode = generateOtp();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await Otp.deleteMany({ email });    // remove old otp

        // Store password, name, phone in OTP for later user creation
        await Otp.create({ email, otp: otpCode, expiresAt, name, phone, password });

        // SEND MAIL
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "HarmonyHope OTP Verification", // fixed typo: Subject -> subject
            html: `<p>Your OTP is <b>${otpCode}</b>. It is valid for 10 minutes </p>`
        });

        res.json({ message: 'OTP sent successfully to your email.' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const existingOtp = await Otp.findOne({ email });
        if (!existingOtp || existingOtp.otp != otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        const now = new Date();
        if (now > existingOtp.expiresAt) {
            return res.status(400).json({ message: "OTP expired" });
        }

        // Create user if not exists
        let user = await User.findOne({ email });
        if (!user) {
            // Use name, phone, password from OTP document
            user = new User({ 
                name: existingOtp.name, 
                email, 
                phone: existingOtp.phone, 
                password: existingOtp.password, 
                isVerified: true 
            });
            await user.save();
        } else {
            user.isVerified = true;
            await user.save();
        }

        //Delete Otp 
        await Otp.deleteOne({ email });

        //Generate JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({ message: "OTP verified", token });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = { registerUser, verifyOtp };