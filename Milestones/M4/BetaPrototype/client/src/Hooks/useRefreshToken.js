import React from "react";
import { customAxios } from "../utils/customAxios";
//import axios from "axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await customAxios({
      method: "post",
      url: "/api/refresh"
    });

    const whoami = await customAxios({
      method: "get",
      url: "/api/whoami"
    });

    const username = whoami.data.username;
    const email = whoami.data.email;
    const userRank = whoami.data.userRank;
    const roles = whoami.data.roles;
    const accessToken = response.data.access_token;
    setAuth({ username, email, userRank, roles, accessToken });

    return response.data.access_token;
  };

  return refresh;
};

export default useRefreshToken;
