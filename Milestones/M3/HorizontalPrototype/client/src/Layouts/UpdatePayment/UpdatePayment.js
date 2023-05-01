import React from "react";
import Button from "../../Components/Button";
import { useNavigate } from "react-router-dom";
import "./style.css";

function UpdatePayment() {
  const navigate = useNavigate();
  const gotoSuccess = () => {
    navigate("/success");
  };
  return (
    <form className="credit-card">
      <div className="form-header">
        <h4 className="title">Credit card detail</h4>
      </div>

      <div className="form-body">
        <input type="text" className="card-number" placeholder="Card Number" />
        <div className="date-field">
          <div className="monthdate">
            <select name="Month">
              <option value="january">January</option>
              <option value="february">February</option>
              <option value="march">March</option>
              <option value="april">April</option>
              <option value="may">May</option>
              <option value="june">June</option>
              <option value="july">July</option>
              <option value="august">August</option>
              <option value="september">September</option>
              <option value="october">October</option>
              <option value="november">November</option>
              <option value="december">December</option>
            </select>
          </div>
          <div className="year">
            <select name="Year">
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
              <option value="2031">2031</option>
              <option value="2032">2032</option>
            </select>
          </div>
        </div>
        <div className="card-verification">
          <div className="cvv-input">
            <input type="text" placeholder="CVV" />
          </div>
          <div className="cvv-details">
            <p>
              3 or 4 digits usually found <br /> on the signature strip
            </p>
          </div>
        </div>
        <Button
          className="default-button"
          onClickEvent={gotoSuccess}
          content="Submit"
        />
      </div>
    </form>
  );
}

export default UpdatePayment;
