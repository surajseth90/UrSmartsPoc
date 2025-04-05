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
