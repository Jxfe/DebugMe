import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { customAxios } from "../../utils/customAxios";
import "./style.css";

import Button from "../../Components/Button";
import PostDescription from "../../Components/PostDescription";
import GuideCard from "../../Components/GuideCard";

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
          <GuideCard
            id={item?.id}
            img="https://media.istockphoto.com/id/1317474419/photo/amazon.jpg?s=1024x1024&w=is&k=20&c=c_fhWiXAuoeQ0vutDiPlVqjVdx23hc1MKtr-HEzmC38="
            title={item?.title}
            author={item?.author?.name}
            rating={Math.floor(item?.rating)}
          />
          {/* <PostDescription
            title={item?.title}
            author={item?.author?.name}
            date={moment.utc(item?.created_at).fromNow()}
            commentCount={item?.rating}
          /> */}
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
              <p>
                Premium Guides are specialized resources written by DebugMe's
                Mentors, users with previous internship experience or advanced
                knowledge related to internship hunting.
              </p>
            </div>

            <div>
              <p className="guides-info-title">Want more help?</p>
              <p>
                You can request a one-on-one Mentoring Session with any of our
                Mentors! From simple questions to resume reviews, this is your
                opportunity to get the specialized help you deserve from someone
                with relevant expertise.
              </p>
            </div>
          </div>

          <div className="guides-create">
            <p>Do you have what it takes to be a Mentor?</p>
            <Link to="/createguide">
              <Button className={"default-button"} content="Create New Guide" />
            </Link>
          </div>
        </div>

        <div className="guides-container">{renderGuidesList()}</div>

        {/* <Link to="/showguide">
          <GuideCard id="1" img="https://media.istockphoto.com/id/1317474419/photo/amazon.jpg?s=1024x1024&w=is&k=20&c=c_fhWiXAuoeQ0vutDiPlVqjVdx23hc1MKtr-HEzmC38="
          title="Hi there! Checkout our Guide"
          author="Jose Ortiza"
          />
        </Link>

        <Link to="/showguide">
          <GuideCard id="2" img="https://media.istockphoto.com/id/1202250586/photo/program-code-javascript-php-html-css-of-site-web-development-programmer-workflow-source-code.jpg?s=1024x1024&w=is&k=20&c=bC_rM0KXTvutSphhakTyZvtmB4qO5R4nCdzbpp5IUMI="
          title="Nail your coding interview"
          author="Jose Ortiza" />
        </Link>

        <Link to="/showguide">
          <GuideCard id="3" img="https://media.istockphoto.com/id/1317474419/photo/amazon.jpg?s=1024x1024&w=is&k=20&c=c_fhWiXAuoeQ0vutDiPlVqjVdx23hc1MKtr-HEzmC38="
          title="Hi there! Checkout our Guide"
          author="Jose Ortiza" />
        </Link>

        <Link to="/showguide">
          <GuideCard id="4" img="https://media.istockphoto.com/id/1202250586/photo/program-code-javascript-php-html-css-of-site-web-development-programmer-workflow-source-code.jpg?s=1024x1024&w=is&k=20&c=bC_rM0KXTvutSphhakTyZvtmB4qO5R4nCdzbpp5IUMI="
          title="Nail your coding interview"
          author="Jose Ortiza" />
        </Link>

        <Link to="/showguide">
          <GuideCard id="5" img="https://media.istockphoto.com/id/1317474419/photo/amazon.jpg?s=1024x1024&w=is&k=20&c=c_fhWiXAuoeQ0vutDiPlVqjVdx23hc1MKtr-HEzmC38="
          title="Hi there! Checkout our Guide"
          author="Jose Ortiza" />
        </Link>

        <Link to="/showguide">
          <GuideCard id="6" img="https://media.istockphoto.com/id/1202250586/photo/program-code-javascript-php-html-css-of-site-web-development-programmer-workflow-source-code.jpg?s=1024x1024&w=is&k=20&c=bC_rM0KXTvutSphhakTyZvtmB4qO5R4nCdzbpp5IUMI="
          title="Nail your coding interview"
          author="Jose Ortiza" />
        </Link>

        <Link to="/showguide">
          <GuideCard id="7" img="https://media.istockphoto.com/id/1317474419/photo/amazon.jpg?s=1024x1024&w=is&k=20&c=c_fhWiXAuoeQ0vutDiPlVqjVdx23hc1MKtr-HEzmC38="
          title="Hi there! Checkout our Guide"
          author="Jose Ortiza" />
        </Link>

        <Link to="/showguide">
          <GuideCard id="8" img="https://media.istockphoto.com/id/1202250586/photo/program-code-javascript-php-html-css-of-site-web-development-programmer-workflow-source-code.jpg?s=1024x1024&w=is&k=20&c=bC_rM0KXTvutSphhakTyZvtmB4qO5R4nCdzbpp5IUMI="
          title="Nail your coding interview"
          author="Jose Ortiza" />
        </Link>

        <Link to="/showguide">
          <GuideCard id="9" img="https://media.istockphoto.com/id/1317474419/photo/amazon.jpg?s=1024x1024&w=is&k=20&c=c_fhWiXAuoeQ0vutDiPlVqjVdx23hc1MKtr-HEzmC38="
          title="Hi there! Checkout our Guide"
          author="Jose Ortiza" />
        </Link>

        <Link to="/showguide">
          <GuideCard id="10" img="https://media.istockphoto.com/id/1202250586/photo/program-code-javascript-php-html-css-of-site-web-development-programmer-workflow-source-code.jpg?s=1024x1024&w=is&k=20&c=bC_rM0KXTvutSphhakTyZvtmB4qO5R4nCdzbpp5IUMI="
          title="Nail your coding interview"
          author="Jose Ortiza" />
        </Link> */}
      </div>
    </div>
  );
}

export default PremiumGuides;
