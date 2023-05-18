import React, { useEffect, useState } from "react"; // Needed for AWS since it's using node 16
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import "./mypage.css";
import GuideCard from "../../Components/GuideCard";

function SavedPremiumGuides({ saved }) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(saved);
  }, [saved]);

  return (
    <div>
      <h1>Saved Premium Guides</h1>
      <div className="mypage-saved-wrapper">
        {saved &&
          saved.map((item, index) => {
            return (
              <Link
                key={index}
                id={index}
                to={`/premiumguides/${item?.guide?.id}`}
              >
                <GuideCard
                  id={item?.guide?.id}
                  img="https://media.istockphoto.com/id/1317474419/photo/amazon.jpg?s=1024x1024&w=is&k=20&c=c_fhWiXAuoeQ0vutDiPlVqjVdx23hc1MKtr-HEzmC38="
                  title={item?.guide?.title}
                  author={item?.guide?.author?.name}
                  rating={Math.floor(item?.guide?.rating)}
                />
              </Link>
            );
          })}
        {saved.length === 0 &&
          <div>There is no saved premium guide.</div>}
      </div>
    </div>
  );
}

export default SavedPremiumGuides;
