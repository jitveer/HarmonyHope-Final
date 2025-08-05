import React, { useState, useRef, useEffect } from 'react'
import './Register.css';

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showOtp, setShowOtp] = useState(false);
    const [otpTimer, setOtpTimer] = useState(60);
    const [canResendOtp, setCanResendOtp] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const otpInputsRef = useRef([]);
    const timerRef = useRef(null);

    // Simulate sending OTP to email
    const sendOtpToEmail = () => {
        // Here you would call your backend to send the OTP to the user's email
        // For now, just simulate with a console log
        console.log('OTP sent to email');
    };

    // Start OTP timer countdown
    const startOtpTimer = () => {
        setOtpTimer(60);
        setCanResendOtp(false);
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setOtpTimer(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    setCanResendOtp(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    useEffect(() => {
        // Clean up timer on unmount
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const handleTogglePassword = (e) => {
        e.preventDefault();
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can add validation here if needed before showing OTP
        setShowOtp(true);
        sendOtpToEmail();
        startOtpTimer();
    };

    const handleResendOtp = () => {
        sendOtpToEmail();
        startOtpTimer();
        setOtp(['', '', '', '', '', '']);
        if (otpInputsRef.current[0]) {
            otpInputsRef.current[0].focus();
        }
    };

    // OTP input handlers
    const handleOtpChange = (e, idx) => {
        const value = e.target.value;
        if (!/^[0-9]?$/.test(value)) return; // Only allow single digit numbers

        const newOtp = [...otp];
        newOtp[idx] = value;
        setOtp(newOtp);

        if (value && idx < 5) {
            // Move to next input
            otpInputsRef.current[idx + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (e, idx) => {
        if (e.key === 'Backspace') {
            if (otp[idx] === '') {
                if (idx > 0) {
                    otpInputsRef.current[idx - 1]?.focus();
                }
            } else {
                const newOtp = [...otp];
                newOtp[idx] = '';
                setOtp(newOtp);
            }
        } else if (e.key === 'ArrowLeft' && idx > 0) {
            otpInputsRef.current[idx - 1]?.focus();
        } else if (e.key === 'ArrowRight' && idx < 5) {
            otpInputsRef.current[idx + 1]?.focus();
        }
    };

    const handleOtpPaste = (e) => {
        e.preventDefault();
        const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (paste.length === 0) return;
        const newOtp = [...otp];
        for (let i = 0; i < 6; i++) {
            newOtp[i] = paste[i] || '';
        }
        setOtp(newOtp);
        // Focus the last filled input
        const lastIdx = Math.min(paste.length - 1, 5);
        otpInputsRef.current[lastIdx]?.focus();
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <div className="register-header">
                    <h1>Join Our Caring Community</h1>
                    <p>Make a difference by connecting with those in need</p>
                </div>

                <form id="registrationForm" className="register-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            required
                            className="form-input"
                        />
                        <div id="nameError" className="form-error hidden">Please enter your full name</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="form-input"
                        />
                        <div id="emailError" className="form-error hidden">Please enter a valid email address</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            className="form-input"
                            pattern="[0-9]{10,15}"
                            placeholder="Enter your phone number"
                        />
                        <div id="phoneError" className="form-error hidden">Please enter a valid phone number</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div style={{ position: "relative" }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                required
                                className="form-input"
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                onClick={handleTogglePassword}
                                style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    padding: 0
                                }}
                                tabIndex={-1}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    // Eye open icon (SVG)
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                ) : (
                                    // Eye closed icon (SVG)
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.81 21.81 0 0 1 5.06-6.06" />
                                        <path d="M1 1l22 22" />
                                        <path d="M9.53 9.53A3 3 0 0 0 12 15a3 3 0 0 0 2.47-5.47" />
                                        <path d="M14.47 14.47A3 3 0 0 1 12 9a3 3 0 0 1-2.47 5.47" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        <div id="passwordError" className="form-error hidden">Please enter a password</div>
                    </div>
                    <div
                        id="otpSection"
                        className={`otp-section${showOtp ? '' : ' hidden'}`}
                    >
                        <div className="otp-header">
                            <label>Email Verification</label>
                        </div>
                        <div className="otp-inputs">
                            {[0, 1, 2, 3, 4, 5].map((idx) => (
                                <input
                                    key={idx}
                                    type="text"
                                    maxLength="1"
                                    className="otp-input"
                                    data-index={idx}
                                    value={otp[idx]}
                                    onChange={e => handleOtpChange(e, idx)}
                                    onKeyDown={e => handleOtpKeyDown(e, idx)}
                                    onPaste={idx === 0 ? handleOtpPaste : undefined}
                                    ref={el => otpInputsRef.current[idx] = el}
                                    inputMode="numeric"
                                    autoComplete="one-time-code"
                                />
                            ))}
                        </div>
                        <div className="otp-resend" style={{ marginTop: '10px' }}>
                            {!canResendOtp ? (
                                <span id="countdown">Resend OTP in ({otpTimer}s)</span>
                            ) : (
                                <button
                                    type="button"
                                    id="resendOtpBtn"
                                    className="otp-btn"
                                    onClick={handleResendOtp}
                                >
                                    Resend OTP
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="form-group terms-group">
                        <input
                            type="checkbox"
                            id="termsAccept"
                            className="custom-checkbox"
                            required
                        />
                        <label htmlFor="termsAccept" className="terms-label">
                            I agree to the <a href="#" className="terms-link">Terms of Service</a>
                            and <a href="#" className="terms-link">Privacy Policy</a>
                        </label>
                    </div>

                    <button
                        type="submit"
                        id="submitBtn"
                        className="submit-btn"
                        disabled={showOtp} // Disable submit when OTP is being entered
                    >
                        <span id="submitText">Create Account</span>
                        <div id="submitLoader" className="submit-loader hidden">
                            <div className="loader-spinner"></div>
                        </div>
                    </button>
                </form>

                <div className="register-footer">
                    <p>
                        Already have an account?
                        <a href="#" className="signin-link">Sign in here</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register