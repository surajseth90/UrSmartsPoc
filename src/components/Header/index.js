import React, { useEffect, useRef, useState, memo, Suspense } from "react";
import "./style.scss";
import HeaderLogo from "../../assets/images/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setIsOverlay } from "../../action";
import Menu from "./menu";

function Header() {
  const dispatch = useDispatch();
  const [dimension] = useSelector((state) => [state.dimension]);
  const location = useLocation();
  const headerRightContainerRef = useRef(null);
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  useEffect(() => {
    // dispatch(setIsOverlay(false));
    setIsMobileMenuOpened(false);
    document.body.style.overflowY = "auto";
    if (headerRightContainerRef.current)
      headerRightContainerRef.current.classList.remove("show");
  }, [location.pathname]);

  const drawerClickHandler = () =>{
    const classList = headerRightContainerRef.current.classList;
    if (classList.contains("show")) {
      classList.remove("show");
      document.body.style.overflowY = "auto";
      setIsMobileMenuOpened(false);
    } else {
      document.body.style.overflowY = "hidden";
      setIsMobileMenuOpened(true);
      classList.add("show");
    }
  }

  return (
    <div className="header-container w-100 position-relative top-0 bg-white">
      <div className="container">
        <nav className="header d-flex navbar-light position-relative align-items-center justify-content-between">
          <div className="header-left-container d-flex justify-content-between align-items-center">
            <Link to={"/"}>
              <div className="header-logo d-flex justify-content-center align-items-center">
                <img src={HeaderLogo} alt="Ursmartspoc Logo" />
              </div>
            </Link>
          </div>
          <button
            className="navbar-toggler"
            id="navbar-toggle"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={drawerClickHandler}
          >
            <span
              className={isMobileMenuOpened ? "d-none" : "navbar-toggler-icon"}
            ></span>
            <svg
              className={isMobileMenuOpened ? "" : "d-none"}
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="24"
              viewBox="0 0 23 24"
              fill="none"
            >
              <path
                d="M1.94417 23.2692L0 21.325L9.5275 11.7971L0 2.2692L1.94417 0.325035L11.4721 9.85254L21 0.325035L22.9442 2.2692L13.4167 11.7971L22.9442 21.325L21 23.2692L11.4721 13.7417L1.94417 23.2692Z"
                fill="black"
              ></path>
            </svg>
          </button>
          <div
            className="mobile-view-close-btn-wrapper"
            style={{ display: "none" }}
          >
            <button
              className="navbar-toggler"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => {
                const classList = headerRightContainerRef.current.classList;
                if (classList.contains("show")) {
                  classList.remove("show");
                  dispatch(setIsOverlay(false));
                  document.body.style.overflowY = "auto";
                } else {
                  document.body.style.overflowY = "hidden";
                  classList.add("show");
                  dispatch(setIsOverlay(true));
                }
              }}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          {dimension.windowSize > 992 ? (
            <Menu />
          ) : (
            <div
              className="mobile-drawer position-fixed end-0 bottom-0 w-100 m-0 p-3"
              ref={headerRightContainerRef}
            >
              <Menu drawerClickHandler={drawerClickHandler}/>
            </div>
          )}

          {console.log(dimension)}
        </nav>
      </div>
    </div>
  );
}

export default memo(Header);
