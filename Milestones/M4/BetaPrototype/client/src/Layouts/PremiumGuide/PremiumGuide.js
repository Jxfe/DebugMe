import React from "react"; // Needed for AWS since it's using node 16
import "./style.css";
import { Link } from "react-router-dom";
import GuideCard from "../../Components/GuideCard";

function PremiumGuides() {
  return (
    <div>
      <div className="album-container">
        <h3 className="header">
          Expand your career opportunities with Premium Guides by our Mentors
        </h3>
        <Link to="/showguide">
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
        </Link>

        <Link to="/createguide" className="create-guide-btn">
          Create A Premium Guide
        </Link>
      </div>
    </div>
  );
}

export default PremiumGuides;
