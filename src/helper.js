import { baseURL } from "./config";

export function debounce(func, delay, timeoutId) {
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export const getCallByRequest = async (request) => {
  const url = getFetchEndPoint(request);
  if (url === "") {
    console.log("url not found");
    return;
  }

  const data = await getCallByURL(url);
  return data;
};

export const getCallByURL = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (err) {
    throw new Error("Something went wrong! - ", err);
  }
};

export const postCallByRequest = async (request, body, config = {}) => {
  const url = getFetchEndPoint(request);
  if (url === "") {
    console.log("url not found");
    return;
  }

  const data = await postCallByURL(url, body, config);
  return data;
};

export const postCallByURL = async (url, body, config = {}) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      ...config,
    });
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error("Something went wrong! - ", err);
  }
};

const getFetchEndPoint = (type) => {
  let url = "";
  let trimedValue = type.replace(/\s/g, "").toLowerCase();
  switch (trimedValue) {
    case "service":
      url = `${baseURL}/mud-services/fetch/service`;
      break;

    // ---------------helpers

    case "top-helpers":
      url = `${baseURL}/mud-services/fetch/top/helpers`;
      break;

    case "helpers-with-filters":
      url = `${baseURL}/mud-services/fetch/helper/list/filter`;
      break;

    case "get-helper-profile":
      url = `${baseURL}/mud-services/fetch/helper/details`;
      break;

    // ---------------authentication
    case "login":
      url = `${baseURL}/oauth/user/login`;
      break;

    case "verify-otp":
      url = `${baseURL}/oauth/verify/otp`;
      break;

    case "resend-otp":
      url = `${baseURL}/oauth/resend/otp`;
      break;

    // ---------------profile and addresses

    case "fetch-profile":
      url = `${baseURL}/oauth/user/profile/details`;
      break;
    case "update-profile":
      url = `${baseURL}/oauth/user/profile/update`;
      break;

    case "fetch-addresses":
      url = `${baseURL}/oauth/user/address/fetchall`;
      break;
    default:
      url = "";
      break;
  }

  return url;
};
