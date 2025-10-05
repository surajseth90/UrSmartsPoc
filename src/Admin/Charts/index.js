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
} from "recharts";
import { basePath } from "../../config";
import { generateHeader } from "../../helper";
import "./style.scss";

// Color scheme
const COLORS = {
  primary: "#172B4D",
  secondary: "#466CAD",
  accent: "#ABCAFF",
  chartColors: ["#172B4D", "#466CAD", "#ABCAFF", "#5E7BAE", "#3A558C"],
};

// Helper function to process early check-in times
const processCheckinTimes = (data) => {
  const checkoutCountMap = {};

  data.forEach(cityData => {
    cityData.checkinTimes.forEach(time => {
      checkoutCountMap[time] = (checkoutCountMap[time] || 0) + 1;
    });
  });

  // Convert to Recharts format
  const chartData = Object.keys(checkoutCountMap).map(time => ({
    time,
    count: checkoutCountMap[time],
  }));
  return chartData;
};

const processCheckouqtTimes = (data) => {
  const checkoutCountMap = {};

  data.forEach(cityData => {
    cityData.checkoutTimes.forEach(time => {
      checkoutCountMap[time] = (checkoutCountMap[time] || 0) + 1;
    });
  });

  // Convert to Recharts format
  const chartData = Object.keys(checkoutCountMap).map(time => ({
    time,
    count: checkoutCountMap[time],
  }));
  return chartData;
}

