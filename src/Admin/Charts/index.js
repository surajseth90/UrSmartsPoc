import React, { useState, useEffect } from "react";
import {
  BarChart,
  LineChart,
  PieChart,
  Bar,
  Line,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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
const processCheckinTimes = (times) => {
  if (!times || !Array.isArray(times)) return [];

  const timeCounts = {};
  times.forEach((time) => {
    timeCounts[time] = (timeCounts[time] || 0) + 1;
  });

  return Object.entries(timeCounts)
    .map(([time, count]) => ({ time, count }))
    .sort((a, b) => a.time.localeCompare(b.time));
};

// Main Dashboard Component
const Dashboard = () => {
  // State for filters and data
  const [filters, setFilters] = useState({
    client: "all",
    state: "",
    city: "",
    sapId: "70177369",
  });

  const [statesList, setStatesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);

  const [chartData, setChartData] = useState({
    travelSpendOverTime: [],
    spendByEmployee: [],
    spendByState: [],
    spendByCity: [],
    nightsByOccupancy: [],
    spendByMealPlan: [],
    stateCitySpend: [],
    unitSellPrice: [],
    managementFees: [],
    earlyCheckins: [],
  });

  const [loadingCharts, setLoadingCharts] = useState(true);

  // Fetch all states on initial load
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(`${basePath}/api/hotels/states`, {
          method: "GET",
          headers: generateHeader(),
        });
        const states = await response.json();
        setStatesList(states);

        // Set first state as default if available
        if (states.length > 0) {
          setFilters((prev) => ({ ...prev, state: states[0] }));
        }
      } catch (error) {
        console.error("Error fetching states:", error);
      } finally {
        setLoadingStates(false);
      }
    };

    fetchStates();
  }, []);

  // Fetch cities when state changes
  useEffect(() => {
    if (!filters.state) return;

    const fetchCities = async () => {
      setLoadingCities(true);
      try {
        const response = await fetch(
          `${basePath}/api/hotels/cities?state=${encodeURIComponent(
            filters.state
          )}`,
          {
            method: "GET",
            headers: generateHeader(),
          }
        );
        const cities = await response.json();
        setCitiesList(cities);

        // Set first city as default if available
        if (cities.length > 0) {
          setFilters((prev) => ({ ...prev, city: cities[0] }));
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoadingCities(false);
      }
    };

    fetchCities();
  }, [filters.state]);

  // Fetch all chart data when filters change
  useEffect(() => {
    if (!filters.state || !filters.city) return;

    const fetchChartData = async () => {
      setLoadingCharts(true);
      try {
        // Fetch all data in parallel
        const [
          travelSpendRes,
          spendEmployeeRes,
          spendStateRes,
          spendCityRes,
          occupancyRes,
          mealPlanRes,
          stateCityRes,
          unitPriceRes,
          managementFeesRes,
          earlyCheckinsRes,
        ] = await Promise.all([
          fetch(`${basePath}/dashboard/travel-spend-over-time`, {
            method: "GET",
            headers: generateHeader(),
          }).then((res) => res.json()),

          fetch(
            `${basePath}/dashboard/spend-by-employee?sapId=${filters.sapId}`,
            {
              method: "GET",
              headers: generateHeader(),
            }
          ).then((res) => res.json()),

          fetch(`${basePath}/dashboard/spend-by-state?state=${filters.state}`, {
            method: "GET",
            headers: generateHeader(),
          }).then((res) => res.json()),

          fetch(`${basePath}/dashboard/spend-by-city?city=${filters.city}`, {
            method: "GET",
            headers: generateHeader(),
          }).then((res) => res.json()),

          fetch(
            `${basePath}/dashboard/nights-by-occupancy-state?state=${filters.state}`,
            {
              method: "GET",
              headers: generateHeader(),
            }
          ).then((res) => res.json()),

          fetch(`${basePath}/dashboard/spend-by-meal-plan`, {
            method: "GET",
            headers: generateHeader(),
          }).then((res) => res.json()),

          fetch(
            `${basePath}/dashboard/spend-by-state-city?state=${filters.state}`,
            {
              method: "GET",
              headers: generateHeader(),
            }
          ).then((res) => res.json()),

          fetch(
            `${basePath}/dashboard/unit-sell-price-by-city?city=${filters.city}`,
            {
              method: "GET",
              headers: generateHeader(),
            }
          ).then((res) => res.json()),

          fetch(
            `${basePath}/dashboard/management-fees-by-employee?sapId=${filters.sapId}`,
            {
              method: "GET",
              headers: generateHeader(),
            }
          ).then((res) => res.json()),

          fetch(
            `${basePath}/dashboard/early-checkins-by-city?city=${filters.city}`,
            {
              method: "GET",
              headers: generateHeader(),
            }
          ).then((res) => res.json()),
        ]);

        // Handle unit price response
        const unitPriceData =
          Array.isArray(unitPriceRes) && unitPriceRes.length > 0
            ? unitPriceRes[0].unitSellPrices.map((price, index) => ({
              name: `Price ${index + 1}`,
              price,
            }))
            : [];

        // Process early check-in data
        const earlyCheckinsData =
          Array.isArray(earlyCheckinsRes) && earlyCheckinsRes.length > 0
            ? processCheckinTimes(earlyCheckinsRes[0].earlyCheckInTimes)
            : [];

        // Process and set data
        setChartData({
          travelSpendOverTime: travelSpendRes,
          spendByEmployee: spendEmployeeRes,
          spendByState: spendStateRes,
          spendByCity: spendCityRes,
          nightsByOccupancy: occupancyRes,
          spendByMealPlan: mealPlanRes,
          stateCitySpend: stateCityRes,
          unitSellPrice: unitPriceData,
          managementFees: managementFeesRes,
          earlyCheckins: earlyCheckinsData,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoadingCharts(false);
      }
    };

    fetchChartData();
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  // Render dashboard components
  return (
    <div className="dashboard-container">
      {/* Filter Controls */}
      <div className="filters-section">
        {/* <div className="filter-group">
          <label>Client:</label>
          <select
            value={filters.client}
            onChange={(e) => handleFilterChange("client", e.target.value)}
          >
            <option value="all">All Clients</option>
          </select>
        </div> */}

        <div className="filter-group">
          <label>State:</label>
          {loadingStates ? (
            <div className="loading-small">Loading states...</div>
          ) : (
            <select
              value={filters.state}
              onChange={(e) => handleFilterChange("state", e.target.value)}
            >
              {statesList.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="filter-group">
          <label>City:</label>
          {loadingCities ? (
            <div className="loading-small">Loading cities...</div>
          ) : (
            <select
              value={filters.city}
              onChange={(e) => handleFilterChange("city", e.target.value)}
              disabled={citiesList.length === 0}
            >
              {citiesList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="filter-group">
          <label>Employee ID:</label>
          <input
            type="text"
            value={filters.sapId}
            onChange={(e) => handleFilterChange("sapId", e.target.value)}
            placeholder="Enter SAP ID"
          />
        </div>
      </div>

      {/* Charts Section */}
      {loadingCharts ? (
        <main className="full-page">
          <div className="loader"></div>
        </main>
      ) : (
        <div className="charts-grid">
          {/* Travel Spend Over Time */}
          {Array.isArray(chartData?.travelSpendOverTime) && (
            <ChartCard title="Travel Spend Over Time">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData?.travelSpendOverTime}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" stroke={COLORS.primary} />
                  <YAxis stroke={COLORS.primary} />
                  <Tooltip
                    formatter={(value) => [
                      `₹${value.toLocaleString()}`,
                      "Total Spend",
                    ]}
                    contentStyle={{
                      backgroundColor: COLORS.primary,
                      color: "#fff",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="totalSellCost"
                    stroke={COLORS.secondary}
                    strokeWidth={2}
                    activeDot={{ r: 8, fill: COLORS.accent }}
                    name="Total Spend"
                    dot={{ fill: COLORS.primary, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          )}

          {/* Spend by Meal Plan */}
          {Array.isArray(chartData.spendByMealPlan) && (
            <ChartCard title="Spend by Meal Plan">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData.spendByMealPlan}
                    dataKey="totalSellCost"
                    nameKey="mealPlan"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {chartData.spendByMealPlan.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          COLORS.chartColors[index % COLORS.chartColors.length]
                        }
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
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          )}

          {/* Spend by Employee */}
          {Array.isArray(chartData?.spendByEmployee) && (
            <ChartCard title="Spend by Employee">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData.spendByEmployee}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="sapId" stroke={COLORS.primary} />
                  <YAxis stroke={COLORS.primary} />
                  <Tooltip
                    formatter={(value) => [
                      `₹${value.toLocaleString()}`,
                      "Total Spend",
                    ]}
                    contentStyle={{
                      backgroundColor: COLORS.primary,
                      color: "#fff",
                    }}
                  />
                  <Bar
                    dataKey="totalSellCost"
                    fill={COLORS.accent}
                    name="Total Spend"
                  >
                    <LabelList
                      dataKey="totalSellCost"
                      position="top"
                      formatter={(value) => `₹${value.toLocaleString()}`}
                      fill={COLORS.primary}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          )}

          {/* Management Fees by Employee */}
          {Array.isArray(chartData?.managementFees) && (
            <ChartCard title="Management Fees by Employee">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData.managementFees}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="sapId" stroke={COLORS.primary} />
                  <YAxis stroke={COLORS.primary} />
                  <Tooltip
                    formatter={(value) => [
                      `₹${value.toLocaleString()}`,
                      "Management Fees",
                    ]}
                    contentStyle={{
                      backgroundColor: COLORS.primary,
                      color: "#fff",
                    }}
                  />
                  <Bar
                    dataKey="managementFees"
                    fill={COLORS.primary}
                    name="Management Fees"
                  >
                    <LabelList
                      dataKey="managementFees"
                      position="top"
                      formatter={(value) => `₹${value.toLocaleString()}`}
                      fill={COLORS.primary}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          )}

          {/* Early Check-ins by City */}
          {Array.isArray(chartData?.earlyCheckins) && (
            <ChartCard title={`Early Check-ins in ${filters.city}`}>
              {chartData.earlyCheckins.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData.earlyCheckins}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="time" stroke={COLORS.primary} />
                    <YAxis stroke={COLORS.primary} />
                    <Tooltip
                      formatter={(value) => [value, "Check-ins"]}
                      contentStyle={{
                        backgroundColor: COLORS.primary,
                        color: "#fff",
                      }}
                    />
                    <Bar
                      dataKey="count"
                      name="Check-ins"
                      fill={COLORS.secondary}
                    >
                      {chartData.earlyCheckins.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            COLORS.chartColors[
                            index % COLORS.chartColors.length
                            ]
                          }
                        />
                      ))}
                      <LabelList
                        dataKey="count"
                        position="top"
                        fill={COLORS.primary}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="no-data">
                  No early check-in data available for {filters.city}
                </div>
              )}
            </ChartCard>
          )}
          {/* Spend by State */}
          {Array.isArray(chartData?.spendByState) && (
            <ChartCard title="Spend by State">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData.spendByState}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="state" stroke={COLORS.primary} />
                  <YAxis stroke={COLORS.primary} />
                  <Tooltip
                    formatter={(value) => [
                      `₹${value.toLocaleString()}`,
                      "Total Spend",
                    ]}
                    contentStyle={{
                      backgroundColor: COLORS.primary,
                      color: "#fff",
                    }}
                  />
                  <Bar
                    dataKey="totalSellCost"
                    fill={COLORS.primary}
                    name="Total Spend"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          )}

          {/* Spend by City */}
          {Array.isArray(chartData?.spendByCity) && (
            <ChartCard title="Spend by City">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData.spendByCity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="city" stroke={COLORS.primary} />
                  <YAxis stroke={COLORS.primary} />
                  <Tooltip
                    formatter={(value) => [
                      `₹${value.toLocaleString()}`,
                      "Total Spend",
                    ]}
                    contentStyle={{
                      backgroundColor: COLORS.primary,
                      color: "#fff",
                    }}
                  />
                  <Bar
                    dataKey="totalSellCost"
                    fill={COLORS.secondary}
                    name="Total Spend"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          )}
          {/* Nights by Occupancy Type */}
          {Array.isArray(chartData?.nightsByOccupancy) && (
            <ChartCard title="Nights by Occupancy Type">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData.nightsByOccupancy}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="occupancyType" stroke={COLORS.primary} />
                  <YAxis stroke={COLORS.primary} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: COLORS.primary,
                      color: "#fff",
                    }}
                  />
                  <Bar
                    dataKey="noOfNights"
                    fill={COLORS.accent}
                    name="Nights"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          )}

          {/* Spend by State split by City */}
          {Array.isArray(chartData?.stateCitySpend) && (
            <ChartCard title={`Spend by ${filters.state} (Split by City)`}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData.stateCitySpend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="city" stroke={COLORS.primary} />
                  <YAxis stroke={COLORS.primary} />
                  <Tooltip
                    formatter={(value) => [
                      `₹${value.toLocaleString()}`,
                      "Total Spend",
                    ]}
                    contentStyle={{
                      backgroundColor: COLORS.primary,
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="totalSellCost" name="Total Spend">
                    {chartData.stateCitySpend.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          COLORS.chartColors[index % COLORS.chartColors.length]
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          )}

          {/* Unit Sell Price by City */}
          {Array.isArray(chartData?.unitSellPrice) && (
            <ChartCard title={`Unit Sell Prices in ${filters.city}`}>
              {chartData.unitSellPrice.length > 0 ? (
                <div className="price-chart-container unit-sell-prices">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={chartData.unitSellPrice}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" stroke={COLORS.primary} />
                      <YAxis
                        stroke={COLORS.primary}
                        tickFormatter={(value) => `₹${value.toLocaleString()}`}
                      />
                      <Tooltip
                        formatter={(value) => [
                          `₹${value.toLocaleString()}`,
                          "Price",
                        ]}
                        labelFormatter={() => "Price Point"}
                        contentStyle={{
                          backgroundColor: COLORS.primary,
                          color: "#fff",
                        }}
                      />
                      <Bar dataKey="price" name="Price">
                        {chartData.unitSellPrice.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              index % 2 === 0
                                ? COLORS.primary
                                : COLORS.secondary
                            }
                          />
                        ))}
                        <LabelList
                          dataKey="price"
                          position="top"
                          formatter={(value) => `₹${value.toLocaleString()}`}
                          fill={COLORS.primary}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>

                  <div className="price-stats">
                    <div className="stat-item">
                      <span className="stat-label">Min:</span>
                      <span className="stat-value">
                        ₹
                        {Math.min(
                          ...chartData.unitSellPrice.map((p) => p.price)
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Max:</span>
                      <span className="stat-value">
                        ₹
                        {Math.max(
                          ...chartData.unitSellPrice.map((p) => p.price)
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Average:</span>
                      <span className="stat-value">
                        ₹
                        {(
                          chartData.unitSellPrice.reduce(
                            (sum, item) => sum + item.price,
                            0
                          ) / chartData.unitSellPrice.length
                        ).toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Count:</span>
                      <span className="stat-value">
                        {chartData.unitSellPrice.length}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="no-data">
                  No price data available for {filters.city}
                </div>
              )}
            </ChartCard>
          )}
        </div>
      )}
    </div>
  );
};

const ChartCard = ({ title, children }) => (
  <div className="chart-card">
    <h3>{title}</h3>
    {children}
  </div>
);

export default Dashboard;
