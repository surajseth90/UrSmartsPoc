import Cookies from 'js-cookie';

const CUSTOMER_TOKEN_KEY = 'USS_CUSTOMER_TOKEN';
const ADMIN_TOKEN_KEY = 'USS_ADMIN_TOKEN';
 

export const setAdminToken = (token) => {
  Cookies.set(ADMIN_TOKEN_KEY, token);
};

export const getAdminToken = () => {
  return Cookies.get(ADMIN_TOKEN_KEY);
};

export const removeAdminToken = () => {
  Cookies.remove(ADMIN_TOKEN_KEY);
};

export const isAdminAuthenticated = () => {
  // Check if the token exists and is valid (e.g., not expired)
  const token = getAdminToken();
  return !!token; // Returns true if a valid token exists; otherwise, false
};

export const setCustomerToken = (token) => {
  Cookies.set(CUSTOMER_TOKEN_KEY, token);
};

export const getCustomerToken = () => {
  return Cookies.get(CUSTOMER_TOKEN_KEY);
};

export const removeCustomerToken = () => {
  Cookies.remove(CUSTOMER_TOKEN_KEY);
};

export const isCustomerAuthenticated = () => {
  // Check if the token exists and is valid (e.g., not expired)
  const token = getCustomerToken();
  return !!token; // Returns true if a valid token exists; otherwise, false
};