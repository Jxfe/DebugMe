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


  useEffect(() => {
    fetchProfile();
  }, []);

return (
    <div>
      <h1>Profile</h1>
        <div className="mypage-profile">
            <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
              <img
                src={profile.image_path}
                alt="User"
                className="user-image"
              />
              <input
                type="text"
                value={editedProfile.newImagePath}
                onChange={(e) =>
                  setEditedProfile({ ...editedProfile, newImagePath: e.target.value })
                }
              />
              <Button
                className="default-button"
                content="Save"
                onClick={handleImageEdit}
              />
            </div>
        </div>
      <div className="mypage-profile">
        <p className="personalinfo-field-head">Name</p>
        <div style={{ display: "flex", gap: "40px" }}>
          <p>{profile.name}</p>
          <Button
            className="default-button"
            content="Edit"
            onClick={handleNameEdit}
          />
          <input
            type="text"
            value={editedProfile.newName}
            onChange={(e) =>
              setEditedProfile({ ...editedProfile, newName: e.target.value })
            }
          />
        </div>
      </div>
      <div className="mypage-profile">
        <p className="personalinfo-field-head">Bio</p>
        <div style={{ display: "flex", gap: "40px" }}>
          <p>{profile.bio}</p>
          <Button
            className="default-button"
            content="Edit"
            onClick={handleBioEdit}
          />
          <input
            type="text"
            value={editedProfile.newBio}
            onChange={(e) =>
              setEditedProfile({ ...editedProfile, newBio: e.target.value })
            }
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
