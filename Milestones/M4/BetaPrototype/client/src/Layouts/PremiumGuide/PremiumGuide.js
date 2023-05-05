import React from "react"; // Needed for AWS since it's using node 16
import "./style.css";
import { Link } from "react-router-dom";

function PremiumGuides() {
  return (
    <div>
{/*      <div class="guide-container">
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
                  Open the guide
                </Link>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Important leetcode problems</td>
              <td>Josh</td>
              <td>
                <Link to="/upgradepage" class="feedback-btn">
                  Open the guide
                </Link>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>The most important algorithm questions</td>
              <td>Mark</td>
              <td>
                <Link to="/showguide" class="feedback-btn">
                  Open the guide
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
        <Link to="/createguide" className="create-btn">
          Create A Premium Guide
        </Link>
      </div> */}
      <div className="album-container">
        <h3 class="header">Expand your career opportunities with Premium Guides by our Mentors</h3>
        <Link to="/showguide">
        <div class="gallery">
          <a target="_blank">
            <img src="https://media.istockphoto.com/id/1317474419/photo/amazon.jpg?s=1024x1024&w=is&k=20&c=c_fhWiXAuoeQ0vutDiPlVqjVdx23hc1MKtr-HEzmC38=" alt="Cinque Terre" width="600" height="400" />
          </a>
          <div class="desc">How to ace interview at Amazon?</div>
          <div class="author">Jose Ortiz</div>
        </div>
        </Link>

        <Link to="/showguide">
        <div class="gallery">
          <a target="_blank">
            <img src="https://media.istockphoto.com/id/1353816198/photo/mobile-display-with-logo-of-facebook-whatsapp-and-instagram-apps-in-hand-against-blurred-meta.jpg?s=1024x1024&w=is&k=20&c=RZuTpxq_4IQL7-um_vbLSo8MxY70MB_iHMIjVKBEghs=" alt="Forest" width="600" height="400" />
          </a>
          <div class="desc">How to pass Meta internship interview?</div>
          <div class="author">Jose Ortiz</div>
        </div>
        </Link>
        
        <Link to="/showguide">
        <div class="gallery">
          <a target="_blank">
            <img src="https://media.istockphoto.com/id/1202250586/photo/program-code-javascript-php-html-css-of-site-web-development-programmer-workflow-source-code.jpg?s=1024x1024&w=is&k=20&c=bC_rM0KXTvutSphhakTyZvtmB4qO5R4nCdzbpp5IUMI=" alt="Cinque Terre" width="600" height="400" />
          </a>
          <div class="desc">Nail data structures and algorithms!</div>
          <div class="author">Jose Ortiz</div>
        </div>
        </Link>

        <Link to="/showguide">
        <div class="gallery">
          <a target="_blank">
            <img src="https://media.istockphoto.com/id/1317474419/photo/amazon.jpg?s=1024x1024&w=is&k=20&c=c_fhWiXAuoeQ0vutDiPlVqjVdx23hc1MKtr-HEzmC38=" alt="Cinque Terre" width="600" height="400" />
          </a>
          <div class="desc">How to ace interview at Amazon?</div>
          <div class="author">Jose Ortiz</div>
        </div>
        </Link>

        <Link to="/showguide">
        <div class="gallery">
          <a target="_blank">
            <img src="https://media.istockphoto.com/id/1353816198/photo/mobile-display-with-logo-of-facebook-whatsapp-and-instagram-apps-in-hand-against-blurred-meta.jpg?s=1024x1024&w=is&k=20&c=RZuTpxq_4IQL7-um_vbLSo8MxY70MB_iHMIjVKBEghs=" alt="Forest" width="600" height="400" />
          </a>
          <div class="desc">How to pass Meta internship interview?</div>
          <div class="author">Jose Ortiz</div>
        </div>
        </Link>

        <Link to="/showguide">
        <div class="gallery">
          <a target="_blank">
            <img src="https://media.istockphoto.com/id/1202250586/photo/program-code-javascript-php-html-css-of-site-web-development-programmer-workflow-source-code.jpg?s=1024x1024&w=is&k=20&c=bC_rM0KXTvutSphhakTyZvtmB4qO5R4nCdzbpp5IUMI=" alt="Cinque Terre" width="600" height="400" />
          </a>
          <div class="desc">Nail data structures and algorithms!</div>
          <div class="author">Jose Ortiz</div>
        </div>
        </Link>

        <Link to="/showguide">
        <div class="gallery">
          <a target="_blank">
            <img src="https://media.istockphoto.com/id/1317474419/photo/amazon.jpg?s=1024x1024&w=is&k=20&c=c_fhWiXAuoeQ0vutDiPlVqjVdx23hc1MKtr-HEzmC38=" alt="Cinque Terre" width="600" height="400" />
          </a>
          <div class="desc">How to ace interview at Amazon?</div>
          <div class="author">Jose Ortiz</div>
        </div>
        </Link>

        <Link to="/showguide">
        <div class="gallery">
          <a target="_blank">
            <img src="https://media.istockphoto.com/id/1353816198/photo/mobile-display-with-logo-of-facebook-whatsapp-and-instagram-apps-in-hand-against-blurred-meta.jpg?s=1024x1024&w=is&k=20&c=RZuTpxq_4IQL7-um_vbLSo8MxY70MB_iHMIjVKBEghs=" alt="Forest" width="600" height="400" />
          </a>
          <div class="desc">How to pass Meta internship interview?</div>
          <div class="author">Jose Ortiz</div>
        </div>
        </Link>

        <Link to="/showguide">
        <div class="gallery">
          <a target="_blank">
            <img src="https://media.istockphoto.com/id/1202250586/photo/program-code-javascript-php-html-css-of-site-web-development-programmer-workflow-source-code.jpg?s=1024x1024&w=is&k=20&c=bC_rM0KXTvutSphhakTyZvtmB4qO5R4nCdzbpp5IUMI=" alt="Cinque Terre" width="600" height="400" />
          </a>
          <div class="desc">Nail data structures and algorithms!</div>
          <div class="author">Jose Ortiz</div>
        </div>
        </Link>

        <Link to="/showguide">
        <div class="gallery">
          <a target="_blank">
            <img src="https://media.istockphoto.com/id/1317474419/photo/amazon.jpg?s=1024x1024&w=is&k=20&c=c_fhWiXAuoeQ0vutDiPlVqjVdx23hc1MKtr-HEzmC38=" alt="Cinque Terre" width="600" height="400" />
          </a>
          <div class="desc">How to ace interview at Amazon?</div>
          <div class="author">Jose Ortiz</div>
        </div>
        </Link>

        <Link to="/createguide" className="create-guide-btn">
          Create A Premium Guide
        </Link>
      </div>
    </div>
  );
}

export default PremiumGuides;
