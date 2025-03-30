import { useState } from "react";
import CloseIcon from "../../../assets/images/close.png";
import { mobileNumberValidator } from "../../../data";
import "./style.scss";
import Radio from "../../../app/RadioButton";

export default function EditProfile(props) {
  const { userDetails, setUserDetails, setIsEditProfilePopupOpen } = props;

  const [formUserDetailsData, setFormUserDetailsData] = useState({
    name: userDetails?.name || "",
    email: userDetails?.email || "",
    phone: userDetails?.phone || "",
    gender: userDetails?.gender || "",
    dob: userDetails?.dob || "",
    addresses: userDetails?.addresses || [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setFormUserDetailsData({
        ...formUserDetailsData,
        [name]: mobileNumberValidator(value),
      });
    } else {
      setFormUserDetailsData({
        ...formUserDetailsData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasDataChanged = Object.keys(formUserDetailsData).some(
      (key) => formUserDetailsData[key] !== userDetails[key]
    );

    if (hasDataChanged) {
      let userData = { ...userDetails };
      userData = {
        addresses: userData.addresses,
        ...formUserDetailsData,
      };
      setUserDetails(userData);
      setIsEditProfilePopupOpen(false);
    } else {
      alert("No Data Changed");
    }
  };

  return (
    <div className="edit-profile-popup-container">
      <div className="edit-profile-popup-wrapper">
        <div className="epp-top">
          <span>Edit Profile</span>
          <button onClick={() => setIsEditProfilePopupOpen(false)}>
            <img src={CloseIcon} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3 flex-column user-name-row">
            <label htmlFor="inputEmail3" className="col-form-label">
              Name
            </label>

            <div className="col-sm-10 w-100 d-flex">
              <select>
                <option>Mr.</option>
                <option>Mrs.</option>
                <option>Ms.</option>
              </select>
              <input
                type="text"
                className="form-control"
                id="user-edit-name"
                name="name"
                value={formUserDetailsData?.name}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row mb-3 flex-column">
            <label htmlFor="inputEmail3" className="col-form-label">
              Email
            </label>
            <div className="col-sm-10 w-100">
              <input
                type="email"
                className="form-control text-grey"
                id="user-edit-email"
                name="email"
                value={formUserDetailsData?.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="row mb-3 flex-column">
            <label htmlFor="inputEmail3" className="col-form-label">
              Phone Number
            </label>
            <div className="col-sm-10 w-100">
              <input
                type="text"
                className="form-control"
                id="user-edit-phone"
                name="phone"
                onChange={handleInputChange}
                value={formUserDetailsData?.phone}
              />
            </div>
          </div>

          <fieldset className="row mb-3 flex-column">
            <legend className="col-form-label pt-0">Gender</legend>
            <div className="col-sm-10 d-flex">
              <div>
                <Radio
                  classes="form-check-input"
                  name="gridRadios"
                  id="user-edit-male"
                  value="option1"
                  label="Male"
                />
              </div>
              <div className="ms-5">
                <Radio
                  classes="form-check-input"
                  name="gridRadios"
                  id="user-edit-female"
                  value="option2"
                  label="Female"
                />
              </div>
            </div>
          </fieldset>

          <div className="row mb-3 flex-column">
            <label htmlFor="inputEmail3" className="col-form-label">
              Date of Birth
            </label>
            <div className="col-sm-10 w-100">
              <input
                type="date"
                className="form-control"
                id="user-edit-date"
                // value={formUserDetailsData.dob}
                // onChange={handleInputChange}
              />
            </div>
          </div>

          <button type="submit" className="btn-orange w-100">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
