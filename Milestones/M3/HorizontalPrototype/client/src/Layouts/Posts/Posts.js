import React, {useState} from "react"; // Needed for AWS since it's using node 16
import PostDescription from "../../Components/PostDescription";
import CreatePost from "../../Components/CreatePost";
import Button from "../../Components/Button";
import { Link, Route, Routes } from "react-router-dom";

import "./style.css";

function Posts() {
  const [isCreateShowing, setCreateShowing] = useState(false)

  function showCreate() {
    setCreateShowing(true);
  }
  function hideCreate() {
    setCreateShowing(false);
  }

  var body = (
    <div className="forum-container">
      <CreatePost showing={isCreateShowing} onClose={hideCreate} />

      <Link to="post">
        <PostDescription id="1" title="Jay's first post!" author="Jay" />
      </Link>
      
      <Link to="post">
        <PostDescription id="2" title="How to ace an Amazon SWE interview" author="Molly" />
      </Link>
      <Link to="post">
        <PostDescription id="3" title="Best strategies to solve LeetCode questions" author="Mike" />
      </Link>
      <Link to="post">
        <PostDescription id="4" title="Here's how I turned my internship into a full-tme offer" author="Amanda" />
      </Link>
      <Link to="post">
        <PostDescription id="5" title="Important things to consider when writing your resume" author="Jay" />
      </Link>

      <Button className="default-button" content="New Post" onClickEvent={showCreate} />
    </div>
  );
  return body;
}

export default Posts;
