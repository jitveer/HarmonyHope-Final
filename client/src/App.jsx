import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      // You can also verify the token with the server here
    }
  }, []);

  const handleLogin = (token) => {
    setIsLoggedIn(true);
    // You can also fetch user data here if needed
  };

  const handleRegister = (data) => {
    // Handle successful registration
    console.log('Registration successful:', data);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
  };

  if (isLoggedIn) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>HarmonyHope Dashboard</h1>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </header>
        <main className="app-main">
          <h2>Welcome to HarmonyHope!</h2>
          <p>You are successfully logged in.</p>
          {/* Add your dashboard content here */}
        </main>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
