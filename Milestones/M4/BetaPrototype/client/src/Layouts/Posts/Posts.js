import React, { useState, useEffect } from "react"; 
import { Link } from 'react-router-dom'

import { customAxios } from "../../utils/customAxios";
import PostDescription from "../../Components/PostDescription";
import CreatePost from "../../Components/CreatePost";
import Button from "../../Components/Button";

import "./style.css";

function Posts() {
  const [isCreateShowing, setCreateShowing] = useState(false);
  const [postList, setPostList] = useState([])
  const [keyword, setKeyword] = useState("");
  
  useEffect(() => {
    getPostList();
  }, []);

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
  };

  const getPostList = () => {
    customAxios(`/api/posts?search= `).then((res) => {
      setPostList(res.data);
    })
  }

  const renderPostList = () => {
    return postList.map((item) => {
      return (
        <Link to={`/posts/${item.id}`}>
          <PostDescription
          title={item.title}
          author={item.user_id}
          />
        </Link>
      );
    });
  }

  function showCreate() {
    setCreateShowing(true);
  }
  function hideCreate() {
    setCreateShowing(false);
  }

  return (
    <div className="forum-container">
      
      <h1>Connect with your peers through our Forum</h1>
      <p>Get started by creating a new Post, or join a discussion by leaving a comment!</p>

      <div className="post-create-search">
        <div className="post-search">
          <input
          className="input-box"
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
      
      <div className="forum-headers">
        <p>Post Title</p>
        <p>Author</p>
      </div>

      <div>
      {isCreateShowing && (
      <CreatePost onClose={hideCreate} />
      )}
      </div>

      <div>{renderPostList()}</div>

    </div>
  );
}

export default Posts;
