import React from "react";
import "./style.scss";
import HeaderLogo from "../../assets/images/header-logo.png";
import { useNavigate } from "react-router-dom";
import FBIcon from "../../assets/images/facebook.png";
import TwitterIcon from "../../assets/images/twitter.png";
import InstaIcon from "../../assets/images/instagram.png";
import LinkedInIcon from "../../assets/images/linkedin.png";
import AppleIcon from "../../assets/images/appleLogo.png";
import PlayStoreIcon from "../../assets/images/playStoreLogo.png";
import { useSelector } from "react-redux";

export default function Footer() {
  const navigate = useNavigate();
  const services = useSelector((state) => state.services);

  return (
    <div className="footer-container">
      <div className="container">
        <div className="row">
          <div className="footer-items footer-useful-links col-md-2 col-6 col-lg-2 mb-3">
            <label>Useful Links</label>
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/about")}>About Us</button>
            <button>Blogs</button>
            <button onClick={() => navigate("/contact")}>Contact Us</button>
            <button onClick={() => navigate("/FAQs")}>FAQ's</button>
            <button>Terms & Conditions</button>
            <button>Privacy Policy</button>
          </div>

          {services && services?.length > 0 && (
            <div className="footer-items footer-services col-md-2 col-6 col-lg-2 mb-3">
              <label>Services</label>
              {services.map((service) => {
                return (
                  <button
                    key={`footer-${service.header}`}
                    onClick={() => navigate(`/services/${service.header}`)}
                  >
                    {service.header}
                  </button>
                );
              })}
            </div>
          )}

          <div className="footer-items footer-connect-with-us col-md-2 col-6 col-lg-2 mb-3">
            <label>Connect with us</label>
            <a
              className="footer-facebook"
              href="https://www.facebook.com/"
              target="_blank"
            >
              <img src={FBIcon}></img>
              <span>Facebook</span>
            </a>
            <a
              className="footer-twitter"
              href="https://twitter.com/"
              target="_blank"
            >
              <img src={TwitterIcon}></img>
              <span>Twitter</span>
            </a>
            <a
              className="footer-linkedin"
              href="https://www.linkedin.com/"
              target="_blank"
            >
              <img src={LinkedInIcon}></img>
              <span>Linkedin</span>
            </a>
            <a
              className="footer-instagram"
              href="https://www.instagram.com/"
              target="_blank"
            >
              <img src={InstaIcon}></img>
              <span>Instagram</span>
            </a>
          </div>
          <div className="footer-items footer-get-app col-md-3 col-6 col-lg-3 mb-3">
            <label>Get the App</label>
            <a
              className="footer-app-store d-flex align-items-center"
              href="https://play.google.com/"
              target="_blank"
            >
              <img src={AppleIcon}></img>
              <div className="d-flex text-wrapper flex-column align-items-start">
                <p className="text-white">Download on the</p>
                <span className="text-white">App Store</span>
              </div>
            </a>
            <a
              className="footer-play-store d-flex align-items-center"
              href="https://play.google.com/"
              target="_blank"
            >
              <img src={PlayStoreIcon}></img>
              <div className="d-flex text-wrapper flex-column align-items-start">
                <p className="text-white">Get it on</p>
                <span className="text-white">Google Play</span>
              </div>
            </a>
          </div>
          <div className="footer-items footer-copyright col-md-3 col-6 col-lg-3 mb-3">
            <div className="footer-logo">
              <img src={HeaderLogo} alt="Logo" />
              <p>madeurday</p>
            </div>
            <span>
              Copyright © 2020 MadeUrDay <br />
              All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
