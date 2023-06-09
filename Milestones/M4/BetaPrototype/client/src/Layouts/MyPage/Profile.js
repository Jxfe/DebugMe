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
    bio: "",
    image_path: "",
  });

  // Fetches the user's profile data
  const fetchProfile = async () => {
    try {
      const response = await customAxios.get("/api/whoami", {
      });
      const data = response.data;
      setProfile({
        name: data.username,
        email: data.email,
        userRank: mapRankToRole(data.userRank),
        bio: data.bio,
        image_path: data.image_path
      });
    } catch (error) {
      console.error("Error fetching profile data", error);
    }
  };

  // Maps user rank to role
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


  // State for edited profile data
  const [editedProfile, setEditedProfile] = useState({
    newName: "",
    newBio: "",
    newImagePath: ""
  });

  // Handles name edit
  const handleNameEdit = async () => {
    try {
      const response = await customAxios({
        method: "post",
        url: "/api/editProfileName",
        data: {
          newName: editedProfile.newName,

        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      const data = response.data;

    } catch (error) {

      console.error("Error editing profile name", error);
    }
  };

  // Handles bio edit
  const handleBioEdit = async () => {
    try {
      const response = await customAxios({
        method: "post",
        url: "/api/editProfileBio",
        data: {
          //newName: editedProfile.newName,
          newBio: editedProfile.newBio
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      const data = response.data;


    } catch (error) {

      console.error("Error editing profile name", error);
    }
  };

  // Handles image edit
  const handleImageEdit = async () => {
    try {
      const response = await customAxios({
        method: "post",
        url: "/api/editProfileImage",
        data: {
          newImagePath: editedProfile.newImagePath
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      const data = response.data;


    } catch (error) {

      console.error("Error editing profile name", error);
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



  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      <div className="mypage-profile">
        <h1 >Profile</h1>
      </div>
      {/* <div style={{ display: "flex", gap: "40px" }} >
        <input
          style={{ width: "150px" }}
          type="text"
          value={editedProfile.newImagePath}
          onChange={(e) =>
            setEditedProfile({ ...editedProfile, newImagePath: e.target.value })
          }
        />
        <Button
          className="default-button"
          content="Update Image"
          onClick={handleImageEdit}
        />
      </div> */}

      <div className="mypage-profile" style={{ display: "flex", alignItems: "left", gap: "20px", }}>

        <p className="personalinfo-field-head">Name:</p>
        <div style={{ display: "flex", gap: "40px", alignItems: "left", marginTop: "15px" }}>
          <p>{profile.name}</p>
          <input
            style={{ width: "200px", hight: "50px" }}
            type="text"
            value={editedProfile.newName}
            onChange={(e) =>
              setEditedProfile({ ...editedProfile, newName: e.target.value })
            }
          />
          <Button
            className="default-button"
            content="Edit"
            onClick={handleNameEdit}
          />

        </div>




      </div>
      <div className="mypage-profile" style={{ display: "flex", alignItems: "left", gap: "20px", }}>
        <p className="personalinfo-field-head">Bio:</p>
        <div style={{ display: "flex", gap: "40px", alignItems: "left", marginTop: "15px" }}>
          <p>{profile.bio}</p>
        </div>


      </div>
      <div >
        <input
          style={{ width: "400px", }}
          type="text"
          value={editedProfile.newBio}
          onChange={(e) =>
            setEditedProfile({ ...editedProfile, newBio: e.target.value })
          }
        />
        <Button
          className="default-button"
          content="Edit"
          onClick={handleBioEdit}
        />

      </div>
      <div style={{ display: "flex", gap: "40px", alignItems: "center", marginTop: "15px" }}>
        <p className="personalinfo-field-head" >Email</p>
        <p>{profile.email}</p>
      </div>
      <div>
        <p className="personalinfo-field-head" style={{ textAlign: "left" }}>Subscription Plan</p>
        <div style={{ display: "flex", gap: "40px" }}>
          <p>{profile.userRank}</p>
          {
            profile.userRank === "Basic" && (
              <button className="default-button" onClick={becomePremium}>Upgrade to Premium</button>
            )
          }
          {
            profile.userRank === "Premium" && (
              <button className="default-button" style={{ borderRadius: "12px" }} onClick={removePremium}>Remove Premium</button>
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
