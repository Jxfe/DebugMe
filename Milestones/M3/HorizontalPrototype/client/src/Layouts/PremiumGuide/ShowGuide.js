import React, { useState } from "react"; // Needed for AWS since it's using node 16
import "./style.css";
import { Link } from "react-router-dom";
import Modal from "../../Components/Modal";

function ShowGuide() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  return (
    <>
      <div className="guide-container">
        <div className="sidenav">
          <Link to="#">About</Link>
          <Link to="#">Message</Link>
          <Link to="#">Contact</Link>
          <Link to="#" onClick={() => setShowSuccessModal(true)}>
            Book mentoring
          </Link>
        </div>
        <div className="main">
          <h1>How to ace interviews?</h1>
          <p>
            This sidebar is as tall as its content (the links), and is always
            shown.
          </p>
          <p>Scroll down the page to see the result.</p>
          <p>
            Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum
            definitiones no quo, maluisset concludaturque et eum, altera fabulas
            ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum.
            Affert laboramus repudiandae nec et. Inciderint efficiantur his ad.
            Eum no molestiae voluptatibus.
          </p>
          <p>
            Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum
            definitiones no quo, maluisset concludaturque et eum, altera fabulas
            ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum.
            Affert laboramus repudiandae nec et. Inciderint efficiantur his ad.
            Eum no molestiae voluptatibus.
          </p>
          <p>
            Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum
            definitiones no quo, maluisset concludaturque et eum, altera fabulas
            ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum.
            Affert laboramus repudiandae nec et. Inciderint efficiantur his ad.
            Eum no molestiae voluptatibus.
          </p>
          <p>
            Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum
            definitiones no quo, maluisset concludaturque et eum, altera fabulas
            ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum.
            Affert laboramus repudiandae nec et. Inciderint efficiantur his ad.
            Eum no molestiae voluptatibus.
          </p>
        </div>
        <a href="/feedback" className="feedback-btn">
          Leave a feedback
        </a>
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
