import React, { useEffect, useState } from "react";
import { CloseIcon, LeftArrowIcon } from "../../app/Icons/index";
import CalenderIcon from "../../assets/images/img_icon_calendar.svg";
import WatchIcon from "../../assets/images/img_timeicon.svg";
import { mealInclusionOptions, roomType } from "../../data";
import { basePath } from "../../config";
import { generateHeader } from "../../helper";
import SearchableDropdown from "../../app/SearchDropdown";
import { useDispatch, useSelector } from "react-redux";
import { setSnakeBarContent } from "../../action";

const BookingForm = ({ onClose, editableBooking }) => {
  console.log("editableBooking", editableBooking);

  const [formData, setFormData] = useState({
    client: "",
    tripId: "",
    checkInDate: "",
    checkOutDate: "",
    mealPlan: "",
    remarks: "",
    occupancyDetails: [{ roomType: "", price: "" }],
    numberOfRooms: 1,
  });

  const [adminDetails] = useSelector((state) => [state.adminDetails]);

  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedCompany, setSelectedCompany] = useState(
    editableBooking != null ? editableBooking.company : {}
  );

  const [employeesArr, setEmployeesArr] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(
    editableBooking != null ? editableBooking.employee : {}
  );

  const [hotelsArr, setHotelsArr] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(
    editableBooking != null ? editableBooking.hotel : {}
  );

  const [statesArr, setStatesArr] = useState([]);
  const [citiesArr, setCitiesArr] = useState([]);

  const [clientsArr, setClientsArr] = useState([]);
  const [isInProgress, setIsInProgress] = useState(false);

  const now = new Date();
  const headers = generateHeader();

  const dispatch = useDispatch();

  useEffect(() => {
    const urls = [
      `${basePath}/api/companies/all`,
      `${basePath}/api/hotels/states`,
    ];

    // Make parallel GET requests
    Promise.all(
      urls.map((url) =>
        fetch(url, {
          method: "GET",
          headers: headers,
        }).then((res) => res.json())
      )
    )
      .then(([clients, states]) => {
        setClientsArr(clients);
        setStatesArr(states);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const getCities = async (val) => {
    let params = new URLSearchParams({
      state: val,
    });
    const url = `${basePath}/api/hotels/cities?${params}`;
    await fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((res) => {
        setCitiesArr(res);
      })
      .catch((Err) => console.log("Err", Err));
  };

  const getHotels = async (val) => {
    if (!formData?.state) {
      dispatch(setSnakeBarContent("Please select state and city!"));
      return;
    }
    let params = new URLSearchParams({
      state: formData.state,
      city: val,
    });
    const url = `${basePath}/api/hotels/search?${params}`;
    await fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((res) => {
        setHotelsArr(res);
      })
      .catch((Err) => console.log("Err", Err));
  };

  const handleClientChange = async (e) => {
    let val = JSON.parse(e.target.value);
    setSelectedCompany(val);

    const url = `${basePath}/api/employees/company/${val.companyId}`;

    await fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((res) => {
        setEmployeesArr(res);
      })
      .catch((Err) => console.log("Err", Err));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
    setErrors((prev) => ({ ...prev, [`${parent}_${field}`]: "" }));
  };

  const handleDeepNestedChange = (parent, child, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: {
          ...prev[parent][child],
          [field]: value,
        },
      },
    }));
    setErrors((prev) => ({ ...prev, [`${parent}_${child}_${field}`]: "" }));
  };

  const handleOccupationCancy = (index, field, value) => {
    const updated = [...formData.occupancyDetails];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, occupancyDetails: updated }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`roomType_${index}`];
      delete newErrors[`price_${index}`];
      return newErrors;
    });
  };

  const handleAddMore = () => {
    setFormData((prev) => ({
      ...prev,
      occupancyDetails: [...prev.occupancyDetails, { roomType: "", price: "" }],
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!selectedCompany?.name) {
      dispatch(setSnakeBarContent("Please Select Client!"));
      return false;
    }

    if (!selectedEmployee?.name) {
      dispatch(setSnakeBarContent("Please Select Guest!"));
      return false;
    }

    if (!selectedHotel?.name) {
      dispatch(setSnakeBarContent("Please Select Hotel!"));
      return false;
    }

    if (formData.checkInDate.length == 0) {
      dispatch(setSnakeBarContent("Please Select Check-in Date!"));
      return false;
    }

    if (formData.checkOutDate.length == 0) {
      dispatch(setSnakeBarContent("Please Select Check-out Date!"));
      return false;
    }

    // // Validate top-level fields
    // if (!formData.checkInDate) newErrors.checkInDate = "This field is required";
    // if (!formData.checkOutDate)
    //   newErrors.checkOutDate = "This field is required";
    // if (!formData.noOfNights) newErrors.noOfNights = "This field is required";
    // if (!formData.numberOfRooms)
    //   newErrors.numberOfRooms = "This field is required";

    // // Validate employee fields
    // if (!formData.employee.name)
    //   newErrors.employee_name = "This field is required";
    // if (!formData.employee.email) {
    //   newErrors.employee_email = "This field is required";
    // } else if (!/\S+@\S+\.\S+/.test(formData.employee.email)) {
    //   newErrors.employee_email = "Invalid email address";
    // }

    // // Validate hotel fields
    // if (!formData.hotel.name) newErrors.hotel_name = "This field is required";
    // if (!formData.hotel.city) newErrors.hotel_city = "This field is required";
    // if (!formData.hotel.state) newErrors.hotel_state = "This field is required";

    // // Validate booking person fields
    // if (!formData.bookingPerson.name)
    //   newErrors.bookingPerson_name = "This field is required";
    // if (!formData.bookingPerson.email) {
    //   newErrors.bookingPerson_email = "This field is required";
    // } else if (!/\S+@\S+\.\S+/.test(formData.bookingPerson.email)) {
    //   newErrors.bookingPerson_email = "Invalid email address";
    // }
    // if (!formData.bookingPerson.company.gstin)
    //   newErrors.bookingPerson_company_gstin = "This field is required";

    // // Validate company fields
    // if (!formData.company.gstin)
    //   newErrors.company_gstin = "This field is required";

    // // Validate occupancy details
    // formData.occupancyDetails.forEach((item, index) => {
    //   if (!item.roomType) newErrors[`roomType_${index}`] = "Required";
    //   if (!item.price) newErrors[`price_${index}`] = "Required";
    // });

    // setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e, status) => {
    e.preventDefault();
    if (validate()) {
      setIsInProgress(true);
      let hotelData = {
        ...selectedHotel,
        rooms: formData.occupancyDetails,
      };
      let body = {
        tripId: formData?.tripId ?? "",
        employee: selectedEmployee,
        company: selectedCompany,
        hotel: hotelData,
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        mealPlan: formData.mealPlan,
        remarks: formData.remarks,
        requestedBy: adminDetails,
        status: status || "COMPLETED",
      };

      const url = `${basePath}/api/bookings`;
      let msg = "";

      await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((res) => {
          setEmployeesArr(res);
          msg = "Booking Created Successfully";
        })
        .catch((Err) => {
          console.log("Err", Err);
          msg = "Something went wrong!";
        })
        .finally(() => {
          setIsInProgress(false);
          handleCloseForm();
          dispatch(setSnakeBarContent(msg));
        });
    }
  };

  const handleCloseForm = () => {
    // setFormData({});
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
      <form>
        <div className="row g-3">
          <div className={`col-md-6 ${currentPage == 2 ? "d-none" : ""}`}>
            <label className="form-label">Select Client</label>
            <select className={`form-select`} onChange={handleClientChange}>
              <option value="">Select Client</option>
              {clientsArr.map((opt, idx) => (
                <option value={JSON.stringify(opt)} key={idx}>
                  {opt.name}
                </option>
              ))}
            </select>
          </div>

          <div className={`col-md-6 ${currentPage == 2 ? "d-none" : ""}`}>
            <label className="form-label">Client GST</label>
            <input
              type="text"
              className="form-control"
              value={selectedCompany?.gstin}
              disabled
            />
          </div>

          <div className={`col-md-4 ${currentPage == 2 ? "d-none" : ""}`}>
            <label className="form-label">Guest Email</label>
            <SearchableDropdown
              options={employeesArr || []}
              searchKey="email"
              onSelect={(item) => setSelectedEmployee(item)}
              onNoOptionFound={(term) => console.log("No match for:", term)}
              placeholder="Guest Email"
            />
          </div>

          <div className={`col-md-4 ${currentPage == 2 ? "d-none" : ""}`}>
            <label className="form-label">Guest ID</label>
            <SearchableDropdown
              options={employeesArr || []}
              searchKey="employeeId"
              onSelect={(item) => setSelectedEmployee(item)}
              onNoOptionFound={(term) => console.log("No match for:", term)}
              placeholder="Guest ID"
              disabled={selectedEmployee?.employeeId != null}
              defaultValue={selectedEmployee?.employeeId || ""}
            />
          </div>

          <div className={`col-md-4 ${currentPage == 2 ? "d-none" : ""}`}>
            <label className="mb-2">Guest Name</label>
            <input
              type="text"
              className={`form-control`}
              value={selectedEmployee?.name}
              disabled
            />
          </div>

          <div className={`col-md-6 ${currentPage == 2 ? "d-none" : ""}`}>
            <label className="mb-2">SAP ID</label>
            <SearchableDropdown
              options={employeesArr || []}
              searchKey="sapId"
              onSelect={(item) => setSelectedEmployee(item)}
              onNoOptionFound={(term) => console.log("No match for:", term)}
              disabled={selectedEmployee?.sapId != null}
              defaultValue={selectedEmployee?.sapId || ""}
            />
          </div>

          <div className={`col-md-6 ${currentPage == 2 ? "d-none" : ""}`}>
            <label className="mb-2">Trip ID</label>
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

          <div className={`col-md-6 ${currentPage === 1 ? "d-none" : ""}`}>
            <label className="form-label">State</label>
            <select
              className={`form-select ${errors.state ? "is-invalid" : ""}`}
              value={formData.state}
              onChange={(e) => {
                getCities(e.target.value);
                handleChange("state", e.target.value);
              }}
            >
              <option value="">Select State</option>
              {statesArr.map((opt, idx) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
            {errors.state && (
              <div className="invalid-feedback">{errors.state}</div>
            )}
          </div>

          <div className={`col-md-6 ${currentPage === 1 ? "d-none" : ""}`}>
            <label className="form-label">City</label>
            <select
              className={`form-select ${errors.city ? "is-invalid" : ""}`}
              value={formData.city}
              onChange={(e) => {
                let val = e.target.value;
                handleChange("city", val);
                getHotels(val);
              }}
            >
              <option value="">Select City</option>
              {citiesArr.map((opt, idx) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
            {errors.city && (
              <div className="invalid-feedback">{errors.city}</div>
            )}
          </div>

          <div className={`col-md-6 ${currentPage === 1 ? "d-none" : ""}`}>
            <label className="form-label">Hotel</label>
            <select
              className={`form-select ${errors.hotel ? "is-invalid" : ""}`}
              onChange={(e) => {
                let val = JSON.parse(e.target.value);
                setSelectedHotel(val);
                handleChange("hotel", val.name);
              }}
            >
              <option value="">Select Hotel</option>
              {hotelsArr.map((opt, idx) => (
                <option
                  data-value={JSON.stringify(opt)}
                  value={JSON.stringify(opt)}
                  key={idx}
                >
                  {opt.name}
                </option>
              ))}
            </select>
            {errors.hotel && (
              <div className="invalid-feedback">{errors.hotel}</div>
            )}
          </div>

          <div className={`col-md-6 ${currentPage === 1 ? "d-none" : ""}`}>
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

          <div className={`col-md-6 ${currentPage === 1 ? "d-none" : ""}`}>
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

          <div className={`col-md-6 ${currentPage === 1 ? "d-none" : ""}`}>
            <label className="form-label">Meal Type </label>
            <select
              className={`form-select ${errors.mealPlan ? "is-invalid" : ""}`}
              value={formData.mealPlan}
              onChange={(e) => handleChange("mealPlan", e.target.value)}
            >
              <option value="">Select Meal Type</option>
              {mealInclusionOptions.map((opt, idx) => (
                <option key={idx} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.mealPlan && (
              <div className="invalid-feedback">{errors.mealPlan}</div>
            )}
          </div>

          <div
            className={`col-12 occupancy-container p-3 ${
              currentPage === 1 ? "d-none" : ""
            }`}
          >
            <label className="form-label">Occupancy Type & Price</label>
            {formData.occupancyDetails.map((item, index) => (
              <div key={index} className="row g-2 mb-2">
                <div className="col-md-6">
                  <select
                    className={`form-select ${
                      errors[`roomType_${index}`] ? "is-invalid" : ""
                    }`}
                    value={item.roomType}
                    onChange={(e) =>
                      handleOccupationCancy(index, "roomType", e.target.value)
                    }
                  >
                    <option value="">Select Occupancy</option>
                    {roomType.map((opt, idx) => (
                      <option key={idx}>{opt}</option>
                    ))}
                  </select>
                  {errors[`roomType_${index}`] && (
                    <div className="invalid-feedback">
                      {errors[`roomType_${index}`]}
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
                      handleOccupationCancy(index, "price", e.target.value)
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
                disabled={isInProgress}
              >
                Add More
              </button>
            </div>
          </div>

          <div className={`col-12 ${currentPage === 1 ? "d-none" : ""}`}>
            <label>Remarks</label>
            <textarea
              className="form-control"
              rows="3"
              value={formData.remarks}
              onChange={(e) => handleChange("remarks", e.target.value)}
            />
          </div>
        </div>

        <div
          className={`mt-4 d-flex ${
            currentPage == 1 ? "justify-content-end" : "justify-content-between"
          }`}
        >
          {currentPage == 1 ? (
            <button
              title="next"
              className={`admin-secondary-btn`}
              onClick={() => {
                setCurrentPage(2);
              }}
              disabled={isInProgress}
            >
              Next
            </button>
          ) : (
            <>
              <div>
                <button
                  title="next"
                  className={`admin-secondary-btn me-2`}
                  onClick={() => {
                    setCurrentPage(1);
                  }}
                  disabled={isInProgress}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="admin-tertiary-btn"
                  onClick={handleCloseForm}
                  disabled={isInProgress}
                >
                  Discard Booking
                </button>
              </div>

              <div>
                <button
                  disabled={isInProgress}
                  type="submit"
                  className="admin-secondary-btn me-4"
                  onClick={(e) => handleSubmit(e, "DRAFT")}
                >
                  Save as Draft
                </button>
                <button
                  disabled={isInProgress}
                  type="submit"
                  className="admin-primary-btn"
                  onClick={handleSubmit}
                >
                  Book Now
                </button>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
