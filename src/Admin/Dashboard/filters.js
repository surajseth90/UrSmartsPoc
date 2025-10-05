import React, { useState, useEffect, useRef } from "react";
import { basePath } from "../../config";
import { generateHeader } from "../../helper";
import "./style.scss";
import MultiSelectDropdown from "../../app/MultiSelectDropdown";
import DateRangeFilter from "../../app/DateRangeFilter";

const DashboardFilters = ({ onSearch, isLoading = false }) => {
    // Get today's date
    const today = new Date();
    // Get 15 days before today
    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(today.getDate() - 15);

    // Format as YYYY-MM-DD (optional, for date inputs)
    const formatDate = (date) => date.toISOString().split('T')[0];

    const [startDate, setStartDate] = useState(formatDate(fifteenDaysAgo));
    const [endDate, setEndDate] = useState(formatDate(today));
    const citiesTimerRef = useRef(null);

    // State for filters and data
    const [filters, setFilters] = useState({
        sapId: "",
    });

    const [statesList, setStatesList] = useState([]);
    const [citiesList, setCitiesList] = useState([]);
    const [loadingStates, setLoadingStates] = useState(true);
    const [loadingCities, setLoadingCities] = useState(false);
    const [selectedStates, setSelectedStates] = useState(new Set());

    const [selectedCities, setSelectedCities] = useState(new Set());
    const hasSetDefaultRef = useRef(false);

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

                if (states.length > 0 && states.includes("Maharashtra")) {
                    setSelectedStates(new Set(["Maharashtra"]));
                    hasSetDefaultRef.current = false; // allow Mumbai to be set when cities load
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
        // Debounce city fetch to avoid rapid calls
        if (citiesTimerRef.current) {
            clearTimeout(citiesTimerRef.current);
        }
        citiesTimerRef.current = setTimeout(() => {
            fetchCities();
        }, 1500);
    }, [selectedStates]);

    const fetchCities = async () => {
        if (selectedStates.length == 0) return;
        const url = new URL(`${basePath}/api/hotels/cities`);

        const params = new URLSearchParams();
        selectedStates.forEach(id => params.append("state", id));

        url.search = params.toString();
        setLoadingCities(true);
        try {
            const response = await fetch(
                url.toString(),
                {
                    method: "GET",
                    headers: generateHeader(),
                }
            );
            const cities = await response.json();
            if (cities.length > 0) {
                setCitiesList(cities);

                // Only set Mumbai if Maharashtra is selected AND this is the first time
                if (
                    selectedStates.has("Maharashtra") &&
                    !hasSetDefaultRef.current &&
                    cities.includes("Mumbai")
                ) {
                    setSelectedCities(new Set(["Mumbai"]));
                    hasSetDefaultRef.current = true; // Prevent it from running again
                }
            }

            // Set first city as default if available
            if (cities.length > 0) {
                // setFilters((prev) => ({ ...prev, city: cities[0] }));
            }
        } catch (error) {
            console.error("Error fetching cities:", error);
        } finally {
            setLoadingCities(false);
        }
    };

    const handleFilterChange = (filterName, value) => {
        setFilters((prev) => ({ ...prev, [filterName]: value }));
    };

    const handleReset = () => {
        setSelectedStates(new Set(["Maharashtra"]));
        setSelectedCities(new Set(["Mumbai"]));
        setFilters({ sapId: "" });
        setStartDate(formatDate(fifteenDaysAgo));
        setEndDate(formatDate(today));
        hasSetDefaultRef.current = true; // Prevent first-load Mumbai selection again
    };


    return (
        <div className="dashboard-container d-flex gap-3 align-items-center justify-content-between">
            <div className="filters-section">
                <div className="filter-group">
                    {loadingStates ? (
                        <div className="loading-small">Loading states...</div>
                    ) : (
                        <MultiSelectDropdown
                            items={statesList}
                            selectedItems={selectedStates}
                            setSelectedItems={setSelectedStates}
                            label="Select State"
                        />

                    )}
                </div>

                <div className="filter-group">
                    {loadingCities ? (
                        <div className="loading-small">Loading cities...</div>
                    ) : (
                        <MultiSelectDropdown
                            items={citiesList}
                            selectedItems={selectedCities}
                            setSelectedItems={setSelectedCities}
                            label="Select City"
                        />

                    )}
                </div>

                <div className="filter-group">
                    <input
                        type="text"
                        value={filters.sapId}
                        onChange={(e) => handleFilterChange("sapId", e.target.value)}
                        placeholder="Employee ID"
                    />
                </div>

                <DateRangeFilter
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                // onChange={handleDateChange}
                />
            </div>

            <div className="d-flex align-items-center gap-2">

                <button className="admin-primary-btn px-4"
                    disabled={isLoading}
                    onClick={() => {
                        let sapId = filters.sapId.trim();
                        onSearch && onSearch({ startDate, endDate, states: Array.from(selectedStates), cities: Array.from(selectedCities), sapId })
                    }}>Search</button>

                <button
                    disabled={isLoading}
                    onClick={handleReset}
                    className="admin-trti-btn px-4">Clear</button>
            </div>

        </div>
    );
};

export default React.memo(DashboardFilters);
