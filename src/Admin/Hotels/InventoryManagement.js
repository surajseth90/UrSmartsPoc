import React, { useEffect, useState } from "react";
import { basePath } from "../../config";
import EyeIcon from "../../assets/images/eye.svg";
import EditIcon from "../../assets/images/edit.svg";
import { generateHeader } from "../../helper";
import { CloseIcon, LeftArrowIcon } from "../../app/Icons/index";

const InventoryForm = React.lazy(() => import("./AddNewInventoryForm"));

const InventoryManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [inventoryFormOpen, setinventoryFormOpen] = useState(false);
  const [currentInventory, setCurrentInventory] = useState(null);
  const [showMode, setShowMode] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!inventoryFormOpen) getAllBookings();
  }, [inventoryFormOpen, currentPage]);

  async function getAllBookings() {
    let params = new URLSearchParams({
      page: currentPage - 1,
      size: 20,
    }).toString();

    let url = `${basePath}/api/hotels/all?${params}`;

    await fetch(url, {
      method: "GET",
      headers: generateHeader(),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setTotalPages(res.totalPages);
        setBookings(res.content);
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  return (
    <div className="booking-table-container mt-4 inventory-table">
      <div className="d-flex justify-content-end mb-4">
        <button
          className="admin-secondary-btn"
          onClick={() => setinventoryFormOpen(true)}
        >
          Add New Inventory
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-hover booking-table align-middle">
          <thead className="table-light">
            <tr>
              <th className="font-14 py-3">Hotel</th>
              <th className="font-14 py-3">Email ID</th>
              <th className="font-14 py-3">Contact No.</th>
              <th className="font-14 py-3">Occupancy Type</th>
              <th className="font-14 py-3">Price ⟨₹⟩</th>
              <th className="font-14 py-3">GST No.</th>
              <th className="font-14 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {bookings && bookings?.length ? (
              bookings.map((b, key) => (
                <tr key={`${b.bookingId}-${key}`}>
                  <td className="admin-label-text font-14">
                    <p className="font-bold mb-2">{b.name}</p>
                    <p className="mb-2" style={{ maxWidth: "300px" }}>
                      {b.address}
                    </p>
                    <p className="mb-2">
                      {b.city}, {b.state}
                    </p>

                    {b.url && (
                      <div className="mt-2 mb-3">
                        <a className="p-2" href={b.url}>
                          Google Map Link
                        </a>
                      </div>
                    )}
                  </td>
                  <td className="admin-label-text font-14">{b.email}</td>
                  <td className="admin-label-text font-14">{b.phoneNumber}</td>
                  <td className="admin-label-text font-14">
                    {b.rooms[0]?.roomType}
                  </td>
                  <td className="admin-label-text font-14">
                    {b.rooms[0]?.price}
                  </td>
                  <td className="admin-label-text font-14">
                    <p>{b.gstin}</p>
                  </td>

                  <td className="admin-label-text font-14">
                    <button
                      className="px-2"
                      title="view"
                      onClick={() => {
                        setShowMode(true);
                        setCurrentInventory(b);
                        setinventoryFormOpen(true);
                      }}
                    >
                      <img src={EyeIcon} alt="View" />
                    </button>
                    <button
                      className="px-2"
                      title="Edit"
                      onClick={() => {
                        setCurrentInventory(b);
                        setinventoryFormOpen(true);
                      }}
                    >
                      <img src={EditIcon} alt="Edit" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={13} className="text-center">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div
          className={`pagination py-2 pb-4 w-100 d-flex justify-content-between ${
            totalPages == 0 ? "d-none" : ""
          }`}
        >
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <div className="d-flex gap-4">
            <button
              className="d-flex align-items-center"
              title="back"
              disabled={currentPage == 1}
              onClick={() => {
                if (currentPage != 1) setCurrentPage(currentPage - 1);
              }}
            >
              <LeftArrowIcon />
            </button>
            <button
              title="next"
              disabled={currentPage == totalPages}
              className="right-arrow d-flex align-items-center"
              onClick={() => {
                if (currentPage != totalPages) setCurrentPage(currentPage + 1);
              }}
            >
              <LeftArrowIcon />
            </button>
          </div>
        </div>
      </div>

      {inventoryFormOpen && (
        <div className="w-100 h-100 position-fixed top-0 start-0 popup-outer-wrapper">
          <div className="overlay w-100 h-100"></div>
          <div className="z-101 position-relative h-100 rounded-3 d-flex justify-content-between align-items-center">
            <React.Suspense
              fallback={
                <div
                  className="bg-white m-auto h-100 justify-content-center align-items-center d-flex"
                  style={{ minWidth: "300px" }}
                >
                  <div className="loader"></div>
                </div>
              }
            >
              <InventoryForm
                currentInventory={currentInventory}
                disableAll={showMode}
                onClose={() => {
                  setCurrentInventory(null);
                  setinventoryFormOpen(false);
                  setShowMode(false);
                }}
              />
            </React.Suspense>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;
