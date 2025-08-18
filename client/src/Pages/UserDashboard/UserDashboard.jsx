import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";



const UserDashboard = () => {

  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token"); // JWT token




  useEffect(() => {

    const fetchRequests = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/requests/request_status", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });


        const data = await res.json();

        setRequests(data.requests || []);
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    };



    // TAKING USER ROLE FOR REDIRECTION
    const checkPathByRole = async () => {

      const decodedUser = await jwtDecode(token);
      console.log(decodedUser.role);
      if (decodedUser.role == 'user') {
        navigate("/user-dashboard");
      } else if (decodedUser.role == "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }

    }



    fetchRequests();
    checkPathByRole();

  }, []);


  // DELETE USER
  const requestDelete = async (id) => {

    if (confirm("Are you sure to delete this request")) {

      try {
        const res = await fetch(`http://localhost:5000/api/requests/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          alert("Request deleted successfully");
          setRequests((prev) => prev.filter((req) => req._id !== id));
        } else {
          alert(data.message || "Error deleting request");
        }
      } catch (err) {
        console.error(err);
        alert("Server error");
      }

    }



  }







  return (

    <>
      {/* <header class="custom-header">
        <div class="header-container">
          <div class="header-left">
            <h1 class="logo-text">Harmony Hope</h1>
          </div>
          <div class="header-right">
            <div class="notification-icon">
              <i class="ri-notification-3-line"></i>
              <span class="notification-count">3</span>
            </div>
            <div class="user-info">
              <div class="user-avatar">
                <span class="user-initials">JD</span>
              </div>
              <span class="user-name">John Davis</span>
              <div class="dropdown-icon">
                <i class="ri-arrow-down-s-line"></i>
              </div>
            </div>
          </div>
        </div>
      </header> */}


      <div className="donation-container">
        <div className="dashboard-container">
          {/* Top Stat Cards */}
          <div className="stats-cards">
            <div className="card balance-card">
              <div className="icon">
                <i className="ri-heart-3-line"></i>
              </div>
              <div className="value">₹12,450</div>
              <div className="label">Total Balance</div>
            </div>
            <div className="card donations-card">
              <div className="icon">
                <i className="ri-heart-3-line"></i>
              </div>
              <div className="value">47</div>
              <div className="label">Total Donations Made</div>
            </div>
            <div className="card requests-card">
              <div className="icon">
                <i className="ri-hand-heart-line"></i>
              </div>
              <div className="value">8</div>
              <div className="label">Active Requests</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="donate-btn" onClick={() => navigate("/donate")}>Donate Now</button>
            <button className="request-btn" onClick={() => navigate("/request")}>Request Help</button>
          </div>

          {/* Main Content Section */}
          <div className="main-section">
            {/* Recent Donations */}
            <div className="donations-section">
              <div className="section-header">
                <h3>Recent Donations</h3>
                <div className="search-export">
                  <input type="text" placeholder="Search donations..." />
                  <button className="export-btn">Export</button>
                </div>
              </div>

              <ul className="donation-list">
                <li>
                  <div className="donation-item">
                    <div>
                      <strong>Education Support</strong>
                      <p>Dec 15, 2024</p>
                    </div>
                    <div>
                      <span className="amount">₹250</span>
                      <span className="status completed">Completed</span>
                    </div>
                  </div>
                </li>

                {/* More donation items here... */}
              </ul>

              <a href="#" className="view-all">View All Donations</a>
            </div>




            {/* ///////////////////////////////////////////////////////////// */}
            {/* Request Status */}
            <div className="requests-section">
              <div className="section-header">
                <h3>Request Status</h3>
                <div className="badge-summary">
                  <span className="badge blue">
                    Active: {requests.filter((r) => r.status === "pending").length}
                  </span>
                  <span className="badge grey">Total: {requests.length}</span>
                </div>
              </div>

              {
                loading ? <><div>Loading....</div></> : <>

                  <ul className="request-list">
                    {
                      requests.map((req) => (
                        <li className="request-card" key={req._id}>
                          <div>
                            <div className='forDays'>
                              <strong>{req.requestCategorie}</strong>
                              <strong>For <span style={{ color: "#3b82f6" }}>{req.daysToReturn}</span> Days</strong>
                            </div>
                            <p>Submitted {new Date(req.createdAt).toDateString()}</p>
                          </div>
                          <div className="progress-bar">
                            <div
                              className="progress filled"
                              style={{ width: "56%" }}
                            ></div>
                          </div>
                          <div className="request-footer">
                            <span>₹{req.amount}</span>
                            <span className={`status ${req.status}`}>{req.status}</span>
                          </div>
                          <div className="request-actions">
                            <a href="#">View Details</a>
                            <a href="#">Edit</a>
                            <button onClick={() => requestDelete(req._id)}>Delete Request</button>
                          </div>
                        </li>
                      ))
                    }
                  </ul>

                  {/* <a href="#" className="view-all">
                    View All Requests
                  </a> */}
                </>
              }
            </div>


            {/* /////////////////////////////////////////////////////////////////////             */}

          </div>
        </div >
      </div>

    </>);
};

export default UserDashboard;
