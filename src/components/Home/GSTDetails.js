import React, { useState } from "react";
import IndiaMap from "../../assets/images/map.svg";

const gstData = [
  {
    state: "Goa",
    tradeName: "UrSmartspoc - A Unit of B H & Company",
    GSTIN: "30ACIPH7450F1ZZ",
    pan: "ACIPH7450F",
    sacCode: "9985",
    address:
      "URSMARTSPOC A UNIT OF B H AND Co., N-66, Phase IV, Verna Industrial Estate Goa 403722",
    stateCode: "30",
  },
  {
    state: "Uttar Pradesh",
    tradeName: "UrSmartspoc - A Unit of B H & Company",
    GSTIN: "09ACIPH7450F1ZK",
    pan: "ACIPH7450F",
    sacCode: "9985",
    address:
      "URSMARTSPOC A UNIT OF B H AND Co., Desk No DW-0015, Alpha 10, Noida, D9 Sector 3, Noida, Gautambuddha Nagar, Uttar Pradesh, 201301",
    stateCode: "09",
  },
  {
    state: "Haryana",
    tradeName: "UrSmartspoc - A Unit of B H & Company",
    GSTIN: "06ACIPH7450F1ZQ",
    pan: "ACIPH7450F",
    sacCode: "9985",
    address:
      "URSMARTSPOC A UNIT OF B H AND Co , 7th Floor, 704, Palm Court, Mehruli, Sector 16, Gurugram, Gurugram, Haryana, 122007",
    stateCode: "06",
  },
  {
    state: "Karnataka",
    tradeName: "UrSmartspoc - A Unit of B H & Company",
    GSTIN: "29ACIPH7450F1ZI",
    pan: "ACIPH7450F",
    sacCode: "9985",
    address:
      "B & H COMPANY, 102 MELROSE APARTMENT, NEAR ST.MICHEAL SCHOOL, KESHWAPUR, HUBLI 580023.",
    stateCode: "29",
  },
  {
    state: "Maharashtra",
    tradeName: "UrSmartspoc - A Unit of B H & Company",
    GSTIN: "27ACIPH7450F1ZM",
    pan: "ACIPH7450F",
    sacCode: "9985",
    address:
      "B & H COMPANY, 3,305 JVM Florencia, Ghodbunder Road, Kasarvadavali, Thane, Maharashtra 400615",
    stateCode: "27",
  },
  {
    state: "Telangana",
    tradeName: "UrSmartspoc - A Unit of B H & Company",
    GSTIN: "36ACIPH7450F1ZN",
    pan: "ACIPH7450F",
    sacCode: "9985",
    address:
      "URSMARTSPOC A UNIT OF B H AND Co, Besides Ohri's Restaurant, 1st Floor, 103 A and B, May Fair Garden, Road Number 12, Banjara Hills, Hyderabad, Hyderabad, Telangana, 500034",
    stateCode: "36",
  },
  {
    state: "Bihar",
    tradeName: "UrSmartspoc - A Unit of B H & Company",
    GSTIN: "10ACIPH7450F1Z1",
    pan: "ACIPH7450F",
    sacCode: "9985",
    address:
      "URSMARTSPOC A UNIT OF B H AND Co , Work Studio co-Working, A/3 PC Colony Kankarbagh, Patna, Bihar- 800020",
    stateCode: "10",
  },
  {
    state: "Gujarat",
    tradeName: "UrSmartspoc - A Unit of B H & Company",
    GSTIN: "24ACIPH7450F1ZS",
    pan: "ACIPH7450F",
    sacCode: "9985",
    address:
      "URSMARTSPOC A UNIT OF B H AND Co., CORPHUB, Desk number; 656-D , A -WING 6TH FLOOR , B.D PATEL HOUSE , NARANPURA, Ahemdabad 380009",
    stateCode: "24",
  },
  {
    state: "Chandigarh",
    tradeName: "UrSmartspoc - A Unit of B H & Company",
    GSTIN: "04ACIPH7450F1ZU",
    pan: "ACIPH7450F",
    sacCode: "9985",
    address:
      "URSMARTSPOC A UNIT OF B H AND Co, WorkYard, Plot No 337, Phase, 2, Industrial Area Phase II, Chandigarh, 160002",
    stateCode: "04",
  },
  {
    state: "Kerala",
    tradeName: "UrSmartspoc - A Unit of B H & Company",
    GSTIN: "32ACIPH7450F1ZV",
    pan: "ACIPH7450F",
    sacCode: "9985",
    address:
      "URSMARTSPOC A UNIT OF B H AND Co  TC24/3088/2, Ushasandya Building, Dotspace Business Center, Kowdiar - Devasom Board Road, Kowdiar, Thiruvananthapuram, Thiruvananthapuram, Kerala, 695003",
    stateCode: "32",
  },
  {
    state: "Himachal Pradesh",
    tradeName: "UrSmartspoc - A Unit of B H & Company",
    GSTIN: "02ACIPH7450F1ZY",
    pan: "ACIPH7450F",
    sacCode: "9985",
    address:
      "URSMARTSPOC A UNIT OF B H AND Co , VPO Rakkar, TEHSIL DHARAMSHALA, Dharamshala, Kangra, Himachal Pradesh, 176057",
    stateCode: "02",
  },
  {
    state: "Tamil Nadu",
    tradeName: "UrSmartspoc - A Unit of B H & Company",
    GSTIN: "33ACIPH7450F1ZT",
    pan: "ACIPH7450F",
    sacCode: "9985",
    address:
      "URSMARTSPOC A UNIT OF B H AND CO, INNOV8 MILLENIA RMZ, MILLENIA BUSINESS PARK, CAMPUS 1A, NO.143, DR.M.G.R. ROAD, (NORTH VEERANAM SALAI), PERUNGUDI, SHOLINGANALLUR, CHENNAI, TAMIL NADU PIN CODE -600096",
    stateCode: "33",
  },
  {
    state: "Jharkhand",
    tradeName: "UrSmartspoc - A Unit of B H & Company",
    GSTIN: "20ACIPH7450F1Z0",
    pan: "ACIPH7450F",
    sacCode: "9985",
    address:
      "URSMARTSPOC A UNIT OF B H AND CO, 9th Floor, Mahavir Tower, Work Studio Coworking, Main Road, JD Corporate, Ranchi, Ranchi, Jharkhand PIN CODE -834001",
    stateCode: "20",
  },
  {
    state: "Rajasthan",
    tradeName: "UrSmartspoc - A Unit of B H & Company",
    GSTIN: "08ACIPH7450F1ZM",
    pan: "ACIPH7450F",
    sacCode: "9985",
    address:
      "URSMARTSPOC A UNIT OF B H AND CO, First Floor, Building No S-7, S-10, Geejgarh Tower, Hawa Sarak, Civil Lines, Jaipur District: Jaipur State: Rajasthan PIN CODE -302006",
    stateCode: "08",
  },
  {
    state: "Madhya Pradesh",
    tradeName: "UrSmartspoc - A Unit of B H & Company",
    GSTIN: "23ACIPH7450F1ZU",
    pan: "ACIPH7450F",
    sacCode: "9985",
    address:
      "URSMARTSPOC A UNIT OF B H AND CO, 4th Floor, Work Studio Coworking, Krishna Business Centre, Near Medanta Super Speciality Hospital, Ratna Lok Colony, Indore, Madhya Pradesh 452011",
    stateCode: "23",
  },
  {
    state: "Odisha",
    tradeName: "UrSmartspoc - A Unit of B H & Company",
    GSTIN: "21ACIPH7450F1ZY",
    pan: "ACIPH7450F",
    sacCode: "9985",
    address:
      "URSMARTSPOC A UNIT OF B H AND CO, Building No./Flat No.: Plot no 316, Name Of Premises/Building: District Center, Road/Street: Behind BPCL, Locality/Sub Locality: Chandra Shekharpur, City/Town/Village: Bhubaneswar, District: Khordha, PIN Code: 751016",
    stateCode: "21",
  },
];

