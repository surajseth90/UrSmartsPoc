// ConfirmationVoucher.js
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./styles.scss";
import Logo from "../../assets/images/logo.svg";

// Forward ref so parent can trigger download
const ConfirmationVoucher = forwardRef(
  ({ data, hideDownloadButton = false }, ref) => {
    const voucherRef = useRef();

    console.log("data", data);
    
    // Expose download function to parent
    useImperativeHandle(ref, () => ({
      downloadPDF,
    }));

    const downloadPDF = async () => {
        const element = voucherRef.current;
      
        const canvas = await html2canvas(element, {
          useCORS: true,
          scale: 3,
        });
      
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
        let heightLeft = pdfHeight;
        let position = 0;
      
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      
        while (heightLeft > 0) {
          position -= pdf.internal.pageSize.getHeight();
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
          heightLeft -= pdf.internal.pageSize.getHeight();
        }
      
        pdf.save("confirmation-voucher.pdf");
      };
      

    return (
      <div
        className="d-flex flex-column overflow-auto align-items-center py-5 h-100"
        style={{ background: "#f8f9fb"}}
      >
        <div ref={voucherRef} className="confirmation-voucher-box p-4">
          {/* Header/logo */}
          <div className="d-flex flex-column align-items-start mb-3">
            <img
              src={Logo}
              alt="ursmart logo"
              height={35}
              style={{ marginBottom: 8 }}
            />
            <h1 className="voucher-heading mb-1">
              <p>Confirmation</p>{" "}
              <p>
                Voucher <span className="ms-2">🎉</span>
              </p>
            </h1>
          </div>
          <div className="voucher-text mb-3">
            <span>Dear {data?.bookingPerson?.name},</span>
            <br />
            <span>
              You’re booking at{" "}
              <span className="voucher-bold">{data?.hotel?.name}</span> is
              confirmed!
              <span className="voucher-dot-sm"></span>
            </span>
          </div>

          <div className="bg-dark text-white font-14 py-2 px-3 my-3">
            Booking Details
          </div>
          <div className="voucher-row px-3 my-4">
            <div className="text-grey-black">{data?.hotel?.name}</div>
            <div className="text-grey-black">{data?.invoiceNo}</div>
          </div>

          {/* Hotel Info */}
          <div className="voucher-section mb-3">
            <div className="d-flex justify-content-between">
              <span className="font-16 text-grey-black fw-bold">Hotel</span>
              <span className="text-grey-black font-16 fw-bold">
                {data?.hotel?.phoneNumber}
              </span>
            </div>
            <div className="d-flex flex-column p-3">
              <span className="mt-2">{data?.hotel?.name}</span>
              <span className="voucher-info-text mt-3">
                {data?.hotel?.address}, {data?.hotel?.state}
              </span>
            </div>
          </div>

          {/* Dates */}
          <div className="voucher-section mb-3">
            <div className="font-16 text-grey-black fw-bold">
              Check-In / Check-Out Details
            </div>

            <div className="voucher-row px-3 py-2 mt-2 px-3">
              <div>Check-In Date</div>
              <div className="voucher-blue">{data?.checkInDate}</div>
            </div>
            <div className="voucher-row px-3 px-3">
              <div>Check-Out Date</div>
              <div className="voucher-blue">{data?.checkOutDate}</div>
            </div>
          </div>

          {/* Room Details */}
          <div className="voucher-section mb-3">
            <div className="font-16 text-grey-black fw-bold">Room Details</div>
            <div className="voucher-row px-3 pb-1 mt-2">
              <div>No. of Rooms</div>
              <div className="voucher-blue">{data?.hotel?.rooms?.length}</div>
            </div>
            <div className="voucher-row px-3 pb-1">
              <div>Type of Room</div>
              <div className="voucher-blue">{data?.occupancyType}</div>
            </div>
            <div className="voucher-row px-3">
              <div>Meal Plan</div>
              <div className="text-end voucher-blue">
                {data?.mealPlan}
                <br />
                <span className="small voucher-blue">
                  (Extras on direct payment)
                </span>
              </div>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="voucher-section mb-3 bg-white">
            <div className="font-16 text-grey-black fw-bold">
              Cancellation Policy
            </div>
            <div className="voucher-row px-3 pb-1 mt-2">
              <div className="voucher-green">
                <i className="bi bi-check-circle"></i> Fully Refundable if
                Booking cancel on and before 24hrs.
              </div>
            </div>
            <div className="voucher-row px-3">
              <div className="voucher-red">
                <i className="bi bi-exclamation-triangle"></i> After that if you
                cancel this booking will not get any refund
              </div>
            </div>
          </div>

          {/* Hotel Policy */}
          <div className="voucher-section bg-white">
            <div className="font-16 text-grey-black fw-bold">Hotel Policy</div>
            <ul className="mb-0 px-3 ps-5">
              <li className="font-16">
                Any special requests are all subjected to hotels acceptance and
                availability at the time of check-in and are not guaranteed at
                the time of booking (<span className="fw-bold">bed type</span>,{" "}
                <span className="fw-bold">smoking room</span>,{" "}
                <span className="fw-bold">early check-in</span>,{" "}
                <span className="fw-bold">late check-out</span> etc.)
              </li>
            </ul>
          </div>
        </div>

        {/* {!hideDownloadButton && (
          <button className="admin-secondary-btn mt-4 px-5" onClick={downloadPDF}>
            Download PDF
          </button>
        )} */}
      </div>
    );
  }
);

export default ConfirmationVoucher;
