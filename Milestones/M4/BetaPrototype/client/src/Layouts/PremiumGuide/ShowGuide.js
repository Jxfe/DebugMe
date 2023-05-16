import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { customAxios } from "../../utils/customAxios";
import useAuth from "../../Hooks/useAuth";

import Modal from "../../Components/Modal";
import Button from "../../Components/Button";
import LikeButton from "../../Components/LikeButton";
//import Rating from "../../Components/Rating";
import { Rating } from "@mui/material";
import { Stack } from "@mui/material";

import "./showguide.css";

function ShowGuide() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [isLiked, setLiked] = useState(false);
  const [guideContents, setGuideContents] = useState({});
  const { id } = useParams();
  const { auth } = useAuth();

  useEffect(() => {
    getGuideContents();
  }, []);

  useEffect(() => {
    checkGuideSaved();
  }, [guideContents]);

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
        setShowSuccessModal(true);
      }
    } catch (e) {
      console.error("Failed to submit feedback", e);
    }
  };

  const getGuideContents = () => {
    const url = `/api/getguide?id=${id}`;
    customAxios(url).then((res) => {
      setGuideContents(res.data);
    });
  };

  const giveFeedback = async (newRating) => {
    await customAxios({
      method: "post",
      url: "/api/feedback",
      data: { rating: newRating, message: "", postID: id },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    return;
  };

  const checkGuideSaved = () => {
    const user = guideContents?.saves?.filter(
      (user) => user?.author?.email === auth?.email
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
            <p>Author: {guideContents?.author?.name}</p>
            <Link to="#" onClick={() => setShowSuccessModal(true)}>
              <Button
                content="Request Mentoring Session"
                className="default-button"
              />
            </Link>
          </div>

          <div className="nav-favorite">
            <p>Add to favorites</p>
            <LikeButton isLiked={isLiked} callBack={updateSavedGuide} />
          </div>

          <div className="nav-rating">
            <p>How would you rate this Guide?</p>
            <div className="star-wrapper">
              <Stack dir="ltr" spacing={2}>
                <Rating
                  size="large"
                  value={rating}
                  onChange={(event, newRating) => {
                    giveFeedback(newRating);
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
    </>
  );
}

export default ShowGuide;
