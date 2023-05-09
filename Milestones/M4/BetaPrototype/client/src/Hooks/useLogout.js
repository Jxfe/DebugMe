import { customAxios } from "../utils/customAxios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth, setPersist } = useAuth();

  const logout = async () => {
    setAuth({});
    // setPersist(false);
    // localStorage.setItem("persist", false);
    try {
      const response = await customAxios({
        method: "post",
        url: "/api/logout"
      });
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
