import { getAdminToken, getCustomerToken } from "./session";

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

export const scrollToTop = () => {
  const element = document.querySelector("main");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export const generateCredentials = (email, password) => {
  return btoa(`${email}:${password}`);
};

export const generateHeader = () => {
  let credentials = window.location.href.includes("customer")
    ? getCustomerToken()
    : getAdminToken();
  return {
    Authorization: `Basic ${credentials}`,
    "Content-Type": "application/json",
  };
};
