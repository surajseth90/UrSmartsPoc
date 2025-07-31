import React, { useEffect, useState } from "react";
import { CloseIcon } from "../../app/Icons/index";
import { basePath } from "../../config";
import { generateHeader } from "../../helper";
import { indianStatesAndUTs, mobileNumberValidator } from "../../data";
import { useDispatch } from "react-redux";
import { setSnakeBarContent } from "../../action";

const InventoryForm = ({ onClose, currentInventory, disableAll }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    url: "",
    state: "",
    city: "",
    phoneNumber: "",
    email: "",
    occupancyType: "",
    price: "",
    gstin: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const occupancyOptions = ["Single", "Double", "Suite"];

  useEffect(() => {
    if (currentInventory) {
      const updatedData = Object.fromEntries(
        Object.entries(currentInventory).filter(
          ([key, value]) =>
            key in formData && value !== null && value !== undefined
        )
      );
      if (currentInventory?.rooms[0]?.price) {
        updatedData.price = currentInventory.rooms[0].price;
      }
      if (currentInventory?.rooms[0]?.roomType) {
        updatedData.occupancyType = currentInventory.rooms[0].roomType;
      }

      setFormData((prev) => ({
        ...prev,
        ...updatedData,
      }));
    }
  }, [currentInventory]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      let url = `${basePath}/api/hotels`;
      const body = {
        name: formData.name,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        url: formData.url,
        gstin: formData.gstin,
        rooms: [
          {
            roomType: formData.occupancyType,
            price: formData.price,
          },
        ],
      };

      let isUpdating =
        currentInventory &&
        currentInventory != null &&
        currentInventory != undefined;
      if (isUpdating) {
        url = `${basePath}/api/hotels/${currentInventory.hotelId}`;
        body.hotelId = currentInventory.hotelId;
      }

      await fetch(url, {
        method: isUpdating ? "PUT" : "POST",
        headers: generateHeader(),
        body: JSON.stringify(body),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log("res", res);

          let msg = isUpdating
            ? "Inventory Updated Successfully!"
            : "Inventory Added Successfully!";
          dispatch(setSnakeBarContent(msg));
          onClose();
        })
        .catch((err) => {
          dispatch(setSnakeBarContent("Something went wrong"));
          console.log("err", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div
      className="container p-4 bg-white overflow-auto rounded-3 new-inventory-popup hide-scrollbar"
      style={{ maxWidth: "500px", maxHeight: "100%" }}
    >
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h4 className="text-black">
          {disableAll ? "View Inventory" : "Add New Inventory"}
        </h4>
        <button onClick={onClose} title="close">
          <CloseIcon color={"#9696A0"} width="14" />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Hotel Name */}
        <div className="mb-3">
          <label className="form-label">Hotel Name</label>
          <input
            disabled={disableAll}
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Enter Project Name"
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        {/* Address */}
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            disabled={disableAll}
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
          <label className="form-label">Google Map (URL)</label>
          <input
            disabled={disableAll}
            type="url"
            className={`form-control ${errors.url ? "is-invalid" : ""}`}
            value={formData.url}
            onChange={(e) => handleInputChange("url", e.target.value)}
            placeholder="Enter Google Map Location URL"
          />
          {errors.url && <div className="invalid-feedback">{errors.url}</div>}
        </div>

        {/* State and City */}
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">State</label>
            <select
              className={`form-select ${errors.state ? "is-invalid" : ""}`}
              disabled={disableAll}
              value={formData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
            >
              <option value="">Choose State</option>
              {indianStatesAndUTs.map((state, idx) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && (
              <div className="invalid-feedback">{errors.state}</div>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label">City</label>

            <input
              type="name"
              className={`form-control ${errors.url ? "is-invalid" : ""}`}
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              placeholder="City"
              disabled={disableAll}
            />

            {errors.city && (
              <div className="invalid-feedback">{errors.city}</div>
            )}
          </div>
        </div>

        {/* Contact No. and Email */}
        <div className="row g-3 mt-3">
          <div className="col-md-6">
            <label className="form-label">Contact No.</label>
            <input
              type="text"
              className={`form-control ${
                errors.phoneNumber ? "is-invalid" : ""
              }`}
              disabled={disableAll}
              value={formData.phoneNumber}
              onChange={(e) =>
                handleInputChange(
                  "phoneNumber",
                  mobileNumberValidator(e.target.value)
                )
              }
              placeholder="Enter Contact Number"
            />
            {errors.phoneNumber && (
              <div className="invalid-feedback">{errors.phoneNumber}</div>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label">Email-ID</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter Email-ID"
              disabled={disableAll}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
        </div>

        {/* Occupancy Type */}
        <div className="mb-3 mt-3">
          <label className="form-label">Occupancy Type</label>
          <select
            className={`form-select ${
              errors.occupancyType ? "is-invalid" : ""
            }`}
            disabled={disableAll}
            value={formData.occupancyType}
            onChange={(e) => handleInputChange("occupancyType", e.target.value)}
          >
            <option value="">Choose Occupancy</option>
            {occupancyOptions.map((occupancy, idx) => (
              <option key={occupancy} value={occupancy}>
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
            <label className="form-label">Price (₹)</label>
            <input
              disabled={disableAll}
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
            <label className="form-label">GST No.</label>
            <input
              disabled={disableAll}
              type="text"
              className={`form-control ${errors.gstin ? "is-invalid" : ""}`}
              value={formData.gstin}
              onChange={(e) => handleInputChange("gstin", e.target.value)}
              placeholder="Enter GST Number"
            />
            {errors.gstin && (
              <div className="invalid-feedback">{errors.gstin}</div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-end mt-4 gap-2">
          <button
            type="button"
            className="admin-tertiary-btn me-3"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`admin-primary-btn ${isLoading ? "px-4" : ""} ${
              disableAll ? "d-none" : ""
            }`}
          >
            {isLoading ? (
              <div className="btn-loader-white"></div>
            ) : (
              <span>Save</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InventoryForm;
