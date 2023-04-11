const API_URL =
  document.location.hostname === "127.0.0.1" ||
  document.location.hostname === "localhost"
    ? "http://127.0.0.1:5000/"
    : "http://35.93.49.231:5000/";

export const POST_URL = `${API_URL}post/`;
