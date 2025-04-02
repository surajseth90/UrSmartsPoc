import React from "react";
import "./style.scss";
import HeaderLogo from "../../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MapImg from "../../assets/images/map.svg";

export default function Footer() {
  const navigate = useNavigate();
  const services = useSelector((state) => state.services);

  return (
    <footer className="footer-container w-100">
      <div className="container">
        <div className="row">
          <div className="d-flex col-md-6 col-6 col-lg-12 mb-3">
            <img
              src={HeaderLogo}
              style={{ maxWidth: "165px", marginBottom: "10px" }}
            />
          </div>

          <div className="footer-map-col d-flex mb-3 align-items-start col-md-2 col-6 col-lg-6">
            <button>
              <img src={MapImg} />
            </button>

            <div className="d-flex flex-column" style={{ maxWidth: "256px" }}>
              <h5>Corporate Office</h5>

              <p className="mt-4">
                Social CoWorking Spaces Community, A UNIT OF B H @ CO, 3rd Floor
                305, Site no. 34 35 39 40, Horamavu Main Road,
                <br /> Above KFC, Outer Ring Road, Bansawadi, Bangalore – 560043
              </p>

              <p className="mt-3">GST NO - 29ACIPH7450F1ZI</p>

              <a href="mailto:travel@ursmartspoc.com" className="mt-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M11.8721 12.5869C11.6143 12.5869 11.3506 12.4697 11.0811 12.2354L2.25684 4.4043C2.72559 4.13477 3.2998 4 3.97949 4H19.7734C20.4531 4 21.0244 4.13477 21.4873 4.4043L12.6631 12.2354C12.3994 12.4697 12.1357 12.5869 11.8721 12.5869ZM1.21973 17.9834C1.14941 17.8076 1.09375 17.6143 1.05273 17.4033C1.01758 17.1865 1 16.9434 1 16.6738V6.95312C1 6.66016 1.02051 6.40234 1.06152 6.17969C1.10254 5.95117 1.15527 5.77246 1.21973 5.64355L7.75879 11.4531L1.21973 17.9834ZM3.78613 19.627C3.46973 19.627 3.17969 19.5918 2.91602 19.5215C2.6582 19.457 2.43848 19.3691 2.25684 19.2578L8.98926 12.5342L10.1318 13.5449C10.4131 13.7969 10.6943 13.9844 10.9756 14.1074C11.2627 14.2246 11.5615 14.2832 11.8721 14.2832C12.1826 14.2832 12.4814 14.2246 12.7686 14.1074C13.0557 13.9844 13.3428 13.7969 13.6299 13.5449L14.7637 12.5342L21.4961 19.2578C21.3145 19.3691 21.0918 19.457 20.8281 19.5215C20.5703 19.5918 20.2832 19.627 19.9668 19.627H3.78613ZM22.5332 17.9834L15.9941 11.4531L22.5332 5.64355C22.5918 5.77246 22.6416 5.95117 22.6826 6.17969C22.7295 6.40234 22.7529 6.66016 22.7529 6.95312V16.6738C22.7529 16.9434 22.7324 17.1865 22.6914 17.4033C22.6504 17.6143 22.5977 17.8076 22.5332 17.9834Z"
                    fill="black"
                  />
                </svg>
                <span className="ms-2">travel@ursmartspoc.com</span>
              </a>

              <a href="tel:+91 9845094478" className="mt-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M8.64062 16.1729C7.76172 15.2998 6.9707 14.3799 6.26758 13.4131C5.57031 12.4463 5.0166 11.4854 4.60645 10.5303C4.20215 9.56934 4 8.65234 4 7.7793C4 7.20508 4.10254 6.66309 4.30762 6.15332C4.5127 5.64355 4.83789 5.18066 5.2832 4.76465C5.81641 4.25488 6.39062 4 7.00586 4C7.26367 4 7.50684 4.05273 7.73535 4.1582C7.96973 4.26367 8.16895 4.43359 8.33301 4.66797L10.2402 7.34863C10.4043 7.56543 10.5215 7.76758 10.5918 7.95508C10.6621 8.13672 10.6973 8.30664 10.6973 8.46484C10.6973 8.67578 10.6387 8.87793 10.5215 9.07129C10.4102 9.26465 10.2549 9.46387 10.0557 9.66895L9.41406 10.3193C9.32617 10.4131 9.28223 10.5244 9.28223 10.6533C9.28223 10.7236 9.29102 10.791 9.30859 10.8555C9.33203 10.9199 9.35547 10.9756 9.37891 11.0225C9.53125 11.3037 9.79492 11.6641 10.1699 12.1035C10.5449 12.5371 10.9521 12.9766 11.3916 13.4219C11.8311 13.8672 12.2705 14.2773 12.71 14.6523C13.1494 15.0215 13.5098 15.2822 13.791 15.4346C13.8379 15.458 13.8936 15.4814 13.958 15.5049C14.0225 15.5283 14.0898 15.54 14.1602 15.54C14.3008 15.54 14.415 15.4932 14.5029 15.3994L15.1445 14.7578C15.3496 14.5527 15.5488 14.3945 15.7422 14.2832C15.9355 14.1719 16.1348 14.1162 16.3398 14.1162C16.5039 14.1162 16.6768 14.1543 16.8584 14.2305C17.04 14.3008 17.2393 14.4121 17.4561 14.5645L20.1719 16.4893C20.4004 16.6533 20.5645 16.8467 20.6641 17.0693C20.7695 17.292 20.8223 17.5293 20.8223 17.7812C20.8223 18.0801 20.7549 18.3789 20.6201 18.6777C20.4854 18.9766 20.2979 19.2578 20.0576 19.5215C19.6475 19.9785 19.1904 20.3096 18.6865 20.5146C18.1826 20.7256 17.6377 20.8311 17.0518 20.8311C16.1904 20.8311 15.2764 20.626 14.3096 20.2158C13.3428 19.8057 12.373 19.249 11.4004 18.5459C10.4336 17.8428 9.51367 17.0518 8.64062 16.1729Z"
                    fill="black"
                  />
                </svg>
                <span className="ms-2">+91 9845094478</span>
              </a>
              <a href="tel:+91 9582241179" className="mt-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M8.64062 16.1729C7.76172 15.2998 6.9707 14.3799 6.26758 13.4131C5.57031 12.4463 5.0166 11.4854 4.60645 10.5303C4.20215 9.56934 4 8.65234 4 7.7793C4 7.20508 4.10254 6.66309 4.30762 6.15332C4.5127 5.64355 4.83789 5.18066 5.2832 4.76465C5.81641 4.25488 6.39062 4 7.00586 4C7.26367 4 7.50684 4.05273 7.73535 4.1582C7.96973 4.26367 8.16895 4.43359 8.33301 4.66797L10.2402 7.34863C10.4043 7.56543 10.5215 7.76758 10.5918 7.95508C10.6621 8.13672 10.6973 8.30664 10.6973 8.46484C10.6973 8.67578 10.6387 8.87793 10.5215 9.07129C10.4102 9.26465 10.2549 9.46387 10.0557 9.66895L9.41406 10.3193C9.32617 10.4131 9.28223 10.5244 9.28223 10.6533C9.28223 10.7236 9.29102 10.791 9.30859 10.8555C9.33203 10.9199 9.35547 10.9756 9.37891 11.0225C9.53125 11.3037 9.79492 11.6641 10.1699 12.1035C10.5449 12.5371 10.9521 12.9766 11.3916 13.4219C11.8311 13.8672 12.2705 14.2773 12.71 14.6523C13.1494 15.0215 13.5098 15.2822 13.791 15.4346C13.8379 15.458 13.8936 15.4814 13.958 15.5049C14.0225 15.5283 14.0898 15.54 14.1602 15.54C14.3008 15.54 14.415 15.4932 14.5029 15.3994L15.1445 14.7578C15.3496 14.5527 15.5488 14.3945 15.7422 14.2832C15.9355 14.1719 16.1348 14.1162 16.3398 14.1162C16.5039 14.1162 16.6768 14.1543 16.8584 14.2305C17.04 14.3008 17.2393 14.4121 17.4561 14.5645L20.1719 16.4893C20.4004 16.6533 20.5645 16.8467 20.6641 17.0693C20.7695 17.292 20.8223 17.5293 20.8223 17.7812C20.8223 18.0801 20.7549 18.3789 20.6201 18.6777C20.4854 18.9766 20.2979 19.2578 20.0576 19.5215C19.6475 19.9785 19.1904 20.3096 18.6865 20.5146C18.1826 20.7256 17.6377 20.8311 17.0518 20.8311C16.1904 20.8311 15.2764 20.626 14.3096 20.2158C13.3428 19.8057 12.373 19.249 11.4004 18.5459C10.4336 17.8428 9.51367 17.0518 8.64062 16.1729Z"
                    fill="black"
                  />
                </svg>
                <span className="ms-2">+91 9582241179</span>
              </a>
            </div>
          </div>

          <div className="d-flex flex-column col-md-2 col-6 col-lg-2 mb-3">
            <h5 className="text-uppercase mb-4">service destinations</h5>
            <button className="mb-2 text-start">India</button>
            <button className="mb-2 text-start">Los angels</button>
            <button className="mb-2 text-start">New York</button>
            <button className="mb-2 text-start">Russia</button>
            <button className="mb-2 text-start">Japan</button>
          </div>

          <div className="d-flex flex-column col-md-2 col-6 col-lg-2 mb-3">
            <h5 className="text-uppercase mb-4">Travel interests</h5>
            <button className="mb-2 text-start">Adventure</button>
            <button className="mb-2 text-start">Culture & Arts</button>
            <button className="mb-2 text-start">Beaches</button>
            <button className="mb-2 text-start">Mountains</button>
            <button className="mb-2 text-start">Forest</button>
          </div>

          <div className="d-flex flex-column col-md-2 col-6 col-lg-2 mb-3">
            <h5 className="text-uppercase mb-4">About us</h5>
            <button className="mb-2 text-start">Sales</button>
            <button className="mb-2 text-start">Support</button>
            <button className="mb-2 text-start">Press release</button>
            <button className="mb-2 text-start">Career</button>
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button className="want-to-reach-btn">WANT US TO REACH OUT</button>
        </div>
      </div>
      <div className="footer-bottom bg d-flex justify-content-end">
        <p className="text-uppercase">© 2025 URSMARTSPOC. All Rights Reserved </p>
      </div>
    </footer>
  );
}
