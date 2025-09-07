import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from './OtpLogin.module.css';
// import "./OtpLogin.module.css";

const OtpLogin = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    setInputValue(e.target.value);
    setError("");
  };

  // Validate Email or Mobile
  const validateInput = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (emailRegex.test(inputValue)) return "email";
    if (phoneRegex.test(inputValue)) return "phone";

    return null;
  };

  // Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    const type = validateInput();

    if (!type) {
      setError("Please enter a valid email or 10-digit mobile number");
      return;
    }

    try {
      // Call API to send OTP
      const response = await fetch("http://localhost:5000/api/user/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [type]: inputValue }),
      });

      const data = await response.json();

      if (response.ok) {
        setOtpSent(true);
        setTimer(60); // 1 min timer
        setError("");
        alert("OTP Sent Successfully!");
      } else {
        setError(data.message || "Failed to send OTP");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (otp.length !== 8) {
      setError("Please enter a valid 8-digit OTP");
      return;
    }

    try {
      // Call API to verify OTP
      const response = await fetch("http://localhost:5000/api/user/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputValue, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("OTP Verified Successfully!");
        navigate("/home");
      } else {
        setError(data.message || "Invalid OTP");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    }
  };

  // Timer Countdown
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="LoginContainer">
      <div className="login-card">
        <div className="login-header">
          <h1>OTP Login</h1>
          <p>Enter your Email or Mobile number to receive OTP</p>
        </div>

        <form className="login-form" onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="inputValue">Email or Mobile</label>
            <input
              id="inputValue"
              type="text"
              placeholder="Enter email or 10-digit mobile"
              value={inputValue}
              onChange={handleChange}
              required
            />
          </div>

          {otpSent && (
            <div className="form-group">
              <label htmlFor="otp">Enter OTP</label>
              <input
                id="otp"
                type="text"
                placeholder="8-digit OTP"
                value={otp}
                maxLength={8}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <p className="timer-text">
                {timer > 0 ? `Resend OTP in ${timer}s` : "You can resend OTP"}
              </p>
            </div>
          )}

          <button type="submit" className="login-button">
            {otpSent ? "Verify OTP" : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpLogin;
