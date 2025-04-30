import React from "react";
import { Link } from "react-router-dom";
import { scrollToTop } from "../../helper";

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
        <NavigationListELement link="/" title="Home" onClick={scrollToTop} />
        <NavigationListELement link="/#services" title="Services" />
        <NavigationListELement link="/" onClick={scrollToTop} title="Book Meeting" />
        <NavigationListELement link="/#presence" title="Presence" />
        <NavigationListELement link="/about" onClick={scrollToTop} title="About us" />
      </ul>
      <a target="_blank" href="https://pmny.in/zIrYTtNgWD1d" className="btn-primary pay-btn rounded-pill px-4 py-1 text-decoration-none">Pay</a>
    </>
  );
}
