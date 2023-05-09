import React, { useState } from "react"; // Needed for AWS since it's using node 16
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import Modal from "../../Components/Modal";
import Textare from "../../Components/Textarea";
import "./mypage.css";

const mentoringLists = [
  {
    id: 1,
    name: "Michael",
    requestedDate: "4-24",
  },
  {
    id: 2,
    name: "Andrea",
    requestedDate: "3-28",
  },
  {
    id: 3,
    name: "Josh",
    requestedDate: "3-24",
  },
  {
    id: 4,
    name: "Amy",
    requestedDate: "3-21",
  },
];

function MentoringSessions() {
  const [selectedMentoring, setSelectedSession] = useState(mentoringLists[0]);
  const [showReviewModal, setshowReviewModal] = useState(false);
  const [showRefundModal, setshowRefundModal] = useState(false);

  return (
    <div>
      <h1>Your Mentoring Sessions</h1>
      <div className="chatting-layout">
        <div className="mypage-mentoring-list">
          {mentoringLists.map((each) => {
            return (
              <div
                key={each.id}
                className="mypage-request-name"
                onClick={() => setSelectedSession(each)}
              >
                {each.name}
              </div>
            );
          })}
        </div>
        <div className="chatting-box">
          {selectedMentoring && (
            <div className="mentoring-detail">
              <div>
                Details of your Mentoring Session with {selectedMentoring.name}
                <br />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Euismod nisi porta lorem mollis aliquam ut. Netus et malesuada
                  fames ac turpis egestas. Scelerisque in dictum non
                  consectetur. Amet consectetur adipiscing elit pellentesque
                  habitant morbi tristique. Eget nullam non nisi est sit amet
                  facilisis magna etiam.{" "}
                </p>
              </div>
              <div className="button-container">
                <Button
                  className="default-button"
                  onClickEvent={() => setshowReviewModal(true)}
                  content="REVIEW"
                />
                <Button
                  className="outline-button"
                  onClickEvent={() => setshowRefundModal(true)}
                  content="REFUND"
                />
              </div>
            </div>
          )}
        </div>
        {showReviewModal && (
          <Modal
            title={`How was your Mentoring Session with ${selectedMentoring.name}?`}
            content={
              <div>
                <Textare />
                <div class="star-wrapper-session">
                  <a href="#" class="fas fa-star s1 checked"></a>
                  <a href="#" class="fas fa-star s2"></a>
                  <a href="#" class="fas fa-star s3"></a>
                  <a href="#" class="fas fa-star s4"></a>
                  <a href="#" class="fas fa-star s5"></a>
                </div>
              </div>
            }
            buttonContent="SUBMIT"
            buttonAction={() => setshowReviewModal(false)}
            showModal={showReviewModal}
            closeModal={() => setshowReviewModal(false)}
          />
        )}
        {showRefundModal && (
          <Modal
            title="What is the reason for your refund request?"
            content={
              <div>
                <Textare />
              </div>
            }
            buttonContent="SUBMIT"
            buttonAction={() => setshowRefundModal(false)}
            showModal={showRefundModal}
            closeModal={() => setshowRefundModal(false)}
          />
        )}
      </div>
    </div>
  );
}

export default MentoringSessions;
