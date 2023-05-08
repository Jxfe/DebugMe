import axios from "axios";
import { getCookie } from "./commonFuntions";

export const customAxios = axios.create({
  withCredentials: true
});
