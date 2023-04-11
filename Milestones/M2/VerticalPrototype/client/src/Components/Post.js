import { useState } from "react";
import "./style.css";
import axios from "axios";
import { POST_URL } from "../utils/url";

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
      const randomId = Math.floor(Math.random() * 10) + 1;
      const url = `${POST_URL}`;
      console.log(url);
      const res = await axios.post(url, {
        data: { content: post, id: randomId, user_id: 3, forum_id: randomId },
        headers: {
          "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
      });
      if (res.data) {
        window.alert("Your post has ben successfuly created!");
        window.location.reload();
      }
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
