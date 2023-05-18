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

  const becomePremium = async () => {
    try {
      const response = await customAxios({
        method: 'PUT',
        url: '/api/becomepremium',
      });
  
      if (response.status === 200) {
        setProfile(prevState => ({
          ...prevState,
          userRank: "Premium"
        }));
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error upgrading to premium:', error);
    }
  };
  
  const removePremium = async () => {
    try {
      const response = await customAxios({
        method: 'PUT',
        url: '/api/removepremium',
      });
  
      if (response.status === 200) {
        setProfile(prevState => ({
          ...prevState,
          userRank: "Basic"
        }));
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error removing premium:', error);
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
            profile.userRank === "Basic" && (
              <button className="default-button" onClick={becomePremium}>Upgrade to Premium</button>
            )
          }
          {
            profile.userRank === "Premium" && (
              <button className="default-button" onClick={removePremium}>Remove Premium</button>
            )
          }
          {
            profile.userRank === "Mentor" && (
              <button className="default-button" onClick={becomePremium}>Upgrade to Premium</button>
            )
          }
          {
            profile.userRank === "Premium_mentor" && (
              <button className="default-button" onClick={removePremium}>Remove Premium</button>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Profile;
