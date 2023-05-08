import React from "react";
import { customAxios } from "../utils/customAxios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await customAxios({
      method: "post",
      url: "/refresh"
    });
    setAuth(prev => {...prev, accessToken: response.data.access_token})
    return response.data.access_token
  };

  return refresh;
};

export default useRefreshToken;
