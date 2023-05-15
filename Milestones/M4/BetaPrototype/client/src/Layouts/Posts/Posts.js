import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { customAxios } from "../../utils/customAxios";
import PostDescription from "../../Components/PostDescription";
import CreatePost from "../../Components/CreatePost";
import Button from "../../Components/Button";
import useAuth from "../../Hooks/useAuth";
import "./style.css";
import Pagination from "../../Components/Pagination";

const ITEMS_PER_PAGE = 4;

function Posts() {
  const [isCreateShowing, setCreateShowing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postList, setPostList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const searchInput = useRef();
  const { auth } = useAuth();

  useEffect(() => {
    getPostList();
  }, []);

  const currentPostList = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const lastPageIndex = firstPageIndex + ITEMS_PER_PAGE;

    return postList?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, postList]);

  const submitSearch = async (e) => {
    e.preventDefault();
    if (keyword === "") {
      alert("Please provide a search parameter");
      return;
    }

    try {
      const url = `/api/posts?search=${keyword}`;
      const res = await customAxios(url);
      setPostList(res.data);
    } catch (e) {
      setPostList([]);
    }
    searchInput.current.focus();
  };

  const getPostList = async () => {
    await customAxios(`/api/posts?search=`).then((res) => {
      setPostList(() => res.data);
    });
    setKeyword("");
    searchInput.current.focus();
  };

  const renderPostList = () => {
    return currentPostList?.map((item, index) => {
      return (
        <Link key={index} id={index} to={`/posts/${item.id}`}>
          <PostDescription
            title={item?.title}
            author={item?.author?.name}
            date={moment.utc(item?.created_at).fromNow()}
            commentCount={item?.replies?.length}
            likes={item?.likes?.length}
          />
        </Link>
      );
    });
  };

  function showCreate() {
    setCreateShowing(true);
  }
  function hideCreate() {
    setCreateShowing(false);
  }

  return (
    <div className="forum-container">
      <h1>Connect with your peers through our Forum</h1>
      <p>
        Get started by creating a new Post, or join a discussion by leaving a
        comment!
      </p>

      <div className="post-create-search">
        <div className="post-search">
          <input
            className="input-box"
            ref={searchInput}
            name="keyword"
            type="text"
            placeholder="Search for a Post"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div className="post-search-buttons">
            <Button
              className={"default-button"}
              content="SEARCH"
              onClickEvent={submitSearch}
            />
            <Button
              className={"outline-button"}
              content="RESET"
              onClickEvent={getPostList}
            />
          </div>
        </div>
        <div>
          <Button
            className="default-button"
            content="Create New Post"
            onClickEvent={showCreate}
          />
        </div>
      </div>

      <div>
        {isCreateShowing && (
          <CreatePost
            onClose={hideCreate}
            setCreateShowing={setCreateShowing}
          />
        )}
      </div>

      <div name="post-items">{renderPostList()}</div>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={postList?.length}
        pageSize={ITEMS_PER_PAGE}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default Posts;
