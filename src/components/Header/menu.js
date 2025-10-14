import React, { useState } from "react";
import { Link } from "react-router-dom";
import { scrollToTop } from "../../helper";
import AboutIcon from "../../assets/images/menu_about_icon.svg"
import CabsIcon from "../../assets/images/menu_cabs_icon.svg"
import HotelsIcon from "../../assets/images/menu_hotels_icon.svg"
import PresenseIcon from "../../assets/images/menu_presebse_icon.svg"
import ServicesIcon from "../../assets/images/menu_services_icon.svg"
import LoginPopup from "../Popups/LoginPopup"

export default function MobileNavbar({ drawerClickHandler }) {

  const [isLoginPopupOpened, setIsLoginPopupOpened] = useState(false);

  const NavigationListELement = ({ title, link, childern, onClick, icon }) => {
    return (
      <li className="px-4 d-flex header-li position-relative ">
        <Link
          aria-current="page"
          to={link}
          onClick={() => {
            if (typeof drawerClickHandler == "function") drawerClickHandler();
            if (typeof onClick == "function") onClick();
          }}
        >
          <div className="hd-content-wrapper d-flex flex-row flex-lg-column align-items-center gap-lg-2 gap-4">
            <img src={icon} alt={title} />
            <span className="font-medium text-center">{title}</span>
          </div>
        </Link>

        {childern}
      </li>
    );
  };


  return (
    <>
      <ul className="d-flex align-content-lg-center align-items-start flex-column flex-lg-row">
        <NavigationListELement link="/#services" title="Services" icon={ServicesIcon} />
        <NavigationListELement link="/#presence" title="Presence" icon={PresenseIcon} />
        <NavigationListELement link="/coming-soon" onClick={scrollToTop} title="Hotels" icon={HotelsIcon} />
        <NavigationListELement link="/coming-soon" onClick={scrollToTop} title="Cabs" icon={CabsIcon} />
        <NavigationListELement link="/about" onClick={scrollToTop} title="About us" icon={AboutIcon} />
      </ul>
      <div className="d-flex gap-3">
        <a target="_blank" href="https://pmny.in/zIrYTtNgWD1d" className="btn-primary pay-btn px-4 py-1 text-decoration-none">Pay</a>
        <button className="btn-primary px-4 py-1" onClick={() => setIsLoginPopupOpened(true)}>Login</button>
      </div>

      {isLoginPopupOpened && <LoginPopup onClose={() => setIsLoginPopupOpened(false)} />}
    </>
  );
}
