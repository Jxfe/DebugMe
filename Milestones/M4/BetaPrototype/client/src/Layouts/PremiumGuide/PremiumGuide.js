import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { customAxios } from "../../utils/customAxios";
import "./style.css";
import useAuth from "../../Hooks/useAuth";

import Button from "../../Components/Button";
import PostDescription from "../../Components/PostDescription";
import GuideCard from "../../Components/GuideCard";
import Pagination from "../../Components/Pagination";

const ITEMS_PER_PAGE = 3;

function PremiumGuides() {
  const [guidesList, setGuidesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { auth } = useAuth();
  const userRank = auth?.userRank;

  useEffect(() => {
    getGuidesList();
  }, []);

  const currentGuideList = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const lastPageIndex = firstPageIndex + ITEMS_PER_PAGE;

    return guidesList?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, guidesList]);

  const getGuidesList = async () => {
    await customAxios(`/api/guides?search=`).then((res) => {
      setGuidesList(() => res.data);
    });
  };

  const renderGuidesList = () => {
    return currentGuideList?.map((item, index) => {
      return (
        <Link key={index} id={index} to={`/premiumguides/${item.id}`}>
          <GuideCard
            id={item?.id}
            img="https://media.istockphoto.com/id/1317474419/photo/amazon.jpg?s=1024x1024&w=is&k=20&c=c_fhWiXAuoeQ0vutDiPlVqjVdx23hc1MKtr-HEzmC38="
            title={item?.title}
            author={item?.author?.name}
            rating={Math.floor(item?.rating)}
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

        {(userRank === 0 || userRank === 2) && (
          <div className="basic-user-guides">
            <div className="upgrade-notice">
              <p>Upgrade to our Premium Plan to gain access to the Premium Guides!</p>
              <Link to="/mypage/profile">
                <Button className={"default-button"} content="Upgrade!" />
              </Link>
            </div>

            <div className="disabled-guides">
              <div className="guides-container">{renderGuidesList()}</div>
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={guidesList?.length}
                pageSize={ITEMS_PER_PAGE}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>  
        )}
        {(userRank === 1 || userRank === 3) && (
          <div>
            <div className="guides-container">{renderGuidesList()}</div>
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={guidesList?.length}
              pageSize={ITEMS_PER_PAGE}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>  
        )}
      </div>
    </div>
  );
}

export default PremiumGuides;
