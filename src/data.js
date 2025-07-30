import BottomHeaderSliderImage1 from "./assets/images/HomepageBanner/aus.webp";
import BottomHeaderSliderImage2 from "./assets/images/HomepageBanner/dubai.webp";
import BottomHeaderSliderImage3 from "./assets/images/HomepageBanner/eu.webp";
import BottomHeaderSliderImage4 from "./assets/images/HomepageBanner/ista.webp";
import BottomHeaderSliderImage5 from "./assets/images/HomepageBanner/sou-e-as.webp";
import BottomHeaderSliderImage6 from "./assets/images/HomepageBanner/swiss.webp";
import BottomHeaderSliderImage7 from "./assets/images/HomepageBanner/thai.webp";


export const BannerImgs = [
  BottomHeaderSliderImage1,
  BottomHeaderSliderImage2,
  BottomHeaderSliderImage3,
  BottomHeaderSliderImage4,
  BottomHeaderSliderImage5,
  BottomHeaderSliderImage6,
  BottomHeaderSliderImage7,
];

export const mobileNumberValidator = (value) => {
  let input = value.replace(/\D/g, "");
  if (input.length > 10) {
    input = input.slice(0, 10);
  }
  return input;
};

export const indianStatesAndUTs = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

