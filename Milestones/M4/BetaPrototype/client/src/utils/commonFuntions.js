// This function sets a key-value pair in local storage
export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

// This function return a value from local storage based on the given key
export const getLocalStorage = (key) => {
  return localStorage.getItem(key);
};

// This function removes a key-value pair from local storage based on the given key
export const deleteLocalStorage = (key) => {
  localStorage.removeItem(key);
};

// This function retrieves the CSRF token from the cookie (If user is logged in)
export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};
