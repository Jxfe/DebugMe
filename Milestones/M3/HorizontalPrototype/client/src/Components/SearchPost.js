import React from "react"; // Needed for AWS since it's using node 16
import { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import "./style.css";
import axios from "axios";

/**
 * className: default-button | disabled-button
 * width: css width ex) 120px | 100% | 100vw ...
 */

function SearchPost() {
  const [searchList, setSearchList] = useState(null);
  const [showReviewModal, setshowReviewModal] = useState(false);
  const [keyword, setKeyword] = useState("");

  const submitSearch = async (e) => {
    e.preventDefault();
    if (keyword === "") return;

    try {
      const url = `/api/posts?search=${keyword}`;
      const res = await axios(url);
      setSearchList(res.data);
    } catch (e) {
      setSearchList([]);
    } finally {
      setshowReviewModal(true);
    }
  };

  const renderPostList = () => {
    return searchList.map((item, index) => {
      return (
        <div className="search-item" key={item.id + item.created_at}>
          <div className="search-index">{index + 1}</div>
          <div className="search-title">{item.content}</div>
          <div className="search-date">{item.created_at}</div>
        </div>
      );
    });
  };
  return (
    <div className="App search-wrapper">
      <input
        className="input-box"
        name="keyword"
        type="text"
        placeholder="Search for a Post"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button
        className={"default-button"}
        content="SEARCH"
        onClickEvent={submitSearch}
      />
      {showReviewModal && (
        <Modal
          title="Search results"
          content={
            <div>
              {searchList.length === 0 ? (
                <div className="noresult">Sorry, no result found!</div>
              ) : (
                <div>{renderPostList()}</div>
              )}
            </div>
          }
          buttonContent="CLOSE"
          buttonAction={() => setshowReviewModal(false)}
          showModal={showReviewModal}
          closeModal={() => setshowReviewModal(false)}
        />
      )}
    </div>
  );
}

export default SearchPost;
