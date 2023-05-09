import axios from "axios";
import { getCookie } from "./commonFuntions";

export const customAxios = axios.create({
  headers: {
    "X-CSRF-TOKEN": getCookie("csrf_refresh_token")
  },
  withCredentials: true
});
