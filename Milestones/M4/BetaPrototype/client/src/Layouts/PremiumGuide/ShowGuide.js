import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { customAxios } from "../../utils/customAxios";

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
  const [guideContents, setGuideContents] = useState({});
  const { id } = useParams();

  useEffect(() => {
    console.log(rating);
    giveFeedback();
  }, [rating]);

  useEffect(() => {
    getGuideContents();
  }, []);

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

  const giveFeedback = async () => {
    await customAxios({
      method: "post",
      url: "/api/feedback",
      data: { rating: rating, message: "", postID: id },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    return;
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
            <LikeButton />
          </div>

          <div className="nav-rating">
            <p>How would you rate this Guide?</p>
            <div className="star-wrapper">
              <Stack dir="ltr" spacing={2}>
                <Rating
                  size="large"
                  value={rating}
                  onChange={(event, newRating) => {
                    //console.log(newRating);
                    setRating(newRating);
                  }}
                />
              </Stack>

              {/* <a
                href="#"
                class="fas fa-star s1"
                onClick={() => setRating(5)}
              ></a>
              <a
                href="#"
                class="fas fa-star s2"
                onClick={() => setRating(4)}
              ></a>
              <a
                href="#"
                class="fas fa-star s3"
                onClick={() => setRating(3)}
              ></a>
              <a
                href="#"
                class="fas fa-star s4"
                onClick={() => setRating(2)}
              ></a>
              <a
                href="#"
                class="fas fa-star s5"
                onClick={() => setRating(1)}
              ></a> */}
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
