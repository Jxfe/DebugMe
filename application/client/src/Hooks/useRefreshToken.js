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

    const userID = whoami.data.user_id;
    const username = whoami.data.username;
    const email = whoami.data.email;
    const userRank = whoami.data.userRank;
    const roles = whoami.data.roles;
    const bio = whoami.data.bio;
    const imagePath = whoami.data.image_path;

    const accessToken = response.data.access_token;
    setAuth({
      userID,
      username,
      email,
      userRank,
      roles,
      accessToken,
      bio,
      imagePath
    });

    return response.data.access_token;
  };

  return refresh;
};

export default useRefreshToken;
