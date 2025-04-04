import React, { useState } from "react";
import IndiaMap from "../../assets/images/india_map.svg";

const GSTDetails = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");

  // This would contain the actual content for each hotspot
  const hotspotDetails = {
    hotspot1: "Detailed information about the first point...",
    hotspot2: "Detailed explanation of the second point...",
    // Add more as needed
  };

  const handleHotspotClick = (hotspotKey) => {
    setDialogContent(hotspotDetails[hotspotKey] || "No information available");
    setIsDialogOpen(true);
  };

  return (
    <section className="gst-details-section">
      <div className="container">
        <h2 className="text-white text-center">GST DETAILS</h2>

        <div className="d-flex justify-content-center">
          <div className="map-hotspots w-100 position-relative">
            <button className="position-absolute hotspot-1">
              <div className="dialog-overlay position-relative">
                <div className="dialog-content">
                  {/* <div className="dialog-body">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div> */}
                </div>
              </div>
            </button>
            <button className="position-absolute hotspot-2"></button>
            <button className="position-absolute hotspot-3"></button>
            <button className="position-absolute hotspot-4"></button>
            <button className="position-absolute hotspot-5"></button>
          </div>
        </div>

        <p className="text-white text-center fs-4">
        Currently registered for GST in 16 states & UT(s) and expanding rapidly to serve you better! 
        </p>
      </div>
    </section>
  );
};

export default GSTDetails;
