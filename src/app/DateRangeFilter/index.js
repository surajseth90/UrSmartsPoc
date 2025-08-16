import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";

export default function DateRangeFilter({ onChange }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (start && end && onChange) {
      onChange(start, end);
    }
  };

  const formatDate = (date) => {
    return date
      ? date.toLocaleDateString("en-GB", { day: "numeric", month: "numeric", year: "2-digit" })
      : "";
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      dateFormat="d/MM/yy"
      className="custom-date-input"
      placeholderText="Select date range"
      customInput={
        <div className="date-range-display">
          {startDate && endDate
            ? `${formatDate(startDate)} - ${formatDate(endDate)}`
            : "Select date range"}
        </div>
      }
    />
  );
}
