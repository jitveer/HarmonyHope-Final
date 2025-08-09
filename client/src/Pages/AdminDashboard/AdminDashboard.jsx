import './AdminDashboard.css'

const AdminDashboard = () => {
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



                <div class="rightSide">

                    <div className="tabContainer">
                        <div className="totalDonation">
                            <div className="textpart">
                                <p>Total Donations</p>
                                <h2>8475rs</h2>
                                <p>12.5% vs last month</p>
                            </div>
                            <div className="logopart">
                                <i class="ri-money-dollar-circle-line logo "></i>
                            </div>
                        </div>

                        <div className="pendingRequests">
                            <div className="textpart">
                                <p>Panding Requests</p>
                                <h2>23</h2>
                                <p>=3 new today</p>
                            </div>
                            <div className="logopart">
                                <i class="ri-time-line text-yellow-600 logo "></i>
                            </div>
                        </div>

                        <div className="approvedRequests">
                            <div className="textpart">
                                <p>Approved Requests</p>
                                <h2>165</h2>
                                <p>+802% this week</p>
                            </div>
                            <div className="logopart">
                                <i class="ri-check-line text-green-600 logo"></i>
                            </div>
                        </div>

                        <div className="totalBeneficiaries">
                            <div className="textpart">
                                <p>Total Beneficiaries</p>
                                <h2>8475rs</h2>
                                <p>12.5% vs last month</p>
                            </div>
                            <div className="logopart">
                                <i class="ri-group-line text-purple-600 logo "></i>
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
                                        <th><input type="checkbox" /></th>
                                        <th>Request ID <i className="ri-arrow-up-down-line"></i></th>
                                        <th>Beneficiary <i className="ri-arrow-up-down-line"></i></th>
                                        <th>Amount <i className="ri-arrow-up-down-line"></i></th>
                                        <th>Category</th>
                                        <th>Status</th>
                                        <th>Date <i className="ri-arrow-up-down-line"></i></th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Row 1 */}
                                    <tr>
                                        <td><input type="checkbox" /></td>
                                        <td>#DR-2024-001</td>
                                        <td>
                                            <div className="beneficiary">
                                                <img src="https://readdy.ai/api/search-image?query=portrait%20of%20Maria%20Rodriguez%2C%20hispanic%20woman%2C%20warm%20smile%2C%20professional%20headshot%2C%20clean%20background&width=32&height=32&seq=ben1&orientation=squarish" alt="" />
                                                <div>
                                                    <div className="name">raja</div>
                                                    <div className="email">rajas@email.com</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>₹2,500</td>
                                        <td>Medical</td>
                                        <td><span className="status pending">Pending</span></td>
                                        <td>Dec 15, 2024</td>
                                        <td>
                                            <button className="btn btn-green">Approve</button>
                                            <button className="btn btn-red">Reject</button>
                                        </td>
                                    </tr>

                                    {/* Row 2 */}
                                    <tr>
                                        <td><input type="checkbox" /></td>
                                        <td>#DR-2024-002</td>
                                        <td>
                                            <div className="beneficiary">
                                                <img src="https://readdy.ai/api/search-image?query=portrait%20of%20James%20Wilson%2C%20african%20american%20man%2C%20kind%20expression%2C%20professional%20headshot%2C%20clean%20background&width=32&height=32&seq=ben2&orientation=squarish" alt="" />
                                                <div>
                                                    <div className="name">James Wilson</div>
                                                    <div className="email">james.wilson@email.com</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>₹1,200</td>
                                        <td>Education</td>
                                        <td><span className="status approved">Approved</span></td>
                                        <td>Dec 14, 2024</td>
                                        <td>
                                            <button className="btn btn-disabled">Approved</button>
                                        </td>
                                    </tr>

                                    {/* Row 3 */}
                                    <tr>
                                        <td><input type="checkbox" /></td>
                                        <td>#DR-2024-003</td>
                                        <td>
                                            <div className="beneficiary">
                                                <img src="https://readdy.ai/api/search-image?query=portrait%20of%20Lisa%20Chen%2C%20asian%20woman%2C%20gentle%20smile%2C%20professional%20headshot%2C%20clean%20background&width=32&height=32&seq=ben3&orientation=squarish" alt="" />
                                                <div>
                                                    <div className="name">Lisa Chen</div>
                                                    <div className="email">lisa.chen@email.com</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>₹800</td>
                                        <td>Emergency</td>
                                        <td><span className="status pending">Pending</span></td>
                                        <td>Dec 13, 2024</td>
                                        <td>
                                            <button className="btn btn-green">Approve</button>
                                            <button className="btn btn-red">Reject</button>
                                        </td>
                                    </tr>

                                    {/* Row 4 */}
                                    <tr>
                                        <td><input type="checkbox" /></td>
                                        <td>#DR-2024-004</td>
                                        <td>
                                            <div className="beneficiary">
                                                <img src="https://readdy.ai/api/search-image?query=portrait%20of%20Michael%20Thompson%2C%20caucasian%20man%2C%20friendly%20expression%2C%20professional%20headshot%2C%20clean%20background&width=32&height=32&seq=ben4&orientation=squarish" alt="" />
                                                <div>
                                                    <div className="name">Michael Thompson</div>
                                                    <div className="email">michael.thompson@email.com</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>₹3,200</td>
                                        <td>Food</td>
                                        <td><span className="status rejected">Rejected</span></td>
                                        <td>Dec 12, 2024</td>
                                        <td>
                                            <button className="btn btn-disabled">Rejected</button>
                                        </td>
                                    </tr>

                                    {/* Row 5 */}
                                    <tr>
                                        <td><input type="checkbox" /></td>
                                        <td>#DR-2024-005</td>
                                        <td>
                                            <div className="beneficiary">
                                                <img src="https://readdy.ai/api/search-image?query=portrait%20of%20Aisha%20Patel%2C%20indian%20woman%2C%20warm%20smile%2C%20professional%20headshot%2C%20clean%20background&width=32&height=32&seq=ben5&orientation=squarish" alt="" />
                                                <div>
                                                    <div className="name">Aisha Patel</div>
                                                    <div className="email">aisha.patel@email.com</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>₹1,800</td>
                                        <td>Medical</td>
                                        <td><span className="status pending">Pending</span></td>
                                        <td>Dec 11, 2024</td>
                                        <td>
                                            <button className="btn btn-green">Approve</button>
                                            <button className="btn btn-red">Reject</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="pagination">
                            <div>Showing 1 to 5 of 23 results</div>
                            <div className="pagination-buttons">
                                <button disabled>Previous</button>
                                <button className="active">1</button>
                                <button>2</button>
                                <button>3</button>
                                <button>Next</button>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </>
    )
}

export default AdminDashboard;