import { memo, useState } from "react";
import "./style.scss";
import { SearchIcon } from "../../app/Icons";

const dataTypeOptions = [
  {
    title: "All Bookings",
    prop: "all-bookings",
  },
  {
    title: "Completed",
    prop: "completed",
  },
  {
    title: "Drafts",
    prop: "drafts",
  },
  {
    title: "Inventory Management",
    prop: "inventory-management",
  },
];

function Hotels() {
  const [dataType, setDataType] = useState(dataTypeOptions[0].prop);
  return (
    <div className="hotels-page">
      <div className="main-top-container d-flex align-items-center justify-content-between">
        <h2 className="mb-0 font-24 admin-text-primary">Bookings</h2>
        <button className="admin-primary-btn">Create Booking</button>
      </div>

      <div className="booking-data-container">
        <div className="booking-top-wrapper flex-lg-row flex-column d-flex justify-content-between gap-2 align-items-baseline">
          <div className="booking-options d-flex gap-3 ">
            {dataTypeOptions.map((btn) => {
              return (
                <button
                  className={`px-3 py-2 pb-3 admin-text-primary ${
                    dataType == btn.prop ? "selected" : ""
                  }`}
                  onClick={() => setDataType(btn.prop)}
                >
                  {btn.title}
                </button>
              );
            })}
          </div>
          <div className="d-flex align-items-center border-bottom search-wrapper w-100">
            <input
              type="text"
              className="py-2 bg border-0 search-input w-100"
              placeholder="Search"
            />
            <span className="px-2">
              <SearchIcon />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Hotels);
