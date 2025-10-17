import React, { useState, useEffect, useRef } from "react";
import { basePath } from "../../config";
import { generateHeader } from "../../helper";
import "./style.scss";
import MultiSelectDropdown from "../../app/MultiSelectDropdown";
import DateRangeFilter from "../../app/DateRangeFilter";
import { useDispatch, useSelector } from "react-redux";
import { setDashboardFilters } from "../../action";

const DashboardFilters = ({ onSearch, isLoading = false }) => {
    const dispatch = useDispatch();
    const reduxFilters = useSelector((state) => state.dashboardFilters);

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
    const [comapaniesList, setComapaniesList] = useState([]);
    const [loadingStates, setLoadingStates] = useState(true);
    const [loadingCities, setLoadingCities] = useState(false);
    const [selectedStates, setSelectedStates] = useState(new Set());
    const [selectedCompanies, setSelectedCompanies] = useState(new Set());

    const [selectedCities, setSelectedCities] = useState(new Set());
    const selectedStatesRef = useRef(selectedStates);

    useEffect(()=>{
        if(selectedStatesRef.current !== selectedStates){
            selectedStatesRef.current = selectedStates;
        }
    }, [selectedStates])

    useEffect(() => {
        if (reduxFilters) {
            setStartDate(reduxFilters.startDate);
            setEndDate(reduxFilters.endDate);
            setSelectedStates(new Set(reduxFilters.selectedStates));
            selectedStatesRef.current = new Set(reduxFilters.selectedStates);
            setSelectedCities(new Set(reduxFilters.selectedCities));
            setSelectedCompanies(new Set(reduxFilters.selectedCompanies));
            setFilters({ sapId: reduxFilters.sapId });
            setCitiesList(reduxFilters.citiesList || []);
            setStatesList(reduxFilters.statesList || []);
            setComapaniesList(reduxFilters.comapaniesList || [])
        }
    }, []);


    useEffect(() => {
        dispatch(
            setDashboardFilters({
                startDate,
                endDate,
                selectedStates: Array.from(selectedStates),
                selectedCities: Array.from(selectedCities),
                selectedCompanies: Array.from(selectedCompanies),
                sapId: filters.sapId,
                statesList,
                citiesList,
                comapaniesList
            })
        );
    }, [startDate, endDate, selectedStates, selectedCities, selectedCompanies, filters.sapId, statesList, citiesList, comapaniesList]);

    // Fetch all states on initial load
    useEffect(() => {
        if (reduxFilters && reduxFilters.statesList && reduxFilters.statesList.length > 0) {
            setStatesList(reduxFilters.statesList);
            setLoadingStates(false);
        } else {
            fetchStates();
        }
    }, []);

    useEffect(() => {
        if (reduxFilters && reduxFilters.comapaniesList && reduxFilters.comapaniesList.length > 0) {
            setComapaniesList(reduxFilters.comapaniesList);
        } else
            fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const response = await fetch(`${basePath}/api/companies/distinct`, {
                method: "GET",
                headers: generateHeader(),
            });
            const companies = await response.json();
            setComapaniesList(companies);

        } catch (error) {
            console.error("Error fetching states:", error);
        }
    };

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
                selectedStatesRef.current = new Set(["Maharashtra"]);
                getCitiesByStates();
            }
        } catch (error) {
            console.error("Error fetching states:", error);
        } finally {
            setLoadingStates(false);
        }
    };

    const getCitiesByStates = () => {
        if (citiesTimerRef.current) {
            clearTimeout(citiesTimerRef.current);
        }
        citiesTimerRef.current = setTimeout(() => {
            fetchCities();
        }, 1500);
    }

    const fetchCities = async () => {
        if (selectedStates.length == 0) return;
        const url = new URL(`${basePath}/api/hotels/cities`);

        const params = new URLSearchParams();
        selectedStatesRef.current.forEach(id => params.append("state", id));

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
                console.log("selectedStatesRef.current", selectedStatesRef.current);
                
                if (
                    selectedStatesRef.current.has("Maharashtra") &&
                    cities.includes("Mumbai")
                ) {
                    setSelectedCities(new Set(["Mumbai"]));
                } else {
                    setSelectedCities(new Set());

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
        selectedStatesRef.current = new Set(["Maharashtra"]);
        getCitiesByStates();

        setFilters({ sapId: "" });
        setStartDate(formatDate(fifteenDaysAgo));
        setEndDate(formatDate(today));
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
                            setSelectedItems={(val)=>{
                                setSelectedStates(val);
                                selectedStatesRef.current = val;
                                getCitiesByStates();
                            }}
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

                <div className="filter-group">
                    <MultiSelectDropdown
                        items={comapaniesList}
                        selectedItems={selectedCompanies}
                        setSelectedItems={setSelectedCompanies}
                        label="Select Company"
                    />
                </div>
            </div>

            <div className="d-flex align-items-center gap-2">

                <button className="admin-primary-btn px-4"
                    disabled={isLoading}
                    onClick={() => {
                        let sapId = filters.sapId.trim();
                        onSearch && onSearch({ startDate, endDate, states: Array.from(selectedStates), cities: Array.from(selectedCities), sapId, comapanies: Array.from(selectedCompanies) })
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
