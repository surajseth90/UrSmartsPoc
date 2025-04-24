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