const GSTDetails = () => {
  const [dialogContent, setDialogContent] = useState(gstData[0]);
  console.log("dialogContent", dialogContent);

  const handleHotspotClick = (data) => {
    setDialogContent(data);
  };

  return (
    <section className="gst-details-section bg">
      <div className="container">
        <h2 className="text-center">GST DETAILS</h2>

        <div className="d-lg-flex d-none justify-content-center gap-5">
          <div className="map-hotspots position-relative">
            <img src={IndiaMap} className="w-100" />
            {gstData.map((data) => {
              return (
                <button
                  key={data.GSTIN}
                  className={`position-absolute state ${data.state} ${
                    dialogContent.state == data.state ? "selected" : ""
                  }`}
                  data-state={data.state}
                  onClick={() => handleHotspotClick(data)}
                  title={data.state}
                ></button>
              );
            })}
          </div>

          <div className="state-data-container">
            {dialogContent != null && dialogContent && (
              <>
                <h3 className="text-center font-24">{dialogContent.state}</h3>
                <p className="font-20"><span className="font-bold">GSTIN: </span> {dialogContent.GSTIN}</p>
                <p className="font-20"><span className="font-bold">Address:</span> <span className="text-uppercase">{dialogContent.address}</span></p>
                <p className="font-20"><span className="font-bold">State Code:</span> {dialogContent.stateCode}</p>
              </>
            )}
          </div>
        </div>
        <div className="d-lg-none d-flex flex-column">
          <img src={IndiaMap} alt="india gst map" />
          <div class="accordion mb-5" id="gstStatesAccordion">
            {gstData.map((data) => {
              return (
                <div
                  class="accordion-item mb-2"
                  key={`mobile-gst-data-${data.GSTIN}`}
                >
                  <h3
                    class="accordion-header"
                    id={`state-heading-${data.GSTIN}`}
                  >
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#state-${data.GSTIN}`}
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      {data.state}
                    </button>
                  </h3>
                  <div
                    id={`state-${data.GSTIN}`}
                    class="accordion-collapse collapse"
                    aria-labelledby={`state-heading-${data.GSTIN}`}
                    data-bs-parent="#gstStatesAccordion"
                  >
                    <div class="accordion-body">
                      <p><span className="font-bold">GSTIN:</span> {data.GSTIN}</p>
                      <p><span className="font-bold">Address:</span> <span className="text-uppercase">{data.address}</span></p>
                      <p><span className="font-bold">State Code:</span> {data.stateCode}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-center fs-4">
          Currently registered for GST in 16 states & UT(s) and expanding
          rapidly to serve you better!
        </p>
      </div>
    </section>
  );
};

export default GSTDetails;
