import React, { useState } from "react"; // Needed for AWS since it's using node 16
import Button from "../../Components/Button";
import Modal from "../../Components/Modal";
import Textare from "../../Components/Textarea";
import "./mypage.css";
import { customAxios } from "../../utils/customAxios";
import useAuth from "../../Hooks/useAuth";

function MentoringSessions({ menteeSessions, mentorSessions, mentoringRequests }) {
  const [showReviewModal, setshowReviewModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageInfo, setMessageInfo] = useState({});
  const [content, setContent] = useState("");
  const { auth } = useAuth();

  const openMessageModal = (sender, receiver) => {
    setMessageInfo({
      sender_id: sender.id,
      sender_email: sender.email,
      receiver_id: receiver.id,
      receiver_email: receiver.email,
      receiver_name: receiver.name,
    })
    setShowMessageModal(true);
  }

  const addMessage = async () => {
    try {
      console.log(messageInfo)
      const data = {
        sender_id: messageInfo.sender_id,
        sender_email: messageInfo.sender_email,
        receiver_id: messageInfo.receiver_id,
        receiver_email: messageInfo.receiver_email,
        content: content
      };
      const res = await customAxios({
        method: "post",
        url: "/api/messages",
        data,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if (res.status === 201) {
        setShowMessageModal(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleMentoring = async (url, id) => {
    try {
      const res = await customAxios({
        method: "post",
        url: url,
        data: { id: id },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if (res.status === 200 || res.staus == 201) {
        // data reload
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {
        (auth?.userRank === 2 || auth?.userRank === 3) &&
        <div className="mentor-container">
          <h2>Mentoring Session Requests</h2>
          {
            mentoringRequests?.length > 0 ?
              <p>Accept or decline your Mentoring Session requests</p>
              :
              <p>No mentoring requests</p>
          }
          <div>
            {
              mentoringRequests?.map((item, idx) => {
                return (
                  <div className="mentor-box" key={item.mentee.email + idx}>
                    <div>{`${item.mentee.email} (${item.mentee.name})`}</div>
                    <Button
                      className="default-button"
                      content="Accept"
                      width="80px"
                      onClickEvent={() => handleMentoring("/api/acceptmentoring", item.id)}
                    />
                    <Button
                      className="outline-button"
                      content="Decline"
                      width="80px"
                      onClickEvent={() => handleMentoring("/api/rejectmentoring", item.id)}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>
      }
      {
        (auth?.userRank === 2 || auth?.userRank === 3) &&
        <div className="mentor-container">
          <h2>Upcoming Mentoring Sessions as a Mentor</h2>
          {
            mentorSessions?.length > 0 ?
              <p>Send a message to your Mentees to cordinate your meeting details!</p>
              : <p>No mentoring session</p>
          }
          <div>
            {
              mentorSessions?.map((item, idx) => {
                return (
                  <div className="mentor-box" key={item.mentee.email + idx}>
                    <div>{`${item.mentee.email} (${item.mentee.name})`}</div>
                    <Button
                      className="default-button"
                      content="Message"
                      width="80px"
                      onClickEvent={() => openMessageModal(item.mentor, item.mentee)}
                    />
                    <Button
                      className="outline-button"
                      content="Mark as Done"
                      width="120px"
                      onClickEvent={() => handleMentoring("/api/completedmentoring", item.id)}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>
      }
      {
        (auth?.userRank === 0 || auth?.userRank === 1 || auth?.userRank === 3) &&
        <div className="mentor-container">
          <h2>Upcoming Mentoring Sessions as a Mentee</h2>
          {
            menteeSessions?.length > 0 ?
              <p>Send a message to your Mentors to cordinate your meeting details!</p>
              :
              <p>No mentoring session</p>
          }
          <div>
            {
              menteeSessions?.map((item, idx) => {
                return (
                  <div className="mentor-box" key={item.mentor.email + idx}>
                    <div>{`${item.mentor.email} (${item.mentor.name})`}</div>
                    <Button
                      className="default-button"
                      content="Message"
                      width="80px"
                      onClickEvent={() => openMessageModal(item.mentee, item.mentor)}
                    />
                    <Button
                      className="outline-button"
                      content="Cancel"
                      width="80px"
                      onClickEvent={() => handleMentoring("/api/cancelmentoring", item.id)}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>
      }
      {showReviewModal && (
        <Modal
          title={`How was your Mentoring Session?`}
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
      {showMessageModal && (
        <Modal
          title={`Send a message to ${messageInfo.receiver_name}(${messageInfo.receiver_email})`}
          content={
            <div>
              <Textare
                onChangeEvent={(e) => setContent(e.target.value)}
                value={content}
              />
            </div>
          }
          buttonContent="SEND"
          buttonAction={addMessage}
          showModal={showMessageModal}
          closeModal={() => setShowMessageModal(false)}
        />
      )}
    </div>
  );
}

export default MentoringSessions;
