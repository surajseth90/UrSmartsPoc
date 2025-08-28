import React, { useState, useEffect } from "react";
import "./style.scss";

const DateRangePicker = (props) => {
  const { startDate, setStartDate, endDate, setEndDate, onChange } = props;

  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");

  const today = new Date();
  const todayFormatted = today.toISOString().split("T")[0];

  // Validate dates whenever they change
  useEffect(() => {
    validateDates();
  }, [startDate, endDate]);

  const validateDates = () => {
    // Reset errors
    setStartDateError("");
    setEndDateError("");

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (start > end) {
        setStartDateError("Start date cannot be after end date");
      } else if (end > today) {
        setEndDateError("End date cannot be in the future");
      } else {
        onChange(start, end)
      }
    }

    if (startDate && new Date(startDate) > today) {
      setStartDateError("Start date cannot be in the future");
    }
  };

  return (
    <div className="date-range-picker container mt-5">
      <div className="d-flex form-group-container gap-4">
        <div className="form-group">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            max={todayFormatted}
          />

          {startDateError && (
            <div className="text-danger">{startDateError}</div>
          )}
        </div>

        <div className="form-group">
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            max={todayFormatted}
            min={startDate}
          />

          {endDateError && <div className="text-danger">{endDateError}</div>}
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
