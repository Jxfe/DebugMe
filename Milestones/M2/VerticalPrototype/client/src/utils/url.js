const API_URL =
  document.location.hostname === "127.0.0.1" ||
  document.location.hostname === "localhost"
    ? "http://127.0.0.1:5000/"
    : "http://52.41.50.55:5000/";

export const SEARCH_URL = `${API_URL}search/`;
export const POST_URL = `${API_URL}posts/`;
