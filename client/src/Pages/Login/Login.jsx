import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    otp: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!showOtpField && !formData.password) {
      setError('Password is required');
      return false;
    }
    if (showOtpField && !formData.otp) {
      setError('OTP is required');
      return false;
    }
    return true;
  };

  const handleOtpLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      if (!isOtpSent) {
        // Send OTP
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.email.split('@')[0], // Use email prefix as name
            email: formData.email,
            phone: '0000000000' // Placeholder phone
          }),
        });

        const data = await response.json();
        
        if (response.ok) {
          setSuccess('OTP sent to your email!');
          setIsOtpSent(true);
        } else {
          setError(data.message || 'Failed to send OTP');
        }
      } else {
        // Verify OTP
        const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            otp: formData.otp
          }),
        });

        const data = await response.json();
        
        if (response.ok) {
          setSuccess('Login successful!');
          localStorage.setItem('token', data.token);
          if (onLogin) onLogin(data.token);
        } else {
          setError(data.message || 'Invalid OTP');
        }
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      // For now, simulate a password login
      // In a real app, you'd call your password login endpoint
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess('Login successful!');
        localStorage.setItem('token', data.token);
        if (onLogin) onLogin(data.token);
      } else {
        const data = await response.json();
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    if (showOtpField) {
      handleOtpLogin(e);
    } else {
      handlePasswordLogin(e);
    }
  };

  const toggleLoginMethod = () => {
    setShowOtpField(!showOtpField);
    setError('');
    setSuccess('');
    setIsOtpSent(false);
    setFormData(prev => ({ ...prev, password: '', otp: '' }));
  };











  
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>HarmonyHope</h1>
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
              onChange={handleInputChange}
              disabled={isLoading}
              required
            />
          </div>

          {!showOtpField ? (
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
                required
              />
            </div>
          ) : (
            <div className="form-group">
              <label htmlFor="otp">OTP Code</label>
              <input
                id="otp"
                name="otp"
                type="text"
                placeholder="Enter 6-digit OTP"
                value={formData.otp}
                onChange={handleInputChange}
                disabled={isLoading}
                maxLength="6"
                pattern="[0-9]{6}"
                required
              />
            </div>
          )}

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner"></span>
            ) : showOtpField ? (
              isOtpSent ? 'Verify OTP' : 'Send OTP'
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="login-footer">          
          <div className="help-links">
            <a href="/forgot-password">Forgot Password?</a>
            <Link to="/register">Don't have an account? Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
