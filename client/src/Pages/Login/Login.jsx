import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import { useEffect } from "react";
import { useUserTokenValidation } from "../../Components/UserTokenVerification/UserTokenVerification";



const Login = ({ onLogin }) => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paswrdEye, setPaswrdEye] = useState(true);
  const { isValidToken, userId, setIsValidToken, setUserId } = useUserTokenValidation();


  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsValidToken(true);
        setUserId(data.user.userId);
        console.log(data.user.userId);

        localStorage.setItem('token', data.token);
        alert('Successful login');
        if (onLogin) onLogin(data.token);

        // Redirect based on role 
        if (data.user.role === "admin") navigate("/admin-dashboard");

        // else if (data.user.role === "superadmin") navigate("/superadmin");
        else navigate("/user-dashboard");

      } else {
        setError(data.message || 'Invalid credentials');
      }

    } catch (error) {
      setError('Network error. Please try again.');
    }

    setIsLoading(false);
  }


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
    <div className="LoginContainer">
      <div className="login-card">
        <div className="login-header">
          <h1>Login</h1>
          <p>Welcome back! Please sign in to your account.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />




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

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="login-footer">
          <div className="help-links">
            <a href="/otp-login">Forgot Password?</a>
            <span> Don't have an account?<a href="/register"> Sign up</a></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
