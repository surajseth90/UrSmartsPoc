import React from "react";
import Header from "../Header";
import Navbar from "../Navbar";
import "./style.scss";

export default function ({ className, children }) {
  return (
    <div className="admin-panel">
      <Header />
      <div className="main-wrapper d-flex">
        <Navbar />
        <main className={`admin-main m-3 overflow-auto w-100 ${className}`}>{children}</main>
      </div>
    </div>
  );
}
