import { customAxios } from "../utils/customAxios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      const response = await customAxios({
        method: "post",
        url: "/api/logout",
        withCredentials: true
      });
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
