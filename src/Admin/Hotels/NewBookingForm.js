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
  const [formData, setFormData] = useState({
    client: "",
    gstin: "",
    tripId: "",
    checkInDate: "",
    checkOutDate: "",
    mealPlan: "",
    remarks: "",
    occupancyDetails: [{ roomType: "", price: "" }],
    numberOfRooms: 1,
  });

  const [earlyCheckinData, setEarlyCheckinData] = useState({
    price: "",
    time: "",
    tax: ""
  });

  const [lateCheckoutData, setLateCheckoutData] = useState({
    price: "",
    time: "",
    tax: ""
  });

  const [extraBedData, setExtraBedData] = useState({
    age: "",
    price: "",
    tax: ""
  });

  const [liquorData, setLiquorData] = useState({
    serviceCharge: "",
    price: "",
    gst: ""
  });
  
  const [extrasState, setExtrasState] = useState({
    earlyCheckin: false,
    lateCheckout: false,
    extraAdult: false,
    liquor: false,
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

  const [companiesNameArr, setCompaniesNameArr] = useState([]);

  const [clientsArr, setClientsArr] = useState([]);
  const [isInProgress, setIsInProgress] = useState(false);

  const now = new Date();
  const headers = generateHeader();

  const dispatch = useDispatch();

  useEffect(() => {
    const urls = [
      `${basePath}/api/companies/distinct`,
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
        setCompaniesNameArr(clients);
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
    let val = e.target.value;
    const url = `${basePath}/api/companies/gstin?name=${val}`;

    await fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((res) => {
        setClientsArr(res);
      })
      .catch((Err) => console.log("Err", Err));
    handleChange("client", val);
  };

  const handleGSTChange = async (e) => {
    let val = JSON.parse(e.target.value);
    handleChange("gstin", val.gstin)
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

  const handleEarlyCheckInChange = (field, value) => {
    setEarlyCheckinData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLateCheckoutChange = (field, value) => {
    setLateCheckoutData((prev) => ({ ...prev, [field]: value }));
  };

  const handleExtraBedChange = (field, value) => {
    setExtraBedData((prev) => ({ ...prev, [field]: value }));
  };

    const handleLiquorChange = (field, value) => {
    setLiquorData((prev) => ({ ...prev, [field]: value }));
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

      if(extrasState?.earlyCheckin) {
        body = {
          ...body,
          earlyCheckin : {
            ...earlyCheckinData
          }
        }
      }

      if(extrasState?.lateCheckout) {
        body = {
          ...body,
          lateCheckout : {
            ...lateCheckoutData
          }
        }
      }

      if(extrasState?.extraAdult) {
        body = {
          ...body,
          extraBed : {
            ...extraBedData
          }
        }
      }

      if(extrasState?.liquor) {
        body = {
          ...body,
          liquor : {
            ...liquorData
          }
        }
      }

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

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setExtrasState((prev) => ({ ...prev, [name]: checked }));
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
              {companiesNameArr.map((opt, idx) => (
                <option key={idx}>{opt}</option>
              ))}
            </select>
          </div>

          <div className={`col-md-6 ${currentPage == 2 ? "d-none" : ""}`}>
            <label className="form-label">Client GST</label>
            <select
              className={`form-select`}
              onChange={handleGSTChange}
            >
              <option value="">Select Client GST</option>
              {clientsArr.map((opt, idx) => (
                <option key={`${opt.gstin}-${idx}`} value={JSON.stringify(opt)}>{opt.gstin}</option>
              ))}
            </select>
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
              className={`form-control ${errors.checkInDate ? "is-invalid" : ""
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
              className={`form-control ${errors.checkOutDate ? "is-invalid" : ""
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
            className={`col-12 occupancy-container p-3 ${currentPage === 1 ? "d-none" : ""
              }`}
          >
            <label className="form-label">Occupancy Type & Price</label>
            {formData.occupancyDetails.map((item, index) => (
              <div key={index} className="row g-2 mb-2">
                <div className="col-md-6">
                  <select
                    className={`form-select ${errors[`roomType_${index}`] ? "is-invalid" : ""
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
                    className={`form-control ${errors[`price_${index}`] ? "is-invalid" : ""
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

          <div
            className={`col-12 occupancy-container p-3 ${currentPage === 1 ? "d-none" : ""
              }`}
          >
            <div className="d-flex justify-content-between">

              <div className="gap-3 d-flex align-items-center">
                <input
                  type="checkbox"
                  name="earlyCheckin"
                  id="earlyCheckin"
                  checked={extrasState.earlyCheckin}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="earlyCheckin">
                  Early Check-in
                </label>
              </div>
              <div className="gap-3 d-flex align-items-center">
                <input
                  type="checkbox"
                  name="extraAdult"
                  id="extraAdult"
                  checked={extrasState.extraAdult}
                  onChange={handleCheckboxChange}
                />{' '}

                <label htmlFor="extraAdult">
                  Extra Adult

                </label>
              </div>
              <div className="gap-3 d-flex align-items-center">
                <input
                  type="checkbox"
                  name="liquor"
                  id="liquor"
                  checked={extrasState.liquor}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="liquor">
                  Liquor
                </label>
              </div>
              <div className="gap-3 d-flex align-items-center">
                <input
                  type="checkbox"
                  name="lateCheckout"
                  id="lateCheckout"
                  checked={extrasState.lateCheckout}
                  onChange={handleCheckboxChange}
                />{' '}
                <label htmlFor="lateCheckout">
                  Late Check-out
                </label>
              </div>
            </div>

            {extrasState.earlyCheckin &&
              <>
                <h5 className="font-18 mt-4 mb-2 ps-2">Early Checkin</h5>
                <div className="w-100 d-flex">
                  <div className={`col-md-4 px-2 ${currentPage == 1 ? "d-none" : ""}`}>
                    <label className="mb-2">Time</label>
                    <input
                      type="text"
                      className={`form-control`}
                      value={earlyCheckinData?.time}
                      onChange={(e) => handleEarlyCheckInChange("time", e.target.value)}
                    />
                  </div>

                  <div className={`col-md-4 px-2 ${currentPage == 1 ? "d-none" : ""}`}>
                    <label className="mb-2">Price</label>
                    <input
                      type="text"
                      className={`form-control`}
                      value={earlyCheckinData?.price}
                      onChange={(e) => handleEarlyCheckInChange("price", e.target.value)}
                    />
                  </div>

                  <div className={`col-md-4 px-2 ${currentPage == 1 ? "d-none" : ""}`}>
                    <label className="mb-2">Tax Levied</label>
                    <select
                      className={`form-select`}
                      value={earlyCheckinData?.tax}
                      onChange={(e) => handleEarlyCheckInChange("tax", e.target.value)}

                    >
                      <option value="">Select Tax Levied</option>
                      <option value="7.5">7.5</option>
                      <option value="12">12</option>
                      <option value="18">18</option>
                    </select>
                  </div>
                </div>
              </>
            }

            {extrasState.lateCheckout &&
              <>
                <h5 className="font-18 mt-4 mb-2 ps-2">Late Checkout</h5>
                <div className="w-100 d-flex">
                  <div className={`col-md-4 px-2 ${currentPage == 1 ? "d-none" : ""}`}>
                    <label className="mb-2">Time</label>
                    <input
                      type="text"
                      className={`form-control`}
                      value={lateCheckoutData?.time}
                      onChange={(e) => handleLateCheckoutChange("time", e.target.value)}
                    />
                  </div>

                  <div className={`col-md-4 px-2 ${currentPage == 1 ? "d-none" : ""}`}>
                    <label className="mb-2">Price</label>
                    <input
                      type="text"
                      className={`form-control`}
                      value={lateCheckoutData?.price}
                      onChange={(e) => handleLateCheckoutChange("price", e.target.value)}
                    />
                  </div>

                  <div className={`col-md-4 px-2 ${currentPage == 1 ? "d-none" : ""}`}>
                    <label className="mb-2">Tax Levied</label>
                    <select
                      className={`form-select`}
                      value={lateCheckoutData?.tax}
                      onChange={(e) => handleLateCheckoutChange("tax", e.target.value)}

                    >
                      <option value="">Select Tax Levied</option>
                      <option value="7.5">7.5</option>
                      <option value="12">12</option>
                      <option value="18">18</option>
                    </select>
                  </div>
                </div>
              </>
            }

            {extrasState.extraAdult &&
              <>
                <h5 className="font-18 mt-4 mb-2 ps-2">Extras Adult/Bed</h5>
                <div className="w-100 d-flex">
                  <div className={`col-md-4 px-2 ${currentPage == 1 ? "d-none" : ""}`}>
                    <label className="mb-2">User Age</label>
                    <select
                      className={`form-select`}
                      value={extraBedData?.age}
                      onChange={(e) => handleExtraBedChange("age", e.target.value)}

                    >
                      <option value="">Select Age</option>
                      {Array.from(Array(101).keys()).map((item) => {
                        return (
                          <option value={item} key={`age-${item}`}>{item}</option>
                        )
                      })}
                    </select>
                  </div>

                  <div className={`col-md-4 px-2 ${currentPage == 1 ? "d-none" : ""}`}>
                    <label className="mb-2">Price</label>
                    <input
                      type="text"
                      className={`form-control`}
                      value={extraBedData?.price}
                      onChange={(e) => handleExtraBedChange("price", e.target.value)}
                    />
                  </div>

                  <div className={`col-md-4 px-2 ${currentPage == 1 ? "d-none" : ""}`}>
                    <label className="mb-2">Tax Levied</label>
                    <select
                      className={`form-select`}
                      value={extraBedData?.tax}
                      onChange={(e) => handleExtraBedChange("tax", e.target.value)}

                    >
                      <option value="">Select Tax Levied</option>
                      <option value="0">0</option>
                      <option value="18">18</option>
                    </select>
                  </div>
                </div>
              </>
            }

            {extrasState.liquor &&
              <>
                <h5 className="font-18 mt-4 mb-2 ps-2">Liquor</h5>
                <div className="w-100 d-flex">
                  <div className={`col-md-4 px-2 ${currentPage == 1 ? "d-none" : ""}`}>
                    <label className="mb-2">Price</label>
                    <input
                      type="text"
                      className={`form-control`}
                      value={liquorData?.price}
                      onChange={(e) => handleLiquorChange("price", e.target.value)}
                    />
                  </div>

                  <div className={`col-md-4 px-2 ${currentPage == 1 ? "d-none" : ""}`}>
                    <label className="mb-2">Service Charge</label>
                    <select
                      className={`form-select`}
                      value={liquorData?.serviceCharge}
                      onChange={(e) => handleLiquorChange("serviceCharge", e.target.value)}

                    >
                      <option value="">Select Service Charge</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="5">5</option>
                      <option value="8">8</option>
                      <option value="10">10</option>
                      <option value="12">12</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                    </select>
                  </div>

                  <div className={`col-md-4 px-2 ${currentPage == 1 ? "d-none" : ""}`}>
                    <label className="mb-2">GST</label>
                    <select
                      className={`form-select`}
                      value={liquorData?.gst}
                      onChange={(e) => handleLiquorChange("gst", e.target.value)}

                    >
                      <option value="">Select GST</option>
                      <option value="18">18</option>
                    </select>
                  </div>
                </div>
              </>
            }
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
          className={`mt-4 d-flex ${currentPage == 1 ? "justify-content-end" : "justify-content-between"
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
