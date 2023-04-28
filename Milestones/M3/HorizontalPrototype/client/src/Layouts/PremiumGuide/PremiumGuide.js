import React from "react"; // Needed for AWS since it's using node 16
import "./style.css";
import { Link } from "react-router-dom";

function PremiumGuides() {
  return (
    <div>
      <div class="container">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>How to ace interviews?</td>
              <td>Anna</td>
              <td>
                <Link to="/upgradepage" class="feedback-btn">
                  Get Access
                </Link>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Important leetcode problems</td>
              <td>Josh</td>
              <td>
                <Link to="/upgradepage" class="feedback-btn">
                  Get Access
                </Link>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>The most important algorithm questions</td>
              <td>Mark</td>
              <td>
                <Link to="/upgradepage" class="feedback-btn">
                  Get Access
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
        <Link to="/createguide" className="create-btn">Create A Premium Guide</Link>
      </div>
    </div>
  );
}

export default PremiumGuides;
