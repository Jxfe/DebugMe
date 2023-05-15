import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { customAxios } from "../../utils/customAxios";
import "./style.css";

import Button from "../../Components/Button";
import PostDescription from "../../Components/PostDescription";

function PremiumGuides() {
  const [guidesList, setGuidesList] = useState([]);

  useEffect(() => {
    getGuidesList();
  }, []);

  const getGuidesList = async () => {
    await customAxios(`/api/guides?search=`).then((res) => {
      setGuidesList(() => res.data);
    });
  };

  const renderGuidesList = () => {
    return guidesList?.map((item, index) => {
      return (
        <Link key={index} id={index} to={`/premiumguides/${item.id}`}>
          <PostDescription
            title={item?.title}
            author={item?.author?.name}
            date={moment.utc(item?.created_at).fromNow()}
            commentCount={item?.rating}
          />
        </Link>
      );
    });
  };

  return (
    <div>
      <div className="album-container">
        <div className="guides-header">

          <div className="guides-info">
            <div>
              <p className="guides-info-title">What are Premium Guides?</p>
              <p>Premium Guides are specialized resources written by DebugMe's Mentors, users with previous internship experience or advanced knowledge related to internship hunting.</p>
            </div>

            <div>
              <p className="guides-info-title">Want more help?</p>
              <p>You can request a one-on-one Mentoring Session with any of our Mentors! From simple questions to resume reviews, this is your opportunity to get the specialized help you deserve from someone with relevant expertise.</p>
            </div>
          </div>
          
          <div className="guides-create">
            <p>Do you have what it takes to be a Mentor?</p>
            <Link to="/createguide">
              <Button
                className={"default-button"}
                content="Create New Guide"
              />
            </Link>
          </div>
        </div>

        <div>{renderGuidesList()}</div>

        <Link to="/showguide">
          <div className="gallery">
            <a target="_blank">
              <img
                src="https://media.istockphoto.com/id/1317474419/photo/amazon.jpg?s=1024x1024&w=is&k=20&c=c_fhWiXAuoeQ0vutDiPlVqjVdx23hc1MKtr-HEzmC38="
                alt="Cinque Terre"
                width="600"
                height="400"
              />
            </a>
            <div className="desc">How to ace interview at Amazon?</div>
            <div className="author">Jose Ortiz</div>
          </div>
        </Link>

        <Link to="/showguide">
          <div className="gallery">
            <a target="_blank">
              <img
                src="https://media.istockphoto.com/id/1353816198/photo/mobile-display-with-logo-of-facebook-whatsapp-and-instagram-apps-in-hand-against-blurred-meta.jpg?s=1024x1024&w=is&k=20&c=RZuTpxq_4IQL7-um_vbLSo8MxY70MB_iHMIjVKBEghs="
                alt="Forest"
                width="600"
                height="400"
              />
            </a>
            <div className="desc">How to pass Meta internship interview?</div>
            <div className="author">Jose Ortiz</div>
          </div>
        </Link>

        <Link to="/showguide">
          <div className="gallery">
            <a target="_blank">
              <img
                src="https://media.istockphoto.com/id/1202250586/photo/program-code-javascript-php-html-css-of-site-web-development-programmer-workflow-source-code.jpg?s=1024x1024&w=is&k=20&c=bC_rM0KXTvutSphhakTyZvtmB4qO5R4nCdzbpp5IUMI="
                alt="Cinque Terre"
                width="600"
                height="400"
              />
            </a>
            <div className="desc">Nail data structures and algorithms!</div>
            <div className="author">Jose Ortiz</div>
          </div>
        </Link>

        <Link to="/showguide">
          <div className="gallery">
            <a target="_blank">
              <img
                src="https://media.istockphoto.com/id/1317474419/photo/amazon.jpg?s=1024x1024&w=is&k=20&c=c_fhWiXAuoeQ0vutDiPlVqjVdx23hc1MKtr-HEzmC38="
                alt="Cinque Terre"
                width="600"
                height="400"
              />
            </a>
            <div className="desc">How to ace interview at Amazon?</div>
            <div className="author">Jose Ortiz</div>
          </div>
        </Link>

        <Link to="/showguide">
          <div className="gallery">
            <a target="_blank">
              <img
                src="https://media.istockphoto.com/id/1353816198/photo/mobile-display-with-logo-of-facebook-whatsapp-and-instagram-apps-in-hand-against-blurred-meta.jpg?s=1024x1024&w=is&k=20&c=RZuTpxq_4IQL7-um_vbLSo8MxY70MB_iHMIjVKBEghs="
                alt="Forest"
                width="600"
                height="400"
              />
            </a>
            <div className="desc">How to pass Meta internship interview?</div>
            <div className="author">Jose Ortiz</div>
          </div>
        </Link>

        <Link to="/showguide">
          <div className="gallery">
            <a target="_blank">
              <img
                src="https://media.istockphoto.com/id/1202250586/photo/program-code-javascript-php-html-css-of-site-web-development-programmer-workflow-source-code.jpg?s=1024x1024&w=is&k=20&c=bC_rM0KXTvutSphhakTyZvtmB4qO5R4nCdzbpp5IUMI="
                alt="Cinque Terre"
                width="600"
                height="400"
              />
            </a>
            <div className="desc">Nail data structures and algorithms!</div>
            <div className="author">Jose Ortiz</div>
          </div>
        </Link>

        <Link to="/showguide">
          <div className="gallery">
            <a target="_blank">
              <img
                src="https://media.istockphoto.com/id/1317474419/photo/amazon.jpg?s=1024x1024&w=is&k=20&c=c_fhWiXAuoeQ0vutDiPlVqjVdx23hc1MKtr-HEzmC38="
                alt="Cinque Terre"
                width="600"
                height="400"
              />
            </a>
            <div className="desc">How to ace interview at Amazon?</div>
            <div className="author">Jose Ortiz</div>
          </div>
        </Link>

        <Link to="/showguide">
          <div className="gallery">
            <a target="_blank">
              <img
                src="https://media.istockphoto.com/id/1353816198/photo/mobile-display-with-logo-of-facebook-whatsapp-and-instagram-apps-in-hand-against-blurred-meta.jpg?s=1024x1024&w=is&k=20&c=RZuTpxq_4IQL7-um_vbLSo8MxY70MB_iHMIjVKBEghs="
                alt="Forest"
                width="600"
                height="400"
              />
            </a>
            <div className="desc">How to pass Meta internship interview?</div>
            <div className="author">Jose Ortiz</div>
          </div>
        </Link>

        <Link to="/showguide">
          <div className="gallery">
            <a target="_blank">
              <img
                src="https://media.istockphoto.com/id/1202250586/photo/program-code-javascript-php-html-css-of-site-web-development-programmer-workflow-source-code.jpg?s=1024x1024&w=is&k=20&c=bC_rM0KXTvutSphhakTyZvtmB4qO5R4nCdzbpp5IUMI="
                alt="Cinque Terre"
                width="600"
                height="400"
              />
            </a>
            <div className="desc">Nail data structures and algorithms!</div>
            <div className="author">Jose Ortiz</div>
          </div>
        </Link>

        <Link to="/showguide">
          <div className="gallery">
            <a target="_blank">
              <img
                src="https://media.istockphoto.com/id/1317474419/photo/amazon.jpg?s=1024x1024&w=is&k=20&c=c_fhWiXAuoeQ0vutDiPlVqjVdx23hc1MKtr-HEzmC38="
                alt="Cinque Terre"
                width="600"
                height="400"
              />
            </a>
            <div className="desc">How to ace interview at Amazon?</div>
            <div className="author">Jose Ortiz</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default PremiumGuides;
