import React, {useState} from "react"; // Needed for AWS since it's using node 16
import PostDescription from "../../Components/PostDescription";
import Post from "../../Components/Post";
import CreatePost from "../../Components/CreatePost";
import Button from "../../Components/Button";

import "./style.css";

function Posts() {
  const [isPostShowing, setPostShowing] = useState(false)
  const [isCreateShowing, setCreateShowing] = useState(false)

  function showPost() {
    setPostShowing(true);
  }
  function hidePost() {
    setPostShowing(false);
  }

  function showCreate() {
    setCreateShowing(true);
  }
  function hideCreate() {
    setCreateShowing(false);
  }

  var body = (
    <div className="forum-container">
      <Post showing={isPostShowing} onClose={hidePost}/>
      <CreatePost showing={isCreateShowing} onClose={hideCreate} />

      <PostDescription id="1" title="Jay's first post!" author="Jay" onClickEvent={showPost}/>
      <PostDescription id="2" title="Shorter test" author="Angela" onClickEvent={showPost}/>
      <PostDescription id="3" title="This is a test for a longer post name" author="Drew" onClickEvent={showPost}/>

      <Button className="default-button button-center" content="New Post"  onClickEvent={showCreate}/>
    </div>
  );
  return body;
}

export default Posts;
