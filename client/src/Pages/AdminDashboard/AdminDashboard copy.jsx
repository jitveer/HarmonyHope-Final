import { useEffect, useState } from "react";
import "./AdminDashboard.css";
import styles from "./AdminDashboard.module.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // 🔹 State for filters
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [dateFilter, setDateFilter] = useState("");

  const handleApprove = async (status, id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/requests/status/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        setRequests((prev) =>
          prev.map((req) => (req._id === id ? data.request : req))
        );
      }
    } catch (error) {
      alert("Server error");
    }
  };

  // 🔹 Export filtered table data as CSV
  const exportTableData = () => {
    if (!filteredRequests || filteredRequests.length === 0) {
      alert("No data available to export!");
      return;
    }

    // Define headers
    const headers = [
      "Request ID",
      "Beneficiary Name",
      "Beneficiary Email",
      "Amount",
      "Category",
      "Status",
      "Date",
    ];

    // Convert filtered rows into CSV format
    const rows = filteredRequests.map((req) => [
      req._id,
      req.user?.name || "",
      req.user?.email || "",
      `₹${req.amount}`,
      req.requestCategorie || "",
      req.status,
      new Date(req.createdAt).toLocaleDateString(),
    ]);

    // CSV String
    const csvContent =
      "\uFEFF" +
      [headers, ...rows]
        .map((row) =>
          row
            .map((val) => `"${String(val).replace(/"/g, '""')}"`)
            .join(",")
        )
        .join("\n");

    // Create file & download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
    link.href = url;
    link.download = `donation-requests-${stamp}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 🔹 Effect to apply filters whenever requests or filter criteria change
  useEffect(() => {
    let filtered = requests;

    // Search query filter (searches by ID, Name, or Email)
    if (searchQuery) {
      filtered = filtered.filter(
        (req) =>
          req._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (req.user?.name &&
            req.user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (req.user?.email &&
            req.user.email.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Status filter
    if (statusFilter !== "All Status") {
      filtered = filtered.filter((req) => req.status === statusFilter.toLowerCase());
    }

    // Category filter
    if (categoryFilter !== "All Categories") {
      filtered = filtered.filter((req) => req.requestCategorie === categoryFilter);
    }

    // Date filter
    if (dateFilter) {
      const filterDate = new Date(dateFilter).toLocaleDateString();
      filtered = filtered.filter(
        (req) => new Date(req.createdAt).toLocaleDateString() === filterDate
      );
    }

    setFilteredRequests(filtered);
  }, [requests, searchQuery, statusFilter, categoryFilter, dateFilter]);


  // 🔹 Clear all active filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("All Status");
    setCategoryFilter("All Categories");
    setDateFilter("");
  };

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
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    const checkPathByRole = () => {
      if (!token) {
        navigate("/");
        return;
      }
      const decodedUser = jwtDecode(token);
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
      <div className={styles["dashboardContainer"]}>
        <div className={styles["rightSide"]}>
          <div className={styles["tabContainer"]}>
            <div className={styles["totalDonation top-cards"]}>
              <div className={styles["textpart"]}>
                <p>Total Donations</p>
                <h2>0</h2>
                <p>12.5% vs last month</p>
              </div>
              <div className={styles["logopart"]}>
                <i className="ri-money-dollar-circle-line logo"></i>
              </div>
            </div>

            <div className={styles["pendingRequests top-cards"]}>
              <div className={styles["textpart"]}>
                <p>Pending Requests</p>
                <h2>{requests.filter((r) => r.status === "pending").length}</h2>
                <p>= new today</p>
              </div>
              <div className={styles["logopart"]}>
                <i className="ri-time-line text-yellow-600 logo"></i>
              </div>
            </div>

            <div className={styles["approvedRequests top-cards"]}>
              <div className={styles["textpart"]}>
                <p>Approved Requests</p>
                <h2>
                  {requests.filter((r) => r.status === "approved").length}
                </h2>
                <p>+ this week</p>
              </div>
              <div className={styles["logopart"]}>
                <i className={styles["ri-check-line text-green-600 logo"]}></i>
              </div>
            </div>

            <div className={styles["totalBeneficiaries top-cards"]}>
              <div className={styles["textpart"]}>
                <p>Total Beneficiaries</p>
                <h2>{requests.length}</h2>
                <p>Total requests</p>
              </div>
              <div className={styles["logopart"]}>
                <i className={styles["ri-group-line text-purple-600 logo "]}></i>
              </div>
            </div>
          </div>

          <div className={styles["donation-card"]}>
            {/* Header Section */}
            <div className={styles["donation-header"]}>
              <div className={styles["donation-header-top"]}>
                <h3 className={styles["donation-title"]}>Donation Requests</h3>
                <button className={styles["btn btn-primary"]} onClick={exportTableData}>
                  <div className={styles["btn-content"]}>
                    <i className={styles["ri-download-line"]}></i>
                    <span>Export Data</span>
                  </div>
                </button>
              </div>

              {/* Filters */}
              <div className={styles["donation-filters"]}>
                <div className={styles["search-box"]}>
                  <input
                    type="text"
                    placeholder="Search requests..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <i className={styles["ri-search-line"]}></i>
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option>All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option>All Categories</option>
                  <option>Medical</option>
                  <option>Education</option>
                  <option>Emergency</option>
                  <option>Food</option>
                </select>

                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
                <button className={styles["btn-clear"]} onClick={handleClearFilters}>
                  Clear Filters
                </button>
              </div>
            </div>

            {/* Table Section */}
            <div className={styles["table-wrapper"]}>
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
                  {filteredRequests.length > 0 ? (
                    filteredRequests.map((req) => (
                      <tr key={req._id}>
                        <td>
                          <input type="checkbox" />
                        </td>
                        <td>{req._id}</td>
                        <td>
                          <div className={styles["beneficiary"]}>
                            <img
                              src={`https://ui-avatars.com/api/?name=${req.user?.name}`}
                              alt={req.user?.name}
                            />
                            <div>
                              <div className={styles["name"]}>{req.user?.name}</div>
                              <div className={styles["email"]}>{req.user?.email}</div>
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
                        <td>
                          {new Date(req.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <button
                            className={styles["btn btn-green"]}
                            onClick={() => handleApprove("approved", req._id)}
                          >
                            Approve
                          </button>
                          <button
                            className={styles["btn btn-red"]}
                            onClick={() => handleApprove("rejected", req._id)}
                          >
                            Reject
                          </button>
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