const Charts = forwardRef((props, ref) => {
  const { loadingCharts, setLoadingCharts, downloadPdf } = props;
  const [chartData, setChartData] = useState({
    spendByState: [],
    spendByCity: [],
    nightsByOccupancy: [],
    spendByMealPlan: [],
    earlyCheckins: [],
    lateCheckouts: []
  });

  const shouldShowDownload = Object.values(chartData).some(
    (dataArray) => dataArray.length > 0
  );



  useImperativeHandle(ref, () => ({
    fetchChartData,
  }));

  const fetchChartData = async (...params) => {
    setLoadingCharts(true);

    const [startDate, endDate, states = [], cities = [], sapId = ""] = params;

    const headers = generateHeader();

    // Helper to build query string
    const buildQueryParams = ({ excludeState = false, excludeCity = false } = {}) => {
      const query = new URLSearchParams();

      if (startDate) query.append("startDate", startDate);
      if (endDate) query.append("endDate", endDate);
      if (sapId) query.append("sapId", sapId);

      if (!excludeState && Array.isArray(states)) {
        states.forEach((state) => query.append("state", state));
      }

      if (!excludeCity && Array.isArray(cities)) {
        cities.forEach((city) => query.append("city", city));
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
        // Exclude CITY from spend-by-state
        fetch(
          `${basePath}/dashboard/spend-by-state?${buildQueryParams({
            excludeCity: true,
          })}`,
          {
            method: "GET",
            headers,
          }
        ).then((res) => res.json()),

        // Exclude STATE from spend-by-city
        fetch(
          `${basePath}/dashboard/spend-by-city?${buildQueryParams({
            excludeState: true,
          })}`,
          {
            method: "GET",
            headers,
          }
        ).then((res) => res.json()),

        // Include all
        fetch(
          `${basePath}/dashboard/nights-by-occupancy?${buildQueryParams()}`,
          {
            method: "GET",
            headers,
          }
        ).then((res) => res.json()),

        fetch(
          `${basePath}/dashboard/early-checkin?${buildQueryParams()}`,
          {
            method: "GET",
            headers,
          }
        ).then((res) => res.json()),

        fetch(
          `${basePath}/dashboard/late-checkout?${buildQueryParams()}`,
          {
            method: "GET",
            headers,
          }
        ).then((res) => res.json()),

        fetch(
          `${basePath}/dashboard/spend-by-meal-plan?${buildQueryParams()}`,
          {
            method: "GET",
            headers,
          }
        ).then((res) => res.json()),
      ]);

      const earlyCheckinsData =
        Array.isArray(earlyCheckinsRes) && earlyCheckinsRes.length > 0
          ? processCheckinTimes(earlyCheckinsRes)
          : [];

      const lateCheckoutData =
        Array.isArray(lateCheckoutsRes) && lateCheckoutsRes.length > 0
          ? processCheckouqtTimes(lateCheckoutsRes)
          : [];

      setChartData({
        spendByState: spendStateRes,
        spendByCity: spendCityRes,
        nightsByOccupancy: occupancyRes,
        earlyCheckins: earlyCheckinsData,
        spendByMealPlan: mealPlanRes,
        lateCheckouts: lateCheckoutData,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoadingCharts(false);
    }
  };


  // Render dashboard components
  return (
    <div className="dashboard-container">
      {/* Charts Section */}
      {loadingCharts ? (
        <main className="full-page">
          <div className="loader"></div>
        </main>
      ) : (
        <div>
          {shouldShowDownload && <div className="d-flex w-100 justify-content-end">
            <button className="admin-primary-btn no-print my-3 px-4" onClick={downloadPdf}>Download PDF</button>
          </div>}
          <div className="charts-grid">
            {/* Pie – Spend by State */}
            {Array.isArray(chartData?.spendByState) && chartData?.spendByState?.length > 0 && (
              <ChartCard title="Spend by State">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData.spendByState}
                      dataKey="totalSellCost"
                      nameKey="state"
                      outerRadius={100}
                      label={false} // 👈 hide overlapping labels
                    >
                      {chartData.spendByState.map((entry, index) => (
                        <Cell
                          key={`state-pie-${index}`}
                          fill={COLORS.chartColors[index % COLORS.chartColors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name, props) => [
                        `₹${value.toLocaleString()}`,
                        props?.payload?.state || "State",
                      ]}
                      contentStyle={{
                        backgroundColor: COLORS.primary,
                        color: "#fff",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
            )}

            {/* Pie – Spend by City */}
            {Array.isArray(chartData?.spendByCity) && chartData?.spendByCity?.length > 0 && (
              <ChartCard title="Spend by City">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData.spendByCity}
                      dataKey="totalSellCost"
                      nameKey="city"
                      outerRadius={100}
                      label={false}
                    >
                      {chartData.spendByCity.map((entry, index) => (
                        <Cell
                          key={`city-pie-${index}`}
                          fill={COLORS.chartColors[index % COLORS.chartColors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name, props) => [
                        `₹${value.toLocaleString()}`,
                        props?.payload?.city || "City",
                      ]}
                      contentStyle={{
                        backgroundColor: COLORS.primary,
                        color: "#fff",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
            )}

            {/* Pie – Spend by Meal Plan */}
            {Array.isArray(chartData?.spendByMealPlan) && chartData?.spendByMealPlan?.length > 0 && (
              <ChartCard title="Spend by Meal Plan">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData.spendByMealPlan}
                      dataKey="totalSellCost"
                      nameKey="plan"
                      outerRadius={100}
                      label={false}
                    >
                      {chartData.spendByMealPlan.map((entry, index) => (
                        <Cell
                          key={`meal-pie-${index}`}
                          fill={COLORS.chartColors[index % COLORS.chartColors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [
                        `₹${value.toLocaleString()}`,
                        "Total Spend",
                      ]}
                      contentStyle={{
                        backgroundColor: COLORS.primary,
                        color: "#fff",
                      }} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
            )}

            {/* Bar – Early Check-ins */}
            {Array.isArray(chartData?.earlyCheckins) && chartData?.earlyCheckins?.length > 0 && (
              <ChartCard title="Early Check-ins">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData.earlyCheckins}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="time" stroke={COLORS.primary} />
                    <YAxis stroke={COLORS.primary} />
                    <Tooltip formatter={(value) => [value, "Check-ins"]}
                      contentStyle={{
                        backgroundColor: COLORS.primary,
                        color: "#fff",
                      }}
                    />
                    <Bar dataKey="count" fill={COLORS.secondary} name="Check-ins">
                      {chartData.earlyCheckins.map((entry, index) => (
                        <Cell
                          key={`early-cell-${index}`}
                          fill={COLORS.chartColors[index % COLORS.chartColors.length]}
                        />
                      ))}
                      <LabelList dataKey="count" position="top" fill={COLORS.primary} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            )}

            {/* Bar – Late Check-outs */}
            {Array.isArray(chartData?.lateCheckouts) && chartData?.lateCheckouts?.length > 0 && (
              <ChartCard title="Late Check-outs">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData.lateCheckouts}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="time" stroke={COLORS.primary} />
                    <YAxis stroke={COLORS.primary} />
                    <Tooltip formatter={(value) => [value, "Check-outs"]}
                      contentStyle={{
                        backgroundColor: COLORS.primary,
                        color: "#fff",
                      }}
                    />
                    <Bar dataKey="count" fill={COLORS.secondary} name="Check-outs">
                      {chartData.lateCheckouts.map((entry, index) => (
                        <Cell
                          key={`late-cell-${index}`}
                          fill={COLORS.chartColors[index % COLORS.chartColors.length]}
                        />
                      ))}
                      <LabelList dataKey="count" position="top" fill={COLORS.primary} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            )}

            {/* Pie – Nights by Occupancy */}
            {Array.isArray(chartData?.nightsByOccupancy) && chartData?.nightsByOccupancy?.length > 0 && (
              <ChartCard title="Nights by Occupancy Type">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData.nightsByOccupancy}
                      dataKey="noOfNights"
                      nameKey="occupancyType"
                      outerRadius={100}
                      label={false}
                    >
                      {chartData.nightsByOccupancy.map((entry, index) => (
                        <Cell
                          key={`occupancy-pie-${index}`}
                          fill={COLORS.chartColors[index % COLORS.chartColors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name, props) => [
                        value,
                        props?.payload?.occupancyType || "Occupancy",
                      ]}
                      contentStyle={{
                        backgroundColor: COLORS.primary,
                        color: "#fff",
                      }}
                    />
                  </PieChart>
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
