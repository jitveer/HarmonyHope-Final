import { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAllUserRequest = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/requests/admin", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setRequests(data.requests || []);
          console.log("Requests:", data.requests);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    // TAKING USER ROLE FOR REDIRECTION
    const checkPathByRole = () => {
      const decodedUser = jwtDecode(token);
      console.log(decodedUser.role);
      if (decodedUser.role === "user") {
        navigate("/user-dashboard");
      } else if (decodedUser.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    };

    fetchAllUserRequest();
    checkPathByRole();
  }, [navigate, token]);

  return (
    <>
      <div className="dashboardContainer">
        <div className="sideSlider">
          <div className="tab-button">
            <div className="p">Dashboard</div>
          </div>
          <div className="tab-button">
            <div className="p">Donation Request</div>
          </div>
          <div className="tab-button">
            <div className="p">Beneficiaries</div>
          </div>
          <div className="tab-button">
            <div className="p">Analytics</div>
          </div>
          <div className="tab-button">
            <div className="p">Setting</div>
          </div>
        </div>

        <div className="rightSide">
          <div className="tabContainer">
            <div className="totalDonation">
              <div className="textpart">
                <p>Total Donations</p>
                <h2>8475rs</h2>
                <p>12.5% vs last month</p>
              </div>
              <div className="logopart">
                <i className="ri-money-dollar-circle-line logo "></i>
              </div>
            </div>

            <div className="pendingRequests">
              <div className="textpart">
                <p>Pending Requests</p>
                <h2>{requests.filter((r) => r.status === "pending").length}</h2>
                <p>= new today</p>
              </div>
              <div className="logopart">
                <i className="ri-time-line text-yellow-600 logo "></i>
              </div>
            </div>

            <div className="approvedRequests">
              <div className="textpart">
                <p>Approved Requests</p>
                <h2>{requests.filter((r) => r.status === "approved").length}</h2>
                <p>+ this week</p>
              </div>
              <div className="logopart">
                <i className="ri-check-line text-green-600 logo"></i>
              </div>
            </div>

            <div className="totalBeneficiaries">
              <div className="textpart">
                <p>Total Beneficiaries</p>
                <h2>{requests.length}</h2>
                <p>Total requests</p>
              </div>
              <div className="logopart">
                <i className="ri-group-line text-purple-600 logo "></i>
              </div>
            </div>
          </div>

          <div className="donation-card">
            {/* Header Section */}
            <div className="donation-header">
              <div className="donation-header-top">
                <h3 className="donation-title">Donation Requests</h3>
                <button className="btn btn-primary">
                  <div className="btn-content">
                    <i className="ri-download-line"></i>
                    <span>Export Data</span>
                  </div>
                </button>
              </div>

              {/* Filters */}
              <div className="donation-filters">
                <div className="search-box">
                  <input type="text" placeholder="Search requests..." />
                  <i className="ri-search-line"></i>
                </div>

                <select>
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>

                <select>
                  <option>All Categories</option>
                  <option>Medical</option>
                  <option>Education</option>
                  <option>Emergency</option>
                  <option>Food</option>
                </select>

                <input type="date" />

                <button className="btn-clear">Clear Filters</button>
              </div>
            </div>

            {/* Table Section */}
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th>Request ID</th>
                    <th>Beneficiary</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.length > 0 ? (
                    requests.map((req) => (
                      <tr key={req._id}>
                        <td>
                          <input type="checkbox" />
                        </td>
                        <td>{req._id}</td>
                        <td>
                          <div className="beneficiary">
                            <img
                              src={`https://ui-avatars.com/api/?name=${req.user?.name}`}
                              alt={req.user?.name}
                            />
                            <div>
                              <div className="name">{req.user?.name}</div>
                              <div className="email">{req.user?.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>₹{req.amount}</td>
                        <td>{req.requestCategorie}</td>
                        <td>
                          <span className={`status ${req.status}`}>
                            {req.status}
                          </span>
                        </td>
                        <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                        <td>
                          <button className="btn btn-green">Approve</button>
                          <button className="btn btn-red">Reject</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" style={{ textAlign: "center" }}>
                        No Requests Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
