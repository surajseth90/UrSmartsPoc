import React, { useState } from "react";
import { CloseIcon } from "../../app/Icons/index";

const InventoryForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    hotelName: "",
    address: "",
    googleMapUrl: "",
    state: "",
    city: "",
    contactNo: "",
    email: "",
    occupancyType: "",
    price: "",
    gstNo: "",
  });

  const [errors, setErrors] = useState({});

  const stateOptions = ["Maharashtra", "Delhi", "Karnataka"];
  const cityOptions = ["Mumbai", "Delhi", "Bangalore"];
  const occupancyOptions = ["Single", "Double", "Suite"];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (!formData[field]) newErrors[field] = "This field is required";
    });

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted", formData);
      alert("Form Submitted Successfully!");
    }
  };

  return (
    <div
      className="container p-4 bg-white overflow-auto rounded-3 new-inventory-popup hide-scrollbar"
      style={{ maxWidth: "500px", maxHeight:"100%" }}
    >
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h4 className="text-black">Add New Inventory</h4>
        <button onClick={onClose} title="close">
          <CloseIcon color={"#9696A0"} width="14" />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Hotel Name */}
        <div className="mb-3">
          <label className="form-label">
            Hotel Name
          </label>
          <input
            type="text"
            className={`form-control ${errors.hotelName ? "is-invalid" : ""}`}
            value={formData.hotelName}
            onChange={(e) => handleInputChange("hotelName", e.target.value)}
            placeholder="Enter Project Name"
          />
          {errors.hotelName && (
            <div className="invalid-feedback">{errors.hotelName}</div>
          )}
        </div>

        {/* Address */}
        <div className="mb-3">
          <label className="form-label">
            Address
          </label>
          <input
            type="text"
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            placeholder="Enter Address"
          />
          {errors.address && (
            <div className="invalid-feedback">{errors.address}</div>
          )}
        </div>

        {/* Google Map URL */}
        <div className="mb-3">
          <label className="form-label">
            Google Map (URL)
          </label>
          <input
            type="url"
            className={`form-control ${
              errors.googleMapUrl ? "is-invalid" : ""
            }`}
            value={formData.googleMapUrl}
            onChange={(e) => handleInputChange("googleMapUrl", e.target.value)}
            placeholder="Enter Google Map Location URL"
          />
          {errors.googleMapUrl && (
            <div className="invalid-feedback">{errors.googleMapUrl}</div>
          )}
        </div>

        {/* State and City */}
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">
              State
            </label>
            <select
              className={`form-select ${errors.state ? "is-invalid" : ""}`}
              value={formData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
            >
              <option value="">Choose State</option>
              {stateOptions.map((state, idx) => (
                <option key={idx} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && (
              <div className="invalid-feedback">{errors.state}</div>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label">
              City
            </label>
            <select
              className={`form-select ${errors.city ? "is-invalid" : ""}`}
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
            >
              <option value="">Choose City</option>
              {cityOptions.map((city, idx) => (
                <option key={idx} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && (
              <div className="invalid-feedback">{errors.city}</div>
            )}
          </div>
        </div>

        {/* Contact No. and Email */}
        <div className="row g-3 mt-3">
          <div className="col-md-6">
            <label className="form-label">
              Contact No.
            </label>
            <input
              type="text"
              className={`form-control ${errors.contactNo ? "is-invalid" : ""}`}
              value={formData.contactNo}
              onChange={(e) => handleInputChange("contactNo", e.target.value)}
              placeholder="Enter Contact Number"
            />
            {errors.contactNo && (
              <div className="invalid-feedback">{errors.contactNo}</div>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label">
              Email-ID
            </label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter Email-ID"
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
        </div>

        {/* Occupancy Type */}
        <div className="mb-3 mt-3">
          <label className="form-label">
            Occupancy Type
          </label>
          <select
            className={`form-select ${
              errors.occupancyType ? "is-invalid" : ""
            }`}
            value={formData.occupancyType}
            onChange={(e) => handleInputChange("occupancyType", e.target.value)}
          >
            <option value="">Choose Occupancy</option>
            {occupancyOptions.map((occupancy, idx) => (
              <option key={idx} value={occupancy}>
                {occupancy}
              </option>
            ))}
          </select>
          {errors.occupancyType && (
            <div className="invalid-feedback">{errors.occupancyType}</div>
          )}
        </div>

        {/* Price and GST */}
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">
              Price (₹)
            </label>
            <input
              type="number"
              className={`form-control ${errors.price ? "is-invalid" : ""}`}
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              placeholder="Enter Price"
            />
            {errors.price && (
              <div className="invalid-feedback">{errors.price}</div>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label">
              GST No.
            </label>
            <input
              type="text"
              className={`form-control ${errors.gstNo ? "is-invalid" : ""}`}
              value={formData.gstNo}
              onChange={(e) => handleInputChange("gstNo", e.target.value)}
              placeholder="Enter GST Number"
            />
            {errors.gstNo && (
              <div className="invalid-feedback">{errors.gstNo}</div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-end mt-4 gap-2">
          <button type="button" className="admin-tertiary-btn me-3" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="admin-primary-btn">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default InventoryForm;
