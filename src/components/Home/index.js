import React, { useEffect } from "react";
import "./style.scss";

import OurServicesSection from "./OurServicesSection.js";
import GlobalPresence from "./GlobalPresence.js";
import OurStories from "./OurStories.js";
import Testimonial from "./Testimonial.js";
import GSTDetails from "./GSTDetails.js";
import ContentSection from "./ContentSection.js";
import TopBanner from "./TopBanner.js";
import { useLocation } from "react-router-dom";
import SectionWrapper from "./SectionWrapper.js"; // adjust path
import EasySupport from "./EasySupport.js"
export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <div className="home-page-wrapper bg">
        <SectionWrapper>
          <TopBanner />
        </SectionWrapper>
        {/* <ContentSection /> */}
        <SectionWrapper>
          <OurServicesSection />
        </SectionWrapper>

        <SectionWrapper>
          <OurStories />
        </SectionWrapper>

         <SectionWrapper>
          <EasySupport />
        </SectionWrapper>

        <SectionWrapper>
          <Testimonial />
        </SectionWrapper>

        <SectionWrapper>
          <GSTDetails />
        </SectionWrapper>

        <SectionWrapper>
          <GlobalPresence />
        </SectionWrapper>

      </div>
    </>
  );
}
