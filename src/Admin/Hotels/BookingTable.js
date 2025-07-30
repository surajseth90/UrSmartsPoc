import React, { useEffect, useRef, useState } from "react";
import { basePath } from "../../config";
import EyeIcon from "../../assets/images/eye.svg";
import DownloadIcon from "../../assets/images/download.svg";
import EditIcon from "../../assets/images/edit.svg";
import { generateHeader } from "../../helper";
import DownloadableSnippet from "../../app/DownloadableSnippet/index";
import { CloseIcon } from "../../app/Icons/index";

const BookingTable = ({ status }) => {
  const [bookings, setBookings] = useState([]);
  const [currentBooking, setCurrentBoking] = useState(null);
  const [pdfModal, setPdfModal] = useState(null);
  const voucherRef = useRef();

  const handlePDFDownload = (data) => {
    setCurrentBoking(data);
    setTimeout(() => {
      voucherRef.current.downloadPDF();
    }, 100);
  };

  useEffect(() => {
    getAllBookings();
  }, [status]);

  async function getAllBookings() {
    let url = `${basePath}/api/bookings/all`;

    if (status !== "ALL") {
      const params = new URLSearchParams({
        status: status,
      }).toString();

      url = url + `?${params}`;
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
                    <button
                      className="px-2"
                      title="view"
                      onClick={() => setPdfModal(b)}
                    >
                      <img src={EyeIcon} alt="View" />
                    </button>
                    <button className="px-2" title="Edit">
                      <img src={EditIcon} alt="Edit" />
                    </button>
                    <button
                      className="px-2"
                      title="download"
                      onClick={() => {
                        handlePDFDownload(b);
                      }}
                    >
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

      {pdfModal && (
        <div className="w-100 h-100 position-fixed top-0 start-0 popup-outer-wrapper">
          <div className="overlay w-100 h-100"></div>
          <div className="z-101 w-max m-auto rounded-4 py-4 position-relative h-100 rounded-3 d-flex justify-content-center align-items-center">
            <button
              className="position-absolute end-0 admin-primary-btn"
              onClick={() => setPdfModal(null)}
              style={{ top: "24px" }}
            >
              <CloseIcon color={"#000"} width="14" />
            </button>
            <DownloadableSnippet data={pdfModal} />
          </div>
        </div>
      )}

      {bookings && currentBooking && (
        <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
          <DownloadableSnippet
            ref={voucherRef}
            data={currentBooking}
            hideDownloadButton
          />
        </div>
      )}
    </div>
  );
};

export default BookingTable;
