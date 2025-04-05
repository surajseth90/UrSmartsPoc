import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function RouteTemplate({ className, children }) {
  return (
    <div className={className}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
