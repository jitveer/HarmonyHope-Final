import { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useUserTokenValidation } from '../../Components/UserTokenVerification/UserTokenVerification';
// import ReCAPTCHA from "react-google-recaptcha";



function Register() {

    const [register, setRegister] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    })
    // const [captchaValue, setCaptchaValue] = useState(null);
    const navigate = useNavigate();
    const [paswrdEye, setPaswrdEye] = useState(true);
    // const { isValidToken, userId, setIsValidToken, setUserId } = useUserTokenValidation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegister({ ...register, [name]: value });
        // console.log(register);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, phone, password } = register;

        // FORM VALIDATAION
        const nameRegex = /^[A-Za-z\s]{3,20}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
        const phoneRegex = /^[6-9]\d{9}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

        if (!nameRegex.test(name)) {
            alert("Name must be 3-20 letters only (no numbers or special chars)");
            return;
        }

        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (!phoneRegex.test(phone)) {
            alert("Phone must be a valid 10-digit Indian number)");
            return;
        }

        if (!passwordRegex.test(password)) {
            alert("Password must be 8–20 chars, with at least 1 uppercase, 1 lowercase, 1 digit, and 1 special character.)");
            return;
        }

        if (!name || !email || !phone || !password) {
            alert("Please fill all fields");
            return;
        }





        // if (!captchaValue) {
        //     alert("Please verify the captcha!");
        //     return;
        // }

        /////////////////////////////


        try {
            const response = await fetch('http://localhost:5000/api/auth/register/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(register)
            });

            const data = await response.json();

            if (response.ok) {
                // console.log("Registration successful:", data);
                alert(data.message);
                navigate("/verify-otp", { state: { email: email } });
            } else {
                console.error("Error:", data);
                alert(data.message || "Registration failed.");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            alert("Something went wrong.");
        }

    };


    // PASSWORD EYE
    const showPassword = () => {
        paswrdEye ? setPaswrdEye(false) : setPaswrdEye(true);
    }


    //IF TOKEN IN LOCAL STORAGE THEN GO TO THAT PAGE
    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem('token');
            if (token) {
                navigate('/user-dashboard');
            }
        }

        checkToken();
    }, [])




    return (

        <>
            <div className="register-container">
                <div className="register-card">
                    {/* 👇 Profile Image Section */}
                    {/* <div style={{ textAlign: "center", marginBottom: "20px" }}>
                        <img
                            src={previewUrl}
                            alt="Profile"
                            style={{
                                width: "100px",
                                height: "100px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                border: "2px solid #ddd",
                                cursor: "pointer"
                            }}
                            onClick={() => fileInputRef.current.click()} // image click to open file chooser
                        />
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                        <p style={{ fontSize: "14px", color: "#666" }}>Click on image to choose profile</p>
                    </div> */}
                    <div className="register-header">
                        <h1>Join Our Caring Community</h1>
                        <p>Make a difference by connecting with those in need</p>
                    </div>

                    <form id="registrationForm" className="register-form" autoComplete="off" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input type="text" id="name" name="name" required className="form-input" defaultValue="" autoComplete="off" onChange={handleChange} />
                            <div id="nameError" className="form-error hidden"></div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" name="email" required className="form-input" defaultValue="" autoComplete="off" onChange={handleChange} />
                            <div id="emailError" className="form-error hidden"></div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone" required className="form-input" pattern="[0-9]{10,15}" defaultValue="" autoComplete="off" onChange={handleChange} />
                            <div id="phoneError" className="form-error hidden"></div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div style={{ position: 'relative' }}>
                                <input type={paswrdEye ? "password" : "text"} id="password" name="password" required className="form-input" autoComplete="new-password" defaultValue="" onChange={handleChange} />
                                <button
                                    type="button"
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: 0,
                                    }}
                                    tabIndex="-1"
                                    aria-label="Show password"
                                >
                                    {/* Eye Icon SVG */}
                                    <div className="eye" onClick={showPassword}>
                                        {
                                            paswrdEye ?
                                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12c2.5 3 5.5 4.5 10 4.5s7.5-1.5 10-4.5" /><path d="M4 12c2 1.6 4.5 2.4 8 2.4s6-0.8 8-2.4" /><path d="M6 10l-1.5-1" /><path d="M10 9.5L9 8" /><path d="M14 9.5l1-1.5" /><path d="M18 10l1.5-1" /></svg>
                                                :
                                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                                                    <circle cx="12" cy="12" r="3" />
                                                </svg>
                                        }
                                    </div>
                                </button>
                            </div>
                            <div id="passwordError" className="form-error hidden"></div>
                        </div>

                        {/*  CAPTCHA CODE  */}
                        {/* <div className="form-group">
                            <ReCAPTCHA sitekey='6LeiubIrAAAAAOYQp8Fclt1_MaLtj6xcQg0cQqsV' onChange={(value) => setCaptchaValue(value)} />
                        </div> */}

                        <div className="form-group terms-group">
                            <input type="checkbox" id="termsAccept" className="custom-checkbox" />
                            <label htmlFor="termsAccept" className="terms-label">
                                I agree to the <Link to="/term_condition" className="terms-link">Terms of Service</Link> and <Link to="/privacypolicy" className="terms-link">Privacy Policy</Link>
                            </label>
                        </div>

                        <button type="submit" id="submitBtn" className="submit-btn">
                            <span id="submitText">Create Account</span>
                            <div id="submitLoader" className="submit-loader hidden">
                                <div className="loader-spinner"></div>
                            </div>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;
