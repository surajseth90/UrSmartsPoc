import React, { useState } from "react";
import { CloseIcon } from "../../app/Icons/index";
import CalenderIcon from "../../assets/images/img_icon_calendar.svg";
import WatchIcon from "../../assets/images/img_timeicon.svg";
import { indianStatesAndUTs, mobileNumberValidator } from "../../data";

const BookingForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    selectedClient: "",
    tripId: "",
    sapId: "",
    state: "",
    city: "",
    hotel: "",
    checkInDate: "",
    checkOutDate: "",
    guestName: "",
    numberOfNights: "",
    numberOfRooms: "",
    mealType: "",
    occupationDetails: [{ occupationType: "", price: "" }],
    employeeId: "EMPX212",
    contact: "",
    emailId: "",
    companyGstNumber: "",
    clientGstNumber: "",
    remarks: "",
  });

  const [errors, setErrors] = useState({});
  const now = new Date();

  const options = {
    client: ["Client A", "Client B", "Client C"],
    hotel: ["Taj", "Oberoi", "Leela"],
    meal: ["Breakfast Only", "Full Board"],
    occupation: ["Business", "Leisure"],
    companyGst: ["27AABCU9603R1ZX", "29AABCU9603R1ZY"],
    clientGst: ["27BBCDE1234F1GH", "29BBCDE1234F1GI"],
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleOccupationChange = (index, field, value) => {
    const updated = [...formData.occupationDetails];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, occupationDetails: updated }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`occupationType_${index}`];
      delete newErrors[`price_${index}`];
      return newErrors;
    });
  };

  const handleAddMore = () => {
    setFormData((prev) => ({
      ...prev,
      occupationDetails: [
        ...prev.occupationDetails,
        { occupationType: "", price: "" },
      ],
    }));
  };

  const validate = () => {
    const requiredFields = [
      "selectedClient",
      "tripId",
      "sapId",
      "state",
      "city",
      "hotel",
      "checkInDate",
      "checkOutDate",
      "guestName",
      "numberOfNights",
      "numberOfRooms",
      "mealType",
      "contact",
      "emailId",
      "companyGstNumber",
      "clientGstNumber",
    ];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]) newErrors[field] = "This field is required";
    });

    if (formData.emailId && !/\S+@\S+\.\S+/.test(formData.emailId)) {
      newErrors.emailId = "Invalid email address";
    }

    formData.occupationDetails.forEach((item, index) => {
      if (!item.occupationType)
        newErrors[`occupationType_${index}`] = "Required";
      if (!item.price) newErrors[`price_${index}`] = "Required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Data Submitted:", formData);
      alert("Booking Created Successfully!");
    } else {
      alert("Please fix the errors before submitting.");
    }
  };

  const handleCloseForm = () => {
    setFormData({ ...formData, remarks: "" });
    onClose();
  };



  return (
    <div className="container p-4 bg-white h-100 overflow-auto rounded-3 hide-scrollbar">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h4 className="text-black">Create Booking</h4>
        <button onClick={handleCloseForm} title="close">
          <CloseIcon color={"#9696A0"} width="14" />
        </button>
      </div>

      <div className="d-flex align-items-center gap-4 mb-4">
        <div className="d-flex align-items-center gap-3">
          <img src={CalenderIcon} alt="Calendar" />
          <span className="admin-text-primary">
            {now.toLocaleDateString("en-GB")}
          </span>
        </div>
        <div className="d-flex align-items-center gap-3">
          <img src={WatchIcon} alt="Time" className="w-[18px] h-[18px]" />
          <span className="admin-text-primary">
            {now.toLocaleTimeString("en-US")}
          </span>
        </div>
      </div>

      <div className="w-100 mb-4 divider" style={{ height: "1px" }}></div>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Select Client</label>
            <select
              className={`form-select ${
                errors.selectedClient ? "is-invalid" : ""
              }`}
              value={formData.selectedClient}
              onChange={(e) => handleChange("selectedClient", e.target.value)}
            >
              <option value="">Select Client</option>
              {options.client.map((opt, idx) => (
                <option key={idx}>{opt}</option>
              ))}
            </select>
            {errors.selectedClient && (
              <div className="invalid-feedback">{errors.selectedClient}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">Trip ID</label>
            <input
              type="text"
              className={`form-control ${errors.tripId ? "is-invalid" : ""}`}
              value={formData.tripId}
              onChange={(e) => handleChange("tripId", e.target.value)}
            />
            {errors.tripId && (
              <div className="invalid-feedback">{errors.tripId}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">SAP ID</label>
            <input
              type="text"
              className={`form-control ${errors.sapId ? "is-invalid" : ""}`}
              value={formData.sapId}
              onChange={(e) => handleChange("sapId", e.target.value)}
            />
            {errors.sapId && (
              <div className="invalid-feedback">{errors.sapId}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">State</label>
            <select
              className={`form-select ${errors.state ? "is-invalid" : ""}`}
              value={formData.state}
              onChange={(e) => handleChange("state", e.target.value)}
            >
              <option value="">Select State</option>
              {indianStatesAndUTs.map((opt, idx) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
            {errors.state && (
              <div className="invalid-feedback">{errors.state}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">City</label>

            <input
              type="text"
              className={`form-control ${errors.sapId ? "is-invalid" : ""}`}
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              placeholder="City"
            />

            {errors.city && (
              <div className="invalid-feedback">{errors.city}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">Hotel</label>
            <select
              className={`form-select ${errors.hotel ? "is-invalid" : ""}`}
              value={formData.hotel}
              onChange={(e) => handleChange("hotel", e.target.value)}
            >
              <option value="">Select Hotel</option>
              {options.hotel.map((opt, idx) => (
                <option key={idx}>{opt}</option>
              ))}
            </select>
            {errors.hotel && (
              <div className="invalid-feedback">{errors.hotel}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">Check-In Date</label>
            <input
              type="date"
              className={`form-control ${
                errors.checkInDate ? "is-invalid" : ""
              }`}
              value={formData.checkInDate}
              onChange={(e) => handleChange("checkInDate", e.target.value)}
            />
            {errors.checkInDate && (
              <div className="invalid-feedback">{errors.checkInDate}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">Check-Out Date</label>
            <input
              type="date"
              className={`form-control ${
                errors.checkOutDate ? "is-invalid" : ""
              }`}
              value={formData.checkOutDate}
              onChange={(e) => handleChange("checkOutDate", e.target.value)}
            />
            {errors.checkOutDate && (
              <div className="invalid-feedback">{errors.checkOutDate}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">Guest Name</label>
            <input
              type="text"
              className={`form-control ${errors.guestName ? "is-invalid" : ""}`}
              value={formData.guestName}
              onChange={(e) => handleChange("guestName", e.target.value)}
            />
            {errors.guestName && (
              <div className="invalid-feedback">{errors.guestName}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">Number of Nights </label>
            <input
              type="number"
              className={`form-control ${
                errors.numberOfNights ? "is-invalid" : ""
              }`}
              value={formData.numberOfNights}
              onChange={(e) => handleChange("numberOfNights", e.target.value)}
            />
            {errors.numberOfNights && (
              <div className="invalid-feedback">{errors.numberOfNights}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">Number of Rooms </label>
            <input
              type="number"
              className={`form-control ${
                errors.numberOfRooms ? "is-invalid" : ""
              }`}
              value={formData.numberOfRooms}
              onChange={(e) => handleChange("numberOfRooms", e.target.value)}
            />
            {errors.numberOfRooms && (
              <div className="invalid-feedback">{errors.numberOfRooms}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">Meal Type </label>
            <select
              className={`form-select ${errors.mealType ? "is-invalid" : ""}`}
              value={formData.mealType}
              onChange={(e) => handleChange("mealType", e.target.value)}
            >
              <option value="">Select Meal Type</option>
              {options.meal.map((opt, idx) => (
                <option key={idx}>{opt}</option>
              ))}
            </select>
            {errors.mealType && (
              <div className="invalid-feedback">{errors.mealType}</div>
            )}
          </div>

          <div className="col-12 occupation-container p-3">
            <label className="form-label">Occupation Type & Price</label>
            {formData.occupationDetails.map((item, index) => (
              <div key={index} className="row g-2 mb-2">
                <div className="col-md-6">
                  <select
                    className={`form-select ${
                      errors[`occupationType_${index}`] ? "is-invalid" : ""
                    }`}
                    value={item.occupationType}
                    onChange={(e) =>
                      handleOccupationChange(
                        index,
                        "occupationType",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Select Occupation</option>
                    {options.occupation.map((opt, idx) => (
                      <option key={idx}>{opt}</option>
                    ))}
                  </select>
                  {errors[`occupationType_${index}`] && (
                    <div className="invalid-feedback">
                      {errors[`occupationType_${index}`]}
                    </div>
                  )}
                </div>
                <div className="col-md-6">
                  <input
                    type="number"
                    placeholder="Price"
                    className={`form-control ${
                      errors[`price_${index}`] ? "is-invalid" : ""
                    }`}
                    value={item.price}
                    onChange={(e) =>
                      handleOccupationChange(index, "price", e.target.value)
                    }
                  />
                  {errors[`price_${index}`] && (
                    <div className="invalid-feedback">
                      {errors[`price_${index}`]}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="admin-secondary-btn mt-4"
                onClick={handleAddMore}
              >
                Add More
              </button>
            </div>
          </div>

          <div className="col-md-4">
            <label className="form-label">Employee ID</label>
            <input
              type="text"
              className="form-control"
              value={formData.employeeId}
              disabled
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Contact</label>
            <input
              type="text"
              className={`form-control ${errors.contact ? "is-invalid" : ""}`}
              value={formData.contact}
              onChange={(e) =>
                handleChange("contact", mobileNumberValidator(e.target.value))
              }
            />
            {errors.contact && (
              <div className="invalid-feedback">{errors.contact}</div>
            )}
          </div>

          <div className="col-md-4">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.emailId ? "is-invalid" : ""}`}
              value={formData.emailId}
              onChange={(e) => handleChange("emailId", e.target.value)}
            />
            {errors.emailId && (
              <div className="invalid-feedback">{errors.emailId}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">Company GST</label>
            <select
              className={`form-select ${
                errors.companyGstNumber ? "is-invalid" : ""
              }`}
              value={formData.companyGstNumber}
              onChange={(e) => handleChange("companyGstNumber", e.target.value)}
            >
              <option value="">Select Company GST</option>
              {options.companyGst.map((opt, idx) => (
                <option key={idx}>{opt}</option>
              ))}
            </select>
            {errors.companyGstNumber && (
              <div className="invalid-feedback">{errors.companyGstNumber}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">Client GST</label>
            <select
              className={`form-select ${
                errors.clientGstNumber ? "is-invalid" : ""
              }`}
              value={formData.clientGstNumber}
              onChange={(e) => handleChange("clientGstNumber", e.target.value)}
            >
              <option value="">Select Client GST</option>
              {options.clientGst.map((opt, idx) => (
                <option key={idx}>{opt}</option>
              ))}
            </select>
            {errors.clientGstNumber && (
              <div className="invalid-feedback">{errors.clientGstNumber}</div>
            )}
          </div>

          <div className="col-12">
            <label>Remarks</label>
            <textarea
              className="form-control"
              rows="3"
              value={formData.remarks}
              onChange={(e) => handleChange("remarks", e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4 d-flex justify-content-between">
          <button
            type="button"
            className="admin-tertiary-btn"
            onClick={handleCloseForm}
          >
            Discard Booking
          </button>
          <div>
            <button type="submit" className="admin-secondary-btn me-4">
              Save as Draft
            </button>
            <button type="submit" className="admin-primary-btn">
              Book Now
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
