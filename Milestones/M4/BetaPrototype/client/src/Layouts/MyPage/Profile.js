import React, { useState, useEffect, useContext } from "react";
import { customAxios } from "../../utils/customAxios";
import AuthContext from "../../Context/AuthProvider";
import Button from "../../Components/Button";

function Profile() {
  const { auth } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    userRank: "",
  });

  const fetchProfile = async () => {
    try {
      const response = await customAxios.get("/api/whoami", {
      });
      const data = response.data;
      setProfile({
        name: data.username,
        email: data.email,
        userRank: mapRankToRole(data.userRank),
      });
    } catch (error) {
      console.error("Error fetching profile data", error);
    }
  };

  const mapRankToRole = (rank) => {
    const roles = {
      0: "Basic",
      1: "Premium",
      2: "Mentor",
      3: "Premium_mentor",
      4: "Admin",
    };
    return roles[rank];
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <div className="mypage-profile">
        <p className="personalinfo-field-head">Name</p>
        <div style={{ display: "flex", gap: "40px" }}>
          <p>{profile.name}</p>
          <Button
            className="default-button"
            content="Edit"
          />
        </div>
      </div>
      <div className="mypage-profile">
        <p className="personalinfo-field-head">Bio</p>
        <div style={{ display: "flex", gap: "40px" }}>
          <p>{profile.name}</p>
          <Button
            className="default-button"
            content="Edit"
          />
        </div>
      </div>
      <div>
        <p className="personalinfo-field-head">Email</p>
        <p>{profile.email}</p>
      </div>
      <div>
        <p className="personalinfo-field-head">Subscription Plan</p>
        <div style={{ display: "flex", gap: "40px" }}>
          <p>{profile.userRank}</p>
          {
            profile.userRank === 0 &&
            <Button
              width="200px"
              className="default-button"
              content="Upgrade to Premium"
            />
          }
        </div>
      </div>
    </div>
  );
}

export default Profile;
