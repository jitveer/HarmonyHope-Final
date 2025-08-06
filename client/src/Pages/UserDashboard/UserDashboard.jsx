
import React, { useState } from "react";
import './UserDashboard.css';


const donations = [
  {
    name: "Education Support",
    date: "Dec 15, 2024",
    amount: "$250",
    status: "Completed",
    icon: "ri-heart-3-fill",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    statusColor: "text-green-600 bg-green-100",
  },
  {
    name: "Environmental Care",
    date: "Dec 12, 2024",
    amount: "$180",
    status: "Completed",
    icon: "ri-seedling-fill",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    statusColor: "text-green-600 bg-green-100",
  },
  {
    name: "Healthcare Initiative",
    date: "Dec 8, 2024",
    amount: "$320",
    status: "Completed",
    icon: "ri-hospital-fill",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    statusColor: "text-green-600 bg-green-100",
  },
  {
    name: "Food Security Program",
    date: "Dec 5, 2024",
    amount: "$150",
    status: "Processing",
    icon: "ri-restaurant-fill",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    statusColor: "text-yellow-600 bg-yellow-100",
  },
  {
    name: "Emergency Relief",
    date: "Dec 1, 2024",
    amount: "$500",
    status: "Completed",
    icon: "ri-shield-cross-fill",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    statusColor: "text-green-600 bg-green-100",
  },
];

const requests = [
  {
    name: "Educational Materials",
    date: "Submitted Dec 10, 2024",
    progress: 0.56,
    raised: "$450",
    goal: "$800",
    status: "Pending",
    icon: "ri-book-3-fill",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    statusColor: "text-yellow-600 bg-yellow-100",
    progressColor: "bg-primary",
    actions: [
      { label: "View Details", color: "text-primary hover:bg-blue-50 font-medium" },
      { label: "Edit", color: "text-gray-600 hover:bg-gray-50" },
    ],
  },
  {
    name: "Medical Treatment",
    date: "Submitted Dec 5, 2024",
    progress: 1,
    raised: "$1,200",
    goal: "$1,200",
    status: "Approved",
    icon: "ri-hospital-fill",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    statusColor: "text-green-600 bg-green-100",
    progressColor: "bg-secondary",
    actions: [
      { label: "View Details", color: "text-primary hover:bg-blue-50 font-medium" },
      { label: "Download Receipt", color: "text-secondary hover:bg-green-50 font-medium" },
    ],
  },
  {
    name: "Housing Support",
    date: "Submitted Nov 28, 2024",
    progress: 0,
    raised: "$0",
    goal: "$2,500",
    status: "In Review",
    icon: "ri-home-heart-fill",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    statusColor: "text-blue-600 bg-blue-100",
    progressColor: "bg-gray-400",
    actions: [
      { label: "View Details", color: "text-primary hover:bg-blue-50 font-medium" },
      { label: "Edit", color: "text-gray-600 hover:bg-gray-50" },
    ],
  },
];

