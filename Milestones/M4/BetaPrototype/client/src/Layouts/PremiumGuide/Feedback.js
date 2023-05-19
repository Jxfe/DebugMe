import React, { useState } from "react";
import { customAxios } from "../../utils/customAxios";
import "./style.css";
import Button from "../../Components/Button";
import Modal from "../../Components/Modal";
import { toast } from "react-toastify";

function SubmitFeedback() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  const handleFeedbackSubmit = async () => {
    const data = {
      message: feedback,
      rating: rating,
      userID: 1, // Need help getting userID
      postID: 1, // Need help getting postID Also currently bugs with rating with the stars.
    };

    try {
      console.log(rating);
      const res = await customAxios({
        method: "post",
        url: "/api/feedback",
        data,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (res.status === 201) {
        console.log('??')
        //setShowSuccessModal(true);
        toast.success("Your rating has been recorded.", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    } catch (e) {
      console.error('Failed to submit feedback', e);
    }
  };

  return (
    <>
      <div class="feedback-container">
        <h2 className="fdbck">Please, leave an honest feedback about the premium guide!</h2>
        <textarea value={feedback} onChange={e => setFeedback(e.target.value)}>Write something here ...</textarea>
        <div class="star-wrapper">
          <a href="#" class="fas fa-star s1 checked" onClick={() => setRating(5)}></a>
          <a href="#" class="fas fa-star s2" onClick={() => setRating(4)}></a>
          <a href="#" class="fas fa-star s3" onClick={() => setRating(3)}></a>
          <a href="#" class="fas fa-star s4" onClick={() => setRating(2)}></a>
          <a href="#" class="fas fa-star s5" onClick={() => setRating(1)}></a>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Button
          onClickEvent={handleFeedbackSubmit}
          content="SUBMIT"
          className="default-button"
        />
      </div>
      {showSuccessModal && (
        <Modal
          title="Success"
          content="You have successfully submitted feedback."
          buttonContent="Close"
          buttonAction={() => setShowSuccessModal(false)}
          showModal={showSuccessModal}
          closeModal={() => setShowSuccessModal(false)}
        />
      )}
    </>
  );
}

export default SubmitFeedback;
