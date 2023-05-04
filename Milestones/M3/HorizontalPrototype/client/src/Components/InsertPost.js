import React from "react";
import { useState } from "react";
import "./style.css";
import axios from "axios";
import Button from "./Button";
import { POST_URL } from "../utils/url";

/**
 * className: default-button | disabled-button
 * width: css width ex) 120px | 100% | 100vw ...
 */

function InsertPost() {
  const [post, setPost] = useState("");

  const submitPost = async (e) => {
    e.preventDefault();
    if (post === "") {
      window.alert("Empty Text");
      return;
    }

    console.log(post);
    try {
      const randomId = Math.floor(Math.random() * (10 - 1) + 1);
      //const url = `${POST_URL}`;
      const url = "/api/posts";
      const body = {
        content: post,
        id: randomId,
        user_id: 3,
        forum_id: 1
      };

      axios({
        method: "post",
        url: url,
        data: body,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then((response) => {
          console.log("got a response from post");
          if (response.data) {
            window.alert("Your post has ben successfuly created!");
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log("got an error from post");
          console.log(err);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App search-wrapper">
    {/* <textarea
      className="input-box"
      name="post"
      type="text"
      placeholder="Start a posts"
      rows={10}
      value={post}
      onChange={(e) => setPost(e.target.value)}
    /> */}
    <input
          className="input-box"
          name="post"
          type="text"
          placeholder="Provide post title to be inserted into DB"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
    <Button className={"default-button"} content="SUMBIT" onClickEvent={submitPost} />
  </div>
  );
}

export default InsertPost;
