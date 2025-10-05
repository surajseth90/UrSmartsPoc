import { memo, useEffect, useRef, useState } from "react";
import "./style.scss";
import { basePath } from "../../config";
import { generateHeader } from "../../helper";
import Charts from "../Charts";
import Filters from "./filters";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function Dashboard() {
  const [data, setData] = useState(null);
  const timerRef = useRef(null);
  const chartsRef = useRef(null);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [loadingCharts, setLoadingCharts] = useState(false);
  const divRef = useRef();

  useEffect(() => {
    // fetchFilteredData(); // Fetch all data on first load
  }, []);

  async function fetchFilteredData(
    selectedStart,
    selectedEnd,
    states,
    cities,
    clientIds
  ) {
    setDashboardLoading(true);
    setData(null);

    const url = new URL(`${basePath}/dashboard/tiles`);
    const params = new URLSearchParams();

    // Add date filters
    if (selectedStart && selectedEnd) {
      params.append("startDate", selectedStart);
      params.append("endDate", selectedEnd);
    }

    // Handle clientIds: array or single number
    if (Array.isArray(clientIds)) {
      clientIds.forEach(id => params.append("clientIds", id));
    } else if (typeof clientIds === "number" || typeof clientIds === "string") {
      params.append("clientIds", clientIds);
    }

    // Add states
    if (Array.isArray(states)) {
      states.forEach(state => params.append("states", state));
    }

    // Add cities
    if (Array.isArray(cities)) {
      cities.forEach(city => params.append("cities", city));
    }

    // Final URL with query params
    url.search = params.toString();

    try {
      const res = await fetch(url.toString(), {
        method: "GET",
        headers: generateHeader(),
      });
      const result = await res.json();
      console.log("API Response:", result);
      setData(result);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setDashboardLoading(false);
    }
  }


  const onSearch = ({ startDate, endDate, states, cities, sapId }) => {
    if (timerRef.current != null) {
      clearTimeout(timerRef.current);
    }
    // timerRef.current = setTimeout(() => {
    fetchFilteredData(startDate, endDate, states, cities, sapId);
    chartsRef.current.fetchChartData(startDate, endDate, states, cities, sapId);
    // }, 2000);
  }
const downloadPdf = async () => {
  // Hide all elements with the 'no-print' class
  const elementsToHide = document.querySelectorAll('.no-print');
  elementsToHide.forEach(el => el.style.display = 'none');

  const input = divRef.current;

  const canvas = await html2canvas(input, {
    scale: 2,
    useCORS: true,
    scrollY: -window.scrollY
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgProps = pdf.getImageProperties(imgData);
  const imgWidth = pageWidth;
  const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save('multi-page-content.pdf');

  // Show the elements again
  elementsToHide.forEach(el => el.style.display = '');
};


  return (
    <div className="dashboard-page">
      <div className="main-top-container d-flex justify-content-between">
        <div>
          <h2>Dashboard</h2>
          <p className="mt-3 admin-label-text font-14">Welcome back, User</p>
        </div>
      </div>



      <Filters onSearch={onSearch} isLoading={dashboardLoading} />

      <div ref={divRef} className="mt-4">

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
          <Charts
            ref={chartsRef}
            loadingCharts={loadingCharts}
            setLoadingCharts={setLoadingCharts}
            downloadPdf={downloadPdf}
          />
        </div>

      </div>

    </div>
  );
}

export default memo(Dashboard);
