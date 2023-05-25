import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../../utils/customAxios";
import AuthContext from "../../Context/AuthProvider";
import Button from "../../Components/Button";

function Profile() {
  const navigator = useNavigate();
  const { auth } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    userRank: "",
    bio: "",
    image_path: ""
  });
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [canEditName, setCanEditName] = useState(false);
  const [canEditBio, setCanEditBio] = useState(false);
  const [image, setImage] = useState(null);

  // Fetches the user's profile data
  const fetchProfile = async () => {
    try {
      const response = await customAxios.get("/api/whoami", {});
      const data = response.data;
      setProfile({
        name: data.username,
        email: data.email,
        userRank: mapRankToRole(data.userRank),
        bio: data.bio,
        image_path: data.image_path
      });
      setName(data.username);
      setBio(data.bio);
      if (data.image_path) {
        setProfilePic(data.image_path)
      } else {
        setProfilePic("/logo.png")
      }
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
      4: "Admin"
    };
    return roles[rank];
  };

  // Handles name edit
  const handleNameEdit = async () => {
    try {
      const response = await customAxios({
        method: "post",
        url: "/api/editProfileName",
        data: {
          newName: name
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      setCanEditName(false);
    } catch (error) {
      console.error("Error editing profile name", error);
    }
  };

  // Handles bio edit
  const handleBioEdit = async () => {
    console.log('??')
    try {
      const response = await customAxios({
        method: "post",
        url: "/api/editProfileBio",
        data: {
          //newName: editedProfile.newName,
          newBio: bio
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      setCanEditBio(false);
    } catch (error) {
      console.error("Error editing profile name", error);
    }
  };

  // Handles image edit
  const handleImageSubmit = async () => {
    try {
      const response = await customAxios({
        method: "post",
        url: "/api/editProfileImage",
        data: {
          newImagePath: image
        },
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      window.location.reload();
    } catch (error) {
      console.error("Error editing profile picture", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 6 * 1024 * 1024; // 6 MB in bytes
    const validFileTypes = ["image/png", "image/jpeg", "image/jpg"];

    // If file size is greater than the max size or file type is not valid, alert the user and do not set the file
    if (file.size > maxSize || !validFileTypes.includes(file.type)) {
      alert(
        "File size exceeds 6MB or the file type is not supported. Please select another image."
      );
      return;
    }

    // If file size and type are valid, set the file
    setImage(file);
  };

  const becomePremium = async () => {
    try {
      const response = await customAxios({
        method: "PUT",
        url: "/api/becomepremium"
      });

      if (response.status === 200) {
        setProfile((prevState) => ({
          ...prevState,
          userRank: "Premium"
        }));
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error upgrading to premium:", error);
    }
  };

  const removePremium = async () => {
    try {
      const response = await customAxios({
        method: "PUT",
        url: "/api/removepremium"
      });

      if (response.status === 200) {
        setProfile((prevState) => ({
          ...prevState,
          userRank: "Basic"
        }));
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error removing premium:", error);
    }
  };

  const deleteAccount = async () => {
    await customAxios({
      method: "delete",
      url: "/api/deleteaccount"
    })
      .then((response) => {
        customAxios({
          method: "post",
          url: "/api/logout"
        });

        return response;
      })
      .then((response) => {
        alert("Your account has been deleted");
        window.location.reload();
        navigator("/");
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="mypage-profile-container">
      <div className="mypage-profile">
        <h1>Profile</h1>
      </div>
      <div
        className="mypage-profile"
        style={{ display: "flex", alignItems: "center", gap: "20px" }}
      >
        <div>
          <img src={profilePic} className="mypage-profilepic"></img>
          <input
            type="file"
            id="imageUpload"
            name="imageUpload"
            accept=".png, .jpg, .jpeg"
            onChange={handleImageChange}
          />
          <Button
              className="default-button"
              content="Upload Image"
              onClickEvent={handleImageSubmit}
            />
        </div>
      </div>
      <div
        className="mypage-profile"
        style={{ display: "flex", alignItems: "center", gap: "20px" }}
      >
        <p className="personalinfo-field-head">Name: </p>
        {
          !canEditName ?
            <div style={{ width: "200px" }}>
              {name}
            </div>
            :
            <input
              style={{ width: "200px" }}
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
        }

        {
          canEditName ?
            <Button
              className="default-button"
              content="Update"
              onClickEvent={handleNameEdit}
            />
            :
            <Button
              className="default-button"
              content="Edit"
              onClickEvent={() => setCanEditName(true)}
            />
        }

      </div>
      <div
        className="mypage-profile"
        style={{ display: "flex", alignItems: "center", gap: "20px" }}
      >
        <p className="personalinfo-field-head">Bio: </p>
        {
          !canEditBio ?
            <div style={{ width: "600px" }}>
              {bio ? bio : "You have not created a Bio yet"}
            </div>
            :
            <input
              style={{ width: "600px" }}
              type="text"
              value={bio}
              placeholder="Write your bio"
              onChange={(e) =>
                setBio(e.target.value)
              }
            />
        }

        {
        canEditBio ?
          <Button
            className="default-button"
            content="Update"
            onClickEvent={handleBioEdit}
          />
          :
          <Button
            className="default-button"
            content="Edit"
            onClickEvent={() => setCanEditBio(true)}
          />
      }
      </div>
      
      <div
        style={{
          display: "flex",
          gap: "40px",
          alignItems: "center",
          marginTop: "15px",
          paddingBottom: "10px",
          borderBottom: "1px solid black"
        }}
      >
        <p className="personalinfo-field-head">Email</p>
        <p>{profile.email}</p>
      </div>
      <div style={{paddingTop:"10px"}}>
        <p className="personalinfo-field-head" style={{ textAlign: "left" }}>
          Subscription Plan
        </p>
        <div style={{ display: "flex", gap: "40px" }}>
          <p>{profile.userRank}</p>
          {profile.userRank === "Basic" && (
            <button className="default-button" onClick={becomePremium}>
              Upgrade to Premium
            </button>
          )}
          {profile.userRank === "Premium" && (
            <button
              className="default-button"
              style={{ borderRadius: "12px" }}
              onClick={removePremium}
            >
              Remove Premium
            </button>
          )}
          {profile.userRank === "Mentor" && (
            <Button
              className="delete-acct-btn"
              onClickEvent={becomePremium}
              content="Upgrade to Premium"
            />
          )}
          {profile.userRank === "Premium_mentor" && (
            <Button
              className="delete-button"
              onClickEvent={removePremium}
              content="Remove Premium"
            />
          )}
        </div>
      </div>
      <div style={{ marginTop: "40px" }}>
        <Button
          className="delete-acct-btn"
          onClickEvent={deleteAccount}
          content="Delete Account"
        />
      </div>
    </div>
  );
}

export default Profile;
