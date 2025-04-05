import React from "react";
import { Link } from "react-router-dom";

export default function MobileNavbar({ drawerClickHandler }) {
  const NavigationListELement = ({ title, link, childern, onClick }) => {
    return (
      <li className="px-4 d-flex header-li position-relative ">
        <Link
          aria-current="page"
          to={link}
          onClick={() => {
            if (typeof drawerClickHandler == "function")  drawerClickHandler();
            if (typeof onClick == "function") onClick();
          }}
        >
          <div className="hd-content-wrapper">
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
        <NavigationListELement link="/" title="Home" />
        <NavigationListELement link="/#services" title="Services" />
        <NavigationListELement link="/" title="Book Meeting" />
        <NavigationListELement link="/#presence" title="Presence" />
        <NavigationListELement link="/about" title="About us" />
      </ul>
      <button className="btn-orange pay-btn rounded-pill px-4 py-1">Pay</button>
    </>
  );
}
