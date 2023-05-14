import React, { useState, useEffect } from "react";
import moment from "moment";
import Button from "../../Components/Button";
import { Link, useParams } from "react-router-dom";
import { customAxios } from "../../utils/customAxios";
import "./style.css";
import LikeButton from "../../Components/LikeButton";

function Post() {
  const [postContents, setPostContents] = useState({});
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();

  useEffect(() => {
    getPostContents();
  }, []);

  const getPostContents = () => {
    const url = `/api/getpost?id=${id}`;
    customAxios(url).then((res) => {
      setPostContents(res.data);
    });
  };

  const renderComments = () => {
    return postContents?.replies?.map((item, index) => {
      return (
        <div key={index} id={index} className="comment-container">
          <p className="comment-author">{item.author?.name}</p>
          <p>{moment(item?.created_at).fromNow()}</p>
          <p className="comment-content">{item?.content}</p>
        </div>
      );
    });
  };

  const handleSubmit = async () => {
    await customAxios({
      method: "post",
      url: "/api/addcomment",
      data: {
        post_id: id,
        content: newComment
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  };

  return (
    <div className="post-display-container">
      <div className="post-left">
        <div className="post-header">
          <h1>{postContents?.title}</h1>
          <div>
            <p>Author: {postContents?.author?.name}</p>
            <p>{moment(postContents?.created_at).format("MMM Do, YYYY")}</p>
          </div>
        </div>

        <p>{postContents?.content}</p>
        <div className="likeBtn-container">
          <LikeButton />
        </div>
      </div>

      <div className="post-right">
        <div className="post-comments-container">{renderComments()}</div>
        <div className="new-comment-container">
          <form onSubmit={handleSubmit}>
            <textarea
              className="new-comment-textarea"
              type="text"
              name="newComment"
              id="newComment"
              placeholder="Leave a new comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            />
            <Button className="default-button" content="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Post;
