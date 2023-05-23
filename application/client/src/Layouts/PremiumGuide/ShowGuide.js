import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { customAxios } from "../../utils/customAxios";
import useAuth from "../../Hooks/useAuth";

import Modal from "../../Components/Modal";
import Button from "../../Components/Button";
import LikeButton from "../../Components/LikeButton";
import UserProfile from "../../Components/UserProfile";
import { Rating } from "@mui/material";
import { Stack } from "@mui/material";

import "./showguide.css";
import { toast } from "react-toastify";

function ShowGuide() {
  const [profileShowing, setProfileShowing] = useState(false);
  const [profileContents, setProfileContents] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [isLiked, setLiked] = useState(false);
  const [guideContents, setGuideContents] = useState({});
  const [guideImage, setGuideImage] = useState("");
  const { id } = useParams();
  const { auth } = useAuth();

  useEffect(() => {
    getGuideContents();
    getGuideImage();
  }, []);

  useEffect(() => {
    getGuideContents();
  }, []);

  useEffect(() => {
    checkGuideSaved();
  }, [guideContents]);

  function showProfile(userID, profilePic, username, bio, onClose) {
    setProfileContents({
      userID: userID,
      profilePic: profilePic,
      username: username,
      bio: bio,
      onClose: onClose
    });

    setProfileShowing(true);
  }
  function hideProfile() {
    setProfileShowing(false);
  }

  const requestMentoring = async () => {
    try {
      const res = await customAxios({
        method: "post",
        url: "/api/requestmentoring",
        data: { mentor_id: guideContents?.author?.id },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });

      if (res.status === 201) {
        toast.success("Your Mentoring Session request has been sent.", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: true
        });
        //setShowSuccessModal(true);
      }
    } catch (e) {
      console.error("Failed to request mentoring session", e);
    }
  };

  const handleFeedbackSubmit = async () => {
    const data = {
      rating: rating,
      postID: id
    };

    try {
      const res = await customAxios({
        method: "post",
        url: "/api/feedback",
        data,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });

      if (res.status === 201) {
        toast.success("Your rating has been recorded.", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: true
        });
      }
    } catch (e) {
      console.error("Failed to submit feedback", e);
    }
  };

  const getGuideImage = async () => {
    try {
      const res = await customAxios.get(`/api/getguideimage?id=${id}`);
      console.log("Guide image response", res);
      if (res.status === 200 && res.data.url) {
        setGuideImage(res.data.url);
      } else {
        setGuideImage("");
      }
    } catch (error) {
      console.error("Failed to fetch guide image", error);
      setGuideImage("");
    }
  };

  const getGuideContents = () => {
    const url = `/api/getguide?id=${id}`;
    customAxios(url).then((res) => {
      setGuideContents(res.data);
    });
  };

  const giveFeedback = async (newRating) => {
    try {
      const res = await customAxios({
        method: "post",
        url: "/api/feedback",
        data: { rating: newRating, message: "New Rating", postID: id },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      if (res.status === 201) {
        toast.success("Your rating has been recorded.", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: true
        });
      }
    } catch (e) {
      console.log(e);
    }
    return;
  };

  const checkGuideSaved = () => {
    const user = guideContents?.saves?.filter(
      (user) => user?.user_id == auth?.userID && user?.post_id == id
    );

    if (user?.length > 0) {
      setLiked(true);
    }
  };

  const updateSavedGuide = async (savedStatus) => {
    let url = "";
    savedStatus ? (url = "/api/removesavedguide") : (url = "/api/saveguide");

    await customAxios({
      method: "post",
      url: url,
      data: {
        guide_id: id
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  };

  return (
    <>
      <div className="guide-container">
        <div className="sidenav">
          <div className="nav-author-details">
            <p>
              Author:
              <Link
                to="#"
                onClick={() => {
                  showProfile(
                    guideContents?.author?.id,
                    "",
                    guideContents?.author.name,
                    `${guideContents?.author?.name}'s Bio goes here.`,
                    hideProfile
                  );
                }}
              >
                {guideContents?.author?.name}
              </Link>
            </p>

            <Button
              content="Request Mentoring Session"
              className="default-button"
              onClickEvent={requestMentoring}
            />
          </div>

          <div className="nav-favorite">
            <p>Add to favorites</p>
            <LikeButton
              isLiked={isLiked}
              content="Save"
              icon="Pin"
              callBack={updateSavedGuide}
            />
          </div>

          <div className="nav-rating">
            <p>How would you rate this Guide?</p>
            <div className="star-wrapper">
              <Stack dir="ltr" spacing={4}>
                <Rating
                  size="large"
                  value={rating}
                  onChange={(event, newRating) => {
                    // giveFeedback(newRating);
                    setRating(newRating);
                  }}
                />
              </Stack>
            </div>
            <Button
              onClickEvent={handleFeedbackSubmit}
              content="SUBMIT"
              className="default-button rating-btn"
            />
          </div>
        </div>

        <div className="guide-contents">
          <h1>{guideContents?.title}</h1>
          {guideImage && (
            <img
              className="guide-img"
              src={guideImage}
              alt="Image from Guide"
            />
          )}
          <p>{guideContents?.content}</p>
        </div>
      </div>
      {showSuccessModal && (
        <Modal
          title="Success"
          content="You have successfully booked the mentoring."
          buttonContent="Close"
          buttonAction={() => setShowSuccessModal(false)}
          showModal={showSuccessModal}
          closeModal={() => setShowSuccessModal(false)}
        />
      )}
      {profileShowing && <UserProfile profileContents={profileContents} />}
    </>
  );
}

export default ShowGuide;
