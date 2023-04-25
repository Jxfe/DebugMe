import React, { useState } from "react"; // Needed for AWS since it's using node 16
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import Modal from "../../Components/Modal";
import "./style.css";

const mentoringLists = [
  {
    id: 1,
    name: "samuel",
    requestedDate: "4-24",
  },
  {
    id: 2,
    name: "Jiji",
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
function Chatting() {
  const navigate = useNavigate();
  const [selectedMentoring, setSelectedMentoring] = useState(null);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);

  const sendMessage = () => {
    navigate("/messages");
  };

  return (
    <div>
      <h1>Mentoring Request</h1>
      <div className="chatting-layout">
        <div className="mentoring-list">
          {mentoringLists.map((each) => {
            return (
              <div
                key={each.id}
                className="request-name"
                onClick={() => setSelectedMentoring(each)}
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
                {selectedMentoring.name} requested a mentoring on{" "}
                {selectedMentoring.requestedDate}
              </div>
              <div className="button-container">
                <Button
                  className="default-button"
                  onClickEvent={() => setShowAcceptModal(true)}
                  content="ACCEPT"
                />
                <Button
                  className="outline-button"
                  onClickEvent={() => setShowDeclineModal(true)}
                  content="DECLINE"
                />
              </div>
            </div>
          )}
        </div>
        {selectedMentoring && (
          <>
            <Modal
              title="New Mentoring"
              content={`Start message to ${selectedMentoring.name}`}
              buttonContent="SEND"
              buttonAction={sendMessage}
              showModal={showAcceptModal}
              closeModal={() => setShowAcceptModal(false)}
            />
            <Modal
              title="New Mentoring"
              content={`You declined ${selectedMentoring.name}'s mentoring request`}
              buttonContent="CLOSE"
              buttonAction={() => setShowDeclineModal(false)}
              showModal={showDeclineModal}
              closeModal={() => setShowDeclineModal(false)}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Chatting;
