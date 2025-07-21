import React, { memo, useState } from "react";
import "./style.scss";
import { SearchIcon } from "../../app/Icons";

const NewBookingForm = React.lazy(() => import("./NewBookingForm"));
const InventoryForm = React.lazy(() => import("./AddNewInventoryForm"));

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
  const [newBookingFormOpen, setNewBookingFormOpen] = useState(false);
  const [inventoryFormOpen, setinventoryFormOpen] = useState(false);

  return (
    <div className="hotels-page">
      <div className="main-top-container d-flex align-items-center justify-content-between">
        <h2 className="mb-0 font-24 admin-text-primary">Bookings</h2>
        <button
          className="admin-primary-btn"
          onClick={() => setNewBookingFormOpen(true)}
        >
          Create Booking
        </button>
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

      {newBookingFormOpen && (
        <div className="w-100 h-100 position-fixed top-0 start-0 popup-outer-wrapper">
          <div className="overlay w-100 h-100"></div>
          <div className="z-101 position-relative h-100 rounded-3">
            <React.Suspense
              fallback={
                <div className="bg-white h-100 justify-content-center align-items-center d-flex">
                  <div className="loader"></div>
                </div>
              }
            >
              <NewBookingForm onClose={() => setNewBookingFormOpen(false)} />
            </React.Suspense>
          </div>
        </div>
      )}

      {inventoryFormOpen && (
        <div className="w-100 h-100 position-fixed top-0 start-0 popup-outer-wrapper">
          <div className="overlay w-100 h-100"></div>
          <div className="z-101 position-relative h-100 rounded-3 d-flex justify-content-between align-items-center">
            <React.Suspense
              fallback={
                <div className="bg-white h-100 justify-content-center align-items-center d-flex">
                  <div className="loader"></div>
                </div>
              }
            >
              <InventoryForm onClose={() => setinventoryFormOpen(false)} />
            </React.Suspense>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(Hotels);
