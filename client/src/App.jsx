import { Routes, Route } from 'react-router-dom';

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import NoPage from "./Pages/NoPage/NoPage";
import Register from "./Pages/Register/Register";
import OtpVerify from "./Pages/Register/OtpVerify";
import UserDashboard from "./Pages/UserDashboard/UserDashboard";
import UserProfile from './Pages/UserProfile/UserProfile';
import Donate from './Pages/Donate/Donate';
import Request from './Pages/Request/Request';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
import AdminLogin from './Pages/Login/AdminLogin';


Request
const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-otp" element={<OtpVerify />} />
                <Route path="/login" element={<Login />} />

                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/donate" element={<Donate />} />

                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/admin-login" element={<AdminLogin />} />

                <Route path="/request" element={<Request />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
            <Footer />
        </>
    )
}


export default App;
