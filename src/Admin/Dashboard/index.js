import { memo, useEffect, useRef, useState } from "react";
import "./style.scss";
import { basePath } from "../../config";
import { generateHeader } from "../../helper";
import DateRangeFilter from "../../app/DateRangeFilter";
import Charts from "../Charts";

function Dashboard() {
  // Get today's date
  const today = new Date();

  // Get 15 days before today
  const fifteenDaysAgo = new Date();
  fifteenDaysAgo.setDate(today.getDate() - 15);

  // Format as YYYY-MM-DD (optional, for date inputs)
  const formatDate = (date) => date.toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(formatDate(fifteenDaysAgo));
  const [endDate, setEndDate] = useState(formatDate(today));
  const [data, setData] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    fetchFilteredData(); // Fetch all data on first load
  }, []);

  async function fetchFilteredData(
    selectedStart = startDate,
    selectedEnd = endDate
  ) {
    setData(null);
    let url = `${basePath}/dashboard/tiles`;

    // Add query params only if both dates are selected
    if (selectedStart && selectedEnd) {
      url += `?startDate=${selectedStart}&endDate=${selectedEnd}`;
    }

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: generateHeader(),
      });
      const result = await res.json();
      console.log("API Response:", result);
      setData(result);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  }

  const handleDateChange = (start, end) => {
    // Format to YYYY-MM-DD for API
    const formattedStart = start.toISOString().split("T")[0];
    const formattedEnd = end.toISOString().split("T")[0];

    if (timerRef.current != null) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      fetchFilteredData(formattedStart, formattedEnd);
    }, 2000);
  };

  return (
    <div className="dashboard-page">
      <div className="main-top-container d-flex justify-content-between">
        <div>
          <h2>Dashboard</h2>
          <p className="mt-3 admin-label-text font-14">Welcome back, User</p>
        </div>
        <div>
          <DateRangeFilter
            containerClasses="mt-5"
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            onChange={handleDateChange}
          />
        </div>
      </div>

      <div className="dashboard-data-container d-flex flex-wrap mt-3 gap-3">
        <div className="dashoard-data bg-white p-4 rounded-3">
          <p className="font-14">Total Travel Spend</p>
          <p className="font-24 font-bold mt-2">
            ₹{data ? data.totalTravelSpend.toFixed(2).toLocaleString() : "--"}
          </p>
        </div>

        <div className="dashoard-data bg-white p-4 rounded-3">
          <p className="font-14">Total Bookings</p>
          <p className="font-24 font-bold mt-2">
            {data ? data.totalBookings : "--"}
          </p>
        </div>

        <div className="dashoard-data bg-white p-4 rounded-3">
          <p className="font-14">Total Management Fees</p>
          <p className="font-24 font-bold mt-2">
            ₹
            {data ? data.totalManagementFees.toFixed(2).toLocaleString() : "--"}
          </p>
        </div>

        <div className="dashoard-data bg-white p-4 rounded-3">
          <p className="font-14">Avg. Cost per Trip</p>
          <p className="font-24 font-bold mt-2">
            ₹{data ? data.avgCostPerTrip.toFixed(2).toLocaleString() : "--"}
          </p>
        </div>

        <div className="dashoard-data bg-white p-4 rounded-3">
          <p className="font-14">Avg. Nights per Booking</p>
          <p className="font-24 font-bold mt-2">
            {data ? data.avgNightsPerBooking.toFixed(2) : "--"}
          </p>
        </div>
      </div>

      <div className="charts-container">
        <Charts />
      </div>
    </div>
  );
}

export default memo(Dashboard);
