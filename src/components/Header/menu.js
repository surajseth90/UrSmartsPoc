import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function MobileNavbar({ isLogin, headerRightContainerRef }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const secondDrawerOpen = useSelector((state) => state.secondDrawerOpen);
  const services = useSelector((state) => state.services);

  const NavigationListELement = ({ title, link, childern, onClick }) => {
    return (
      <li className="py-3 px-4 d-flex">
        <Link aria-current="page" to={link} onClick={onClick}>
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
      <ul className="d-flex">
        <NavigationListELement link="/" title="Home" />
        <NavigationListELement link="/" title="About us" />
        <NavigationListELement link="/" title="Services" />
        <NavigationListELement link="/" title="Presence" />
        <NavigationListELement link="/" title="Book online" />
      </ul>

      <button className="btn-orange rounded-pill px-4 py-1">Pay</button>
    </>
  );
}
