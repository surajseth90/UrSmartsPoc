import { memo, useEffect, useState } from "react";
import "./style.scss";
import { basePath } from "../../config";
import { generateHeader } from "../../helper";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    let url = `${basePath}/dashboard/tiles`;

    await fetch(url, {
      method: "GET",
      headers: generateHeader(),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
   
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  return (
    <div className="dashboard-page">
      <div className="main-top-container">
        <h2>Dashboard</h2>
        <p className="mt-3 admin-label-text font-14">Welcome back, User</p>
      </div>

      <div className="dashboard-data-container d-flex flex-wrap mt-3 gap-3">
        <div className="dashoard-data bg-white p-4 rounded-3">
          <p className="font-14">Total Travel Spend</p>
          <p className="font-24 font-bold mt-2">₹50,000</p>
          <p className="admin-green-text mt-2">+10%</p>
        </div>

        <div className="dashoard-data bg-white p-4 rounded-3">
          <p className="font-14">Total Bookings</p>
          <p className="font-24 font-bold mt-2">250</p>
          <p className="admin-green-text mt-2">+10%</p>
        </div>

        <div className="dashoard-data bg-white p-4 rounded-3">
          <p className="font-14">Total Management Fees</p>
          <p className="font-24 font-bold mt-2">₹10,000</p>
          <p className="admin-green-text mt-2">+10%</p>
        </div>

        <div className="dashoard-data bg-white p-4 rounded-3">
          <p className="font-14">Avg. Cost per Trip</p>
          <p className="font-24 font-bold mt-2">₹10,000</p>
          <p className="admin-green-text mt-2">+10%</p>
        </div>

        <div className="dashoard-data bg-white p-4 rounded-3">
          <p className="font-14">Avg. Nights per Booking</p>
          <p className="font-24 font-bold mt-2">3</p>
          <p className="admin-green-text mt-2">+10%</p>
        </div>
      </div>
    </div>
  );
}

export default memo(Dashboard);
