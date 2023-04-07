import { useState } from "react";
import "./style.css";
import axios from "axios";

function Post() {
  const [post, setPost] = useState("");

  const submitPost = async (e) => {
    e.preventDefault();
    if (post === "") {
      window.alert("Empty Text");
      return;
    }

    console.log(post);

    try {
      //   const res = await axios(url);
      //   console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App search-wrapper">
      <h2 className="post-header"> [ Create Post ] </h2>
      <textarea
        className="input-box"
        name="post"
        type="text"
        placeholder="Start a post"
        rows={10}
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />
      <button className="button" type="submit" onClick={submitPost}>
        Create Post
      </button>
    </div>
  );
}

export default Post;
