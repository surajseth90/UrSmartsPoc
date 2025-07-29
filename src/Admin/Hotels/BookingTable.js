import React, { useEffect, useState } from "react";
import { basePath } from "../../config";
import EyeIcon from "../../assets/images/eye.svg";
import DownloadIcon from "../../assets/images/download.svg";
import EditIcon from "../../assets/images/edit.svg";
import { generateHeader } from "../../helper";

const BookingTable = ({ status }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getAllBookings();
  }, [status]);

  async function getAllBookings() {
    let url = `${basePath}/api/bookings/all`;

    if (status !== "ALL") {
      const params = new URLSearchParams({
        status: status,
      }).toString();

      url = url + `?${params}`
    }
        
    await fetch(url, {
      method: "GET",
      headers: generateHeader(),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setBookings(res.content);
        console.log("res", res);
      });
  }

  function capitalizeFirstLetter(string) {
    if (string.length === 0) {
      return "";
    }
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <div className="booking-table-container mt-4">
      <div className="table-responsive">
        <table className="table table-hover booking-table align-middle">
          <thead className="table-light">
            <tr>
              <th className="font-14 py-3">Client-Partner</th>
              <th className="font-14 py-3">Trip ID</th>
              <th className="font-14 py-3">Guest Name</th>
              <th className="font-14 py-3">Hotel Name</th>
              <th className="font-14 py-3">State & City</th>
              <th className="font-14 py-3">Booking Date</th>

              <th className="font-14 py-3">Status</th>
              <th className="font-14 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {bookings && bookings?.length ? (
              bookings.map((b) => (
                <tr key={b.bookingId}>
                  <td className="admin-label-text font-14">
                    {b.bookingPerson.userId}
                  </td>
                  <td className="admin-label-text font-14">{b.tripId}</td>
                  <td className="admin-label-text font-14">
                    {b.bookingPerson?.name}
                  </td>
                  <td className="admin-label-text font-14">{b.hotel?.name}</td>
                  <td className="admin-label-text font-14">
                    <p>{b.hotel?.state}</p>
                    {b.hotel?.city}{" "}
                  </td>
                  <td className="admin-label-text font-14">
                    {new Date(b.bookingDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="admin-label-text font-14">
                    <span
                      className={`booking-status-${b.status?.toLowerCase()}`}
                    >
                      {capitalizeFirstLetter(b.status)}
                    </span>
                  </td>
                  <td className="admin-label-text font-14">
                    <button className="px-2" title="view">
                      <img src={EyeIcon} alt="View" />
                    </button>
                    <button className="px-2" title="Edit">
                      <img src={EditIcon} alt="Edit" />
                    </button>
                    <button className="px-2" title="download">
                      <img src={DownloadIcon} alt="download" />
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
      </div>
    </div>
  );
};

export default BookingTable;
