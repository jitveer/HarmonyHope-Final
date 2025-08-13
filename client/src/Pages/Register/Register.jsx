import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';


function Register() {

    const [register, setRegister] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    })

    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegister({ ...register, [name]: value });
        // console.log(register);
    }



    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, phone, password } = register;

        if (!name || !email || !phone || !password) {
            alert("Please fill all fields");
            return;
        }

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
                console.log("Registration successful:", data);
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



    return (

        <>
            <div className="register-container">
                <div className="register-card">
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
                                <input type="password" id="password" name="password" required className="form-input" autoComplete="new-password" defaultValue="" onChange={handleChange} />
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
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                </button>
                            </div>
                            <div id="passwordError" className="form-error hidden"></div>
                        </div>

                        <div className="form-group terms-group">
                            <input type="checkbox" id="termsAccept" className="custom-checkbox" />
                            <label htmlFor="termsAccept" className="terms-label">
                                I agree to the <Link to="/" className="terms-link">Terms of Service</Link> and <Link to="/" className="terms-link">Privacy Policy</Link>
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
