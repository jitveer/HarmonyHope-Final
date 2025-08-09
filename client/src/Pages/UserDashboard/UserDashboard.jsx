import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';


const UserDashboard = () => {

  const navigate = useNavigate();
  
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
              <div className="value">$12,450</div>
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
            <button className="request-btn"onClick={() => navigate("/request")}>Request Help</button>
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
                      <span className="amount">$250</span>
                      <span className="status completed">Completed</span>
                    </div>
                  </div>
                </li>

                {/* More donation items here... */}
              </ul>

              <a href="#" className="view-all">View All Donations</a>
            </div>

            {/* Request Status */}
            <div className="requests-section">
              <div className="section-header">
                <h3>Request Status</h3>
                <div className="badge-summary">
                  <span className="badge blue">Active: 3</span>
                  <span className="badge grey">Total: 8</span>
                </div>
              </div>

              <ul className="request-list">
                <li className="request-card">
                  <div>
                    <strong>Educational Materials</strong>
                    <p>Submitted Dec 10, 2024</p>
                  </div>
                  <div className="progress-bar">
                    <div className="progress filled" style={{ width: '56%' }}></div>
                  </div>
                  <div className="request-footer">
                    <span>$450 / $800</span>
                    <span className="status pending">Pending</span>
                  </div>
                  <div className="request-actions">
                    <a href="#">View Details</a>
                    <a href="#">Edit</a>
                  </div>
                </li>

                {/* More request cards... */}
              </ul>

              <a href="#" className="view-all">View All Requests</a>
            </div>
          </div>
        </div >
      </div>

    </>);
};

export default UserDashboard;
