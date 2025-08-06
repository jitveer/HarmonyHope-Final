import React from "react"
import './Register.css'
import './OtpVerify.css'
import { Link } from "react-router-dom"


const OtpVerify = () => {
    return (
        <div className="otp-container">
            <div className="otp-card">
                <form className="register-form" autoComplete="off" style={{ display: 'block' }}>
                    <div className="otp-header">
                        <label>Email Verification</label>
                    </div>

                    <div className="otp-inputs">
                        <input type="text" maxLength="1" className="otp-input" data-index="0" inputMode="numeric" autoComplete="one-time-code" />
                        <input type="text" maxLength="1" className="otp-input" data-index="1" inputMode="numeric" />
                        <input type="text" maxLength="1" className="otp-input" data-index="2" inputMode="numeric" />
                        <input type="text" maxLength="1" className="otp-input" data-index="3" inputMode="numeric" />
                        <input type="text" maxLength="1" className="otp-input" data-index="4" inputMode="numeric" />
                        <input type="text" maxLength="1" className="otp-input" data-index="5" inputMode="numeric" />
                    </div>

                    <div className="otp-resend" style={{ marginTop: '10px' }}>
                        <span id="countdown">Resend OTP in (60s)</span>
                        <button type="button" id="resendOtpBtn" className="otp-btn" disabled style={{ display: 'none' }}>Resend OTP</button>
                    </div>



                    <button type="submit" className="submit-btn" style={{ marginTop: '20px' }} disabled>
                        <span>Verify OTP</span>
                    </button>
                </form>

                <div className="register-footer">
                    <p>
                        Already have an account? <Link to="/" className="signin-link">Sign in here</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default OtpVerify 