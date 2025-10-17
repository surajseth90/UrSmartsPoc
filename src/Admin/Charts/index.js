import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  BarChart,
  PieChart,
  Bar,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  Legend,
} from "recharts";
import { basePath } from "../../config";
import { generateHeader } from "../../helper";
import "./style.scss";

// Color scheme
const COLORS = {
  primary: "#172B4D",
  secondary: "#466CAD",
  accent: "#ABCAFF",
  chartColors: [
    // 🌈 Rainbow base hues
    "#FF0000", // Red
    "#FF7F00", // Orange
    "#FFFF00", // Yellow
    "#00FF00", // Green
    "#0000FF", // Blue
    "#4B0082", // Indigo
    "#8B00FF", // Violet

    // 🌤️ Extended shades (similar tones)
    "#FF4C4C", // Light Red
    "#FFA64D", // Light Orange
    "#FFF14D", // Soft Yellow
    "#80FF80", // Light Green
    "#66B2FF", // Sky Blue
    "#9F7FFF", // Soft Purple
    "#FF66CC", // Pinkish Magenta

    // 🌺 Midtone variants
    "#E60026", // Crimson Red
    "#FF9A00", // Amber
    "#E6E600", // Golden Yellow
    "#33CC33", // Emerald
    "#0073E6", // Medium Blue
    "#9933FF", // Vivid Violet
    "#FF33A6", // Fuchsia

    // 🌊 Cool and deep tones
    "#00CCCC", // Cyan
    "#33FFCC", // Aqua Mint
    "#99FF66", // Lime
    "#FFFF99", // Pale Yellow
    "#FFB3E6", // Pastel Pink
    "#B366FF", // Lavender
    "#6666FF", // Periwinkle
    "#00B3B3", // Teal
    "#FF6F61", // Coral
  ],
};

// Helper function to process early check-in times
const processCheckinTimes = (data) => {
  const checkoutCountMap = {};
  data.forEach(cityData => {
    cityData.earlyCheckInTimes.forEach(time => {
      checkoutCountMap[time] = (checkoutCountMap[time] || 0) + 1;
    });
  });

  return Object.keys(checkoutCountMap).map(time => ({
    time,
    count: checkoutCountMap[time],
  }));
};

const processCheckoutTimes = (data) => {
  const checkoutCountMap = {};
  data.forEach(cityData => {
    cityData?.checkoutTimes.forEach(time => {
      checkoutCountMap[time] = (checkoutCountMap[time] || 0) + 1;
    });
  });

  return Object.keys(checkoutCountMap).map(time => ({
    time,
    count: checkoutCountMap[time],
  }));
};

