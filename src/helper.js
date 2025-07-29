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

export const generateHeader = (e, p) => {
  let email = e || "admin@sys.com";
  let password = p || "admin123";
  const credentials = btoa(`${email}:${password}`); // btoa = base64 encode

  return {
    Authorization: `Basic ${credentials}`, // this is common for basic auth
    "Content-Type": "application/json",
  };
};