function UserDashboard() {
  const [showMenu, setShowMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);

  const filteredDonations = donations.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  // For demonstration, notification count is static
  const notificationCount = 3;

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1
              className="text-2xl font-['Pacifico'] text-primary"
              style={{ fontFamily: "'Pacifico', cursive" }}
            >
              logo
            </h1>
          </div>
          <div className="flex items-center gap-4 relative">
            {/* Notification Bell */}
            <button
              className="w-10 h-10 flex items-center justify-center relative"
              onClick={() => {
                alert(
                  "You have 3 new notifications:\n• New donation received: $150\n• Request approved: Medical Treatment\n• Monthly report available"
                );
              }}
              aria-label="Notifications"
              type="button"
            >
              <i className="ri-notification-3-line text-xl text-gray-600"></i>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                {notificationCount}
              </span>
            </button>
            {/* User Menu */}
            <div className="flex items-center gap-3 relative">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
              <span className="text-gray-700 font-medium">John Davis</span>
              <button
                className="w-5 h-5 flex items-center justify-center"
                onClick={() => setShowMenu((v) => !v)}
                aria-label="User menu"
                type="button"
              >
                <i className="ri-arrow-down-s-line text-gray-500"></i>
              </button>
              {showMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Profile Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Donation History
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Help & Support
                  </a>
                  <hr className="my-2" />
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Sign Out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8 max-w-7xl mx-auto">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-500 rounded-lg">
                <i className="ri-wallet-3-line text-white text-xl"></i>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">$12,450</div>
            <div className="text-blue-700 font-medium">Total Balance</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-green-500 rounded-lg">
                <i className="ri-heart-3-line text-white text-xl"></i>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">47</div>
            <div className="text-green-700 font-medium">Total Donations Made</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-purple-500 rounded-lg">
                <i className="ri-hand-heart-line text-white text-xl"></i>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">8</div>
            <div className="text-purple-700 font-medium">Active Requests</div>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">
          <button
            className="bg-primary text-white px-8 py-4 rounded-[8px] font-semibold whitespace-nowrap flex items-center gap-3 hover:bg-blue-600 transition-colors shadow-lg"
            onClick={() => alert("Redirecting to donation form...")}
            type="button"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-hand-coin-line text-lg"></i>
            </div>
            Donate Now
          </button>
          <button
            className="bg-secondary text-white px-8 py-4 rounded-[8px] font-semibold whitespace-nowrap flex items-center gap-3 hover:bg-green-600 transition-colors shadow-lg"
            onClick={() => alert("Redirecting to help request form...")}
            type="button"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-hand-heart-line text-lg"></i>
            </div>
            Request Help
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Donation History Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recent Donations
                </h2>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search donations..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="absolute left-3 top-2.5 w-4 h-4 flex items-center justify-center pointer-events-none">
                      <i className="ri-search-line text-gray-400 text-sm"></i>
                    </div>
                  </div>
                  <button
                    className="text-primary hover:bg-blue-50 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap"
                    type="button"
                    onClick={() => alert("Exporting donations...")}
                  >
                    Export
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {filteredDonations.length === 0 && (
                  <div className="text-gray-500 text-center py-8">
                    No donations found.
                  </div>
                )}
                {filteredDonations.map((d, idx) => (
                  <div
                    key={d.name + d.date}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 flex items-center justify-center rounded-lg ${d.iconBg}`}
                      >
                        <i className={`${d.icon} ${d.iconColor}`}></i>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {d.name}
                        </div>
                        <div className="text-sm text-gray-500">{d.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        {d.amount}
                      </div>
                      <div
                        className={`text-xs px-2 py-1 rounded-full ${d.statusColor}`}
                      >
                        {d.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <button
                  className="text-primary hover:bg-blue-50 px-4 py-2 rounded-lg font-medium whitespace-nowrap"
                  type="button"
                  onClick={() => alert("Viewing all donations...")}
                >
                  View All Donations
                </button>
              </div>
            </div>
          </div>

          {/* Request Status Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Request Status
                </h2>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-primary text-white text-sm rounded-full">
                    Active: 3
                  </div>
                  <div className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">
                    Total: 8
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {requests.map((r, idx) => (
                  <div
                    key={r.name + r.date}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 flex items-center justify-center rounded-lg ${r.iconBg}`}
                        >
                          <i className={`${r.icon} ${r.iconColor} text-sm`}></i>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {r.name}
                          </div>
                          <div className="text-sm text-gray-500">{r.date}</div>
                        </div>
                      </div>
                      <div
                        className={`text-xs px-2 py-1 rounded-full ${r.statusColor}`}
                      >
                        {r.status}
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="text-gray-900">
                          {r.raised} / {r.goal}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`${r.progressColor} h-2 rounded-full`}
                          style={{ width: `${r.progress * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {r.actions.map((a, i) => (
                        <button
                          key={a.label}
                          className={`${a.color} px-3 py-1 rounded text-sm whitespace-nowrap`}
                          type="button"
                          onClick={() => alert(a.label)}
                        >
                          {a.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <button
                  className="text-primary hover:bg-blue-50 px-4 py-2 rounded-lg font-medium whitespace-nowrap"
                  type="button"
                  onClick={() => alert("Viewing all requests...")}
                >
                  View All Requests
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default UserDashboard;