const Charts = forwardRef((props, ref) => {
  const { loadingCharts, setLoadingCharts, downloadPdf } = props;
  const [chartData, setChartData] = useState({
    spendByState: [],
    spendByCity: [],
    nightsByOccupancy: [],
    spendByMealPlan: [],
    earlyCheckins: [],
    lateCheckouts: [],
  });

  const shouldShowDownload = Object.values(chartData).some((dataArray) => dataArray.length > 0);

  useImperativeHandle(ref, () => ({
    fetchChartData,
  }));

  const fetchChartData = async (...params) => {
    setLoadingCharts(true);

    const [startDate, endDate, states = [], cities = [], sapId = "", companies = []] = params;
    const headers = generateHeader();

    const buildQueryParams = ({ excludeState = false, excludeCity = false } = {}) => {
      const query = new URLSearchParams();

      if (startDate) query.append("startDate", startDate);
      if (endDate) query.append("endDate", endDate);
      if (sapId) query.append("sapId", sapId);

      if (!excludeState && Array.isArray(states)) {
        states.forEach((state) => query.append("states", state));
      }

      if (!excludeCity && Array.isArray(cities)) {
        cities.forEach((city) => query.append("cities", city));
      }

      if (Array.isArray(companies)) {
        companies.forEach((company) => query.append("companies", company));
      }

      return query.toString();
    };

    try {
      const [
        spendStateRes,
        spendCityRes,
        occupancyRes,
        earlyCheckinsRes,
        lateCheckoutsRes,
        mealPlanRes,
      ] = await Promise.all([
        fetch(`${basePath}/dashboard/spend-by-state?${buildQueryParams({ excludeCity: true })}`, { method: "GET", headers }).then(res => res.json()),
        fetch(`${basePath}/dashboard/spend-by-city?${buildQueryParams({ excludeState: true })}`, { method: "GET", headers }).then(res => res.json()),
        fetch(`${basePath}/dashboard/nights-by-occupancy?${buildQueryParams()}`, { method: "GET", headers }).then(res => res.json()),
        fetch(`${basePath}/dashboard/early-checkins?${buildQueryParams()}`, { method: "GET", headers }).then(res => res.json()),
        fetch(`${basePath}/dashboard/late-checkouts?${buildQueryParams()}`, { method: "GET", headers }).then(res => res.json()),
        fetch(`${basePath}/dashboard/spend-by-meal-plan?${buildQueryParams()}`, { method: "GET", headers }).then(res => res.json()),
      ]);

      const earlyCheckinsData = Array.isArray(earlyCheckinsRes) && earlyCheckinsRes.length > 0
        ? processCheckinTimes(earlyCheckinsRes) : [];

      const lateCheckoutData = Array.isArray(lateCheckoutsRes) && lateCheckoutsRes.length > 0
        ? processCheckoutTimes(lateCheckoutsRes) : [];

      setChartData({
        spendByState: sortedArr(spendStateRes, "totalSellCost"),
        spendByCity: sortedArr(spendCityRes, "totalSellCost"),
        nightsByOccupancy: sortedArr(occupancyRes , "noOfNights"),
        earlyCheckins: earlyCheckinsData,
        spendByMealPlan: sortedArr(mealPlanRes, "totalSellCost"),
        lateCheckouts: lateCheckoutData,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoadingCharts(false);
    }
  };

  function sortedArr(arr, key) {
    return arr.sort((a, b) => b[key] - a[key]);
  }

  return (
    <div className="dashboard-container">
      {loadingCharts ? (
        <main className="full-page">
          <div className="loader"></div>
        </main>
      ) : (
        <div>
          {shouldShowDownload && (
            <div className="d-flex w-100 justify-content-end">
              <button className="admin-primary-btn no-print my-3 px-4" onClick={downloadPdf}>
                Download PDF
              </button>
            </div>
          )}

          <div className="charts-grid">

            {/* Pie – Spend by State */}
            {chartData.spendByState.length > 0 && (
              <ChartCard title="Spend by State">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={chartData.spendByState}
                    margin={{ top: 20, right: 30, left: 0, bottom: 50 }}
                    barSize={15}
                  >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                      dataKey="state"
                      angle={-45}
                      textAnchor="end"
                      interval={0}
                      height={100}
                    />

                    <YAxis
                      tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}

                    />

                    <Tooltip
                      formatter={(value, name, props) => [
                        `₹${value.toLocaleString()}`,
                        props?.payload?.state,
                      ]}
                      contentStyle={{
                        backgroundColor: COLORS.primary,
                        color: "#fff",
                      }}
                    />

                    {/* <Legend /> */}

                    <Bar dataKey="totalSellCost">
                      {chartData.spendByState.map((entry, index) => (
                        <Cell
                          key={`state-bar-${index}`}
                          fill={COLORS.chartColors[index % COLORS.chartColors.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

            )}

            {/* Pie – Spend by City */}
            {chartData.spendByCity.length > 0 && (
              <ChartCard title="Spend by City">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={chartData.spendByCity}
                    margin={{ top: 20, right: 30, left: 0, bottom: 50 }}
                    barSize={15}

                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="city"
                      angle={-45}
                      textAnchor="end"
                      interval={0}
                      height={80}
                    />
                    <YAxis
                      tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      formatter={(value, name, props) => [
                        `₹${value.toLocaleString()}`,
                        props?.payload?.city,
                      ]}
                      contentStyle={{
                        backgroundColor: COLORS.primary,
                        color: "#fff",
                      }}
                    />
                    {/* <Legend /> */}
                    <Bar dataKey="totalSellCost" fill={COLORS.chartColors[0]}>
                      {chartData.spendByCity.map((entry, index) => (
                        <Cell
                          key={`city-bar-${index}`}
                          fill={COLORS.chartColors[index % COLORS.chartColors.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

            )}

            {/* Pie – Spend by Meal Plan */}
            {chartData.spendByMealPlan.length > 0 && (
              <ChartCard title="Spend by Meal Plan">
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={chartData.spendByMealPlan}
                      dataKey="totalSellCost"
                      nameKey="plan"
                      outerRadius={100}
                    >
                      {chartData.spendByMealPlan.map((entry, index) => (
                        <Cell
                          key={`meal-pie-${index}`}
                          fill={COLORS.chartColors[index % COLORS.chartColors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`₹${value.toLocaleString()}`, "Total Spend"]}
                      contentStyle={{
                        backgroundColor: COLORS.primary,
                        color: "#fff",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
            )}

            {/* Pie – Nights by Occupancy */}
            {chartData.nightsByOccupancy.length > 0 && (
              <ChartCard title="Nights by Occupancy Type">
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={chartData.nightsByOccupancy}
                      dataKey="noOfNights"
                      nameKey="occupancyType"
                      outerRadius={100}
                    >
                      {chartData.nightsByOccupancy.map((entry, index) => (
                        <Cell
                          key={`occupancy-pie-${index}`}
                          fill={COLORS.chartColors[index % COLORS.chartColors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name, props) => [value, props?.payload?.occupancyType]}
                      contentStyle={{
                        backgroundColor: COLORS.primary,
                        color: "#fff",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
            )}

            {/* Bar – Early Check-ins */}
            {chartData.earlyCheckins.length > 0 && (
              <ChartCard title="Early Check-ins">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData.earlyCheckins}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [value, "Check-ins"]}
                      contentStyle={{
                        backgroundColor: COLORS.primary,
                        color: "#fff",
                      }}
                    />
                    <Bar dataKey="count" fill={COLORS.secondary}>
                      {chartData.earlyCheckins.map((_, index) => (
                        <Cell key={index} fill={COLORS.chartColors[index % COLORS.chartColors.length]} />
                      ))}
                      <LabelList dataKey="count" position="top" fill={COLORS.primary} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            )}

            {/* Bar – Late Check-outs */}
            {chartData.lateCheckouts.length > 0 && (
              <ChartCard title="Late Check-outs">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData.lateCheckouts}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [value, "Check-outs"]}
                      contentStyle={{
                        backgroundColor: COLORS.primary,
                        color: "#fff",
                      }}
                    />
                    <Bar dataKey="count" fill={COLORS.secondary}>
                      {chartData.lateCheckouts.map((_, index) => (
                        <Cell key={index} fill={COLORS.chartColors[index % COLORS.chartColors.length]} />
                      ))}
                      <LabelList dataKey="count" position="top" fill={COLORS.primary} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

const ChartCard = ({ title, children }) => (
  <div className="chart-card">
    <h3>{title}</h3>
    {children}
  </div>
);

export default React.memo(Charts);
