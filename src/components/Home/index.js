import React, { useEffect, useState, Suspense } from "react";
import "./style.scss";

import OurServicesSection from "./OurServicesSection.js";
import GlobalPresence from "./GlobalPresence.js";
import OurStories from "./OurStories.js";
import Testimonial from "./Testimonial.js";
import GSTDetails from "./GSTDetails.js";
import ContentSection from "./ContentSection.js";
import TopBanner from "./TopBanner.js";

export default function Home() {
  return (
    <>
      <div className="home-page-wrapper">
        <TopBanner />
        <ContentSection />
        <OurServicesSection />
        <OurStories />
        <Testimonial />
        <GSTDetails />
        <GlobalPresence />
      </div>
    </>
  );
}
